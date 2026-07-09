import "server-only";
import crypto from "node:crypto";
import { getR2PublicUrl as getPublicR2Url, normalizeR2Path } from "@/lib/r2";

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  endpoint: string;
  host: string;
};

type R2ListItem = {
  key: string;
  lastModified?: string;
  size?: number;
};

const region = "auto";
const service = "s3";

function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.R2_BUCKET_NAME?.trim();

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing R2 server environment variables: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME.");
  }

  const host = `${accountId}.r2.cloudflarestorage.com`;

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    endpoint: `https://${host}`,
    host,
  };
}

function hash(value: string | Buffer | Uint8Array) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hmac(key: crypto.BinaryLike, value: string) {
  return crypto.createHmac("sha256", key).update(value).digest();
}

function encodePathPart(value: string) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

function encodeR2Key(key: string) {
  return normalizeR2Path(key).split("/").map(encodePathPart).join("/");
}

function amzDate(date = new Date()) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function dateStamp(amzDateValue: string) {
  return amzDateValue.slice(0, 8);
}

function credentialScope(date: string) {
  return `${date}/${region}/${service}/aws4_request`;
}

function signingKey(secretAccessKey: string, date: string) {
  const dateKey = hmac(`AWS4${secretAccessKey}`, date);
  const regionKey = hmac(dateKey, region);
  const serviceKey = hmac(regionKey, service);
  return hmac(serviceKey, "aws4_request");
}

function canonicalQuery(params: URLSearchParams) {
  return Array.from(params.entries())
    .sort(([aKey, aValue], [bKey, bValue]) => (aKey === bKey ? aValue.localeCompare(bValue) : aKey.localeCompare(bKey)))
    .map(([key, value]) => `${encodePathPart(key)}=${encodePathPart(value)}`)
    .join("&");
}

async function signedFetch(method: string, key: string, init: { body?: string | Buffer | Uint8Array; contentType?: string; query?: URLSearchParams } = {}) {
  const config = getR2Config();
  const now = amzDate();
  const date = dateStamp(now);
  const body = init.body ?? "";
  const payloadHash = hash(body);
  const encodedKey = encodeR2Key(key);
  const canonicalUri = encodedKey ? `/${config.bucketName}/${encodedKey}` : `/${config.bucketName}`;
  const query = init.query ?? new URLSearchParams();
  const canonicalQueryString = canonicalQuery(query);
  const headers = new Headers();

  headers.set("x-amz-content-sha256", payloadHash);
  headers.set("x-amz-date", now);
  if (init.contentType) {
    headers.set("content-type", init.contentType);
  }

  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalHeaders = `host:${config.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${now}\n`;
  const canonicalRequest = [method, canonicalUri, canonicalQueryString, canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const stringToSign = ["AWS4-HMAC-SHA256", now, credentialScope(date), hash(canonicalRequest)].join("\n");
  const signature = crypto.createHmac("sha256", signingKey(config.secretAccessKey, date)).update(stringToSign).digest("hex");

  headers.set("authorization", `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${credentialScope(date)}, SignedHeaders=${signedHeaders}, Signature=${signature}`);

  const url = `${config.endpoint}${canonicalUri}${canonicalQueryString ? `?${canonicalQueryString}` : ""}`;
  return fetch(url, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : body,
    cache: "no-store",
  });
}

export async function getR2Object(key: string) {
  const response = await signedFetch("GET", key);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to read R2 object "${key}" (${response.status}).`);
  }

  return new Uint8Array(await response.arrayBuffer());
}

export async function getR2TextObject(key: string) {
  const object = await getR2Object(key);
  return object ? new TextDecoder().decode(object) : null;
}

export async function putR2Object(key: string, body: string | Buffer | Uint8Array, contentType = "application/octet-stream") {
  const response = await signedFetch("PUT", key, { body, contentType });

  if (!response.ok) {
    throw new Error(`Failed to write R2 object "${key}" (${response.status}).`);
  }
}

export async function deleteR2Object(key: string) {
  const response = await signedFetch("DELETE", key);

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete R2 object "${key}" (${response.status}).`);
  }
}

export async function objectExists(key: string) {
  const response = await signedFetch("HEAD", key);

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(`Failed to check R2 object "${key}" (${response.status}).`);
  }

  return true;
}

export async function listR2Objects(prefix: string) {
  const query = new URLSearchParams({
    "list-type": "2",
    prefix: normalizeR2Path(prefix),
  });
  const response = await signedFetch("GET", "", { query });

  if (!response.ok) {
    throw new Error(`Failed to list R2 objects for prefix "${prefix}" (${response.status}).`);
  }

  const xml = await response.text();
  const items: R2ListItem[] = [];
  const contentMatches = xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g);

  for (const match of contentMatches) {
    const content = match[1] ?? "";
    const key = content.match(/<Key>([\s\S]*?)<\/Key>/)?.[1]?.replace(/&amp;/g, "&");
    const lastModified = content.match(/<LastModified>([\s\S]*?)<\/LastModified>/)?.[1];
    const sizeText = content.match(/<Size>([\s\S]*?)<\/Size>/)?.[1];

    if (key) {
      items.push({ key, lastModified, size: sizeText ? Number(sizeText) : undefined });
    }
  }

  return items;
}

export function getR2PublicUrl(key: string) {
  return getPublicR2Url(key);
}

export function createR2PresignedPutUrl(key: string, expiresInSeconds = 300) {
  const config = getR2Config();
  const now = amzDate();
  const date = dateStamp(now);
  const encodedKey = encodeR2Key(key);
  const canonicalUri = `/${config.bucketName}/${encodedKey}`;
  const query = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${config.accessKeyId}/${credentialScope(date)}`,
    "X-Amz-Date": now,
    "X-Amz-Expires": String(expiresInSeconds),
    "X-Amz-SignedHeaders": "host",
  });
  const canonicalQueryString = canonicalQuery(query);
  const canonicalRequest = ["PUT", canonicalUri, canonicalQueryString, `host:${config.host}\n`, "host", "UNSIGNED-PAYLOAD"].join("\n");
  const stringToSign = ["AWS4-HMAC-SHA256", now, credentialScope(date), hash(canonicalRequest)].join("\n");
  const signature = crypto.createHmac("sha256", signingKey(config.secretAccessKey, date)).update(stringToSign).digest("hex");

  query.set("X-Amz-Signature", signature);

  return `${config.endpoint}${canonicalUri}?${canonicalQuery(query)}`;
}
