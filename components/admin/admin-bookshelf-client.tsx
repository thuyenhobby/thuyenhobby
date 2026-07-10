"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BookshelfPost, BookshelfPostInput, BookshelfPostMetadata } from "@/types/bookshelf";

const emptyInput: BookshelfPostInput = {
  title: "",
  slug: "",
  description: "",
  topic: "",
  tags: [],
  content: "",
  coverImage: "",
  published: true,
  featured: false,
};

type PresignedUpload = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
};

type UploadAssetOptions = {
  scope?: "bookshelf-post";
  slug?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function headers(secret: string) {
  return {
    "content-type": "application/json",
    authorization: `Bearer ${secret}`,
  };
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function markdownForUpload(file: File, key: string) {
  const label = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim() || file.name;

  if (isImageFile(file)) {
    return `![${label}](${key})`;
  }

  return `[${file.name}](${key})`;
}

export function AdminBookshelfClient() {
  const [secret, setSecret] = useState("");
  const [posts, setPosts] = useState<BookshelfPostMetadata[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<BookshelfPostInput>(emptyInput);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedPost = useMemo(() => posts.find((post) => post.slug === selectedSlug), [posts, selectedSlug]);
  const publicPostHref = selectedSlug && form.published ? `/bookshelf/${form.slug || selectedSlug}` : null;

  useEffect(() => {
    const storedSecret = localStorage.getItem("bookshelf-admin-secret");
    if (storedSecret) {
      setSecret(storedSecret);
    }
  }, []);

  async function api<T>(url: string, init?: RequestInit) {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...headers(secret),
        ...(init?.headers ?? {}),
      },
    });
    const data = (await response.json()) as T & { error?: string };

    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    return data;
  }

  async function loadPosts() {
    if (!secret) {
      setMessage("Nhập ADMIN_SECRET trước.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      localStorage.setItem("bookshelf-admin-secret", secret);
      const data = await api<{ posts: BookshelfPostMetadata[] }>("/api/admin/bookshelf");
      setPosts(data.posts);
      setMessage(`Đã tải ${data.posts.length} bài.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không tải được bài.");
    } finally {
      setIsLoading(false);
    }
  }

  async function selectPost(slug: string) {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await api<{ post: BookshelfPost }>(`/api/admin/bookshelf/${slug}`);
      setSelectedSlug(slug);
      setForm({
        title: data.post.title,
        slug: data.post.slug,
        description: data.post.description,
        topic: data.post.topic,
        tags: data.post.tags,
        content: data.post.content,
        coverImage: data.post.coverImage ?? "",
        published: data.post.published,
        featured: Boolean(data.post.featured),
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không mở được bài.");
    } finally {
      setIsLoading(false);
    }
  }

  function newPost() {
    setSelectedSlug(null);
    setForm(emptyInput);
    setMessage("");
  }

  async function savePost() {
    setIsLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: form.tags,
      };
      const url = selectedSlug ? `/api/admin/bookshelf/${selectedSlug}` : "/api/admin/bookshelf";
      const method = selectedSlug ? "PUT" : "POST";
      const data = await api<{ post: BookshelfPost }>(url, {
        method,
        body: JSON.stringify(payload),
      });

      setSelectedSlug(data.post.slug);
      setForm({
        title: data.post.title,
        slug: data.post.slug,
        description: data.post.description,
        topic: data.post.topic,
        tags: data.post.tags,
        content: data.post.content,
        coverImage: data.post.coverImage ?? payload.coverImage,
        published: data.post.published,
        featured: Boolean(data.post.featured),
      });
      await loadPosts();
      setMessage(data.post.published ? "Đã lưu và bài sẽ hiển thị ở /bookshelf." : "Đã lưu draft. Draft chưa hiển thị ở /bookshelf.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không lưu được bài.");
    } finally {
      setIsLoading(false);
    }
  }

  async function publishPost(nextPublished: boolean) {
    if (!selectedSlug) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const data = await api<{ post: BookshelfPost }>(`/api/admin/bookshelf/${selectedSlug}`, {
        method: "PATCH",
        body: JSON.stringify({ action: nextPublished ? "publish" : "unpublish" }),
      });

      setForm((current) => ({ ...current, published: data.post.published }));
      await loadPosts();
      setMessage(nextPublished ? "Đã publish bài. Bài sẽ hiển thị ở /bookshelf." : "Đã chuyển về draft. Draft chưa hiển thị ở /bookshelf.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không đổi trạng thái bài.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePost() {
    if (!selectedSlug || !confirm("Xóa bài này?")) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await api(`/api/admin/bookshelf/${selectedSlug}`, { method: "DELETE" });
      newPost();
      await loadPosts();
      setMessage("Đã xóa bài.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không xóa được bài.");
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadAsset(file: File, options?: UploadAssetOptions) {
    const presign = await api<PresignedUpload>("/api/admin/uploads/presign", {
      method: "POST",
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        size: file.size,
        scope: options?.scope,
        slug: options?.slug,
      }),
    });
    const upload = await fetch(presign.uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "content-type": file.type,
      },
    });

    if (!upload.ok) {
      throw new Error("Upload lên R2 thất bại.");
    }

    await api("/api/admin/uploads/complete", {
      method: "POST",
      body: JSON.stringify({ key: presign.key }),
    });

    return presign;
  }

  async function uploadCover(file: File) {
    setIsUploading(true);
    setMessage("");

    try {
      const upload = await uploadAsset(file);
      setForm((current) => ({ ...current, coverImage: upload.key }));
      setMessage("Đã upload cover.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không upload được file.");
    } finally {
      setIsUploading(false);
    }
  }

  async function insertUploadIntoContent(file: File) {
    setIsUploading(true);
    setMessage("");

    try {
      const attachmentSlug = selectedSlug ?? slugify(form.slug || form.title);
      const upload = await uploadAsset(file, attachmentSlug ? { scope: "bookshelf-post", slug: attachmentSlug } : undefined);
      const snippet = markdownForUpload(file, upload.key);
      insertIntoContent(snippet);
      setMessage("Đã upload và chèn vào nội dung.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không chèn được file.");
    } finally {
      setIsUploading(false);
    }
  }

  function insertIntoContent(snippet: string) {
    const textarea = contentRef.current;

    setForm((current) => {
      if (!textarea) {
        const nextContent = current.content ? `${current.content}\n\n${snippet}` : snippet;
        return { ...current, content: nextContent };
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = current.content.slice(0, start);
      const after = current.content.slice(end);
      const needsBeforeBreak = before && !before.endsWith("\n") ? "\n\n" : "";
      const needsAfterBreak = after && !after.startsWith("\n") ? "\n\n" : "";
      const nextContent = `${before}${needsBeforeBreak}${snippet}${needsAfterBreak}${after}`;

      requestAnimationFrame(() => {
        textarea.focus();
        const cursor = before.length + needsBeforeBreak.length + snippet.length;
        textarea.setSelectionRange(cursor, cursor);
      });

      return { ...current, content: nextContent };
    });
  }

  function updateField<Key extends keyof BookshelfPostInput>(key: Key, value: BookshelfPostInput[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr]">
      <section className="rounded-3xl border border-border bg-background p-4 shadow-soft">
        <h1 className="text-xl font-semibold">Post Admin</h1>
        <label className="mt-4 block text-sm font-semibold">
          ADMIN_SECRET
          <input
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            type="password"
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="Bearer secret"
          />
        </label>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={loadPosts} className="focus-ring rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background">
            Tải bài
          </button>
          <button type="button" onClick={newPost} className="focus-ring rounded-xl border border-border px-3 py-2 text-sm font-semibold">
            Bài mới
          </button>
        </div>
        {message ? <p className="mt-4 rounded-xl bg-foreground/[0.04] p-3 text-sm text-muted">{message}</p> : null}
        <div className="mt-5 space-y-2">
          {posts.map((post) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => selectPost(post.slug)}
              className="focus-ring block w-full rounded-2xl border border-border px-3 py-3 text-left transition hover:border-accent"
            >
              <span className="block text-sm font-semibold">{post.title}</span>
              <span className="mt-1 block text-xs text-muted">
                {post.published ? "published" : "draft"} / {post.slug}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-background p-4 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{selectedPost ? "Sửa bài" : "Tạo bài"}</h2>
          <div className="flex flex-wrap gap-2">
            {publicPostHref ? (
              <a
                href={publicPostHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-xl border border-border px-3 py-2 text-sm font-semibold"
              >
                View public
              </a>
            ) : null}
            {selectedSlug ? (
              <button
                type="button"
                onClick={() => publishPost(!form.published)}
                disabled={isLoading}
                className="focus-ring rounded-xl border border-border px-3 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {form.published ? "Unpublish" : "Publish"}
              </button>
            ) : null}
            {selectedSlug ? (
              <button type="button" onClick={deletePost} className="focus-ring rounded-xl border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-600">
                Delete
              </button>
            ) : null}
            <button type="button" onClick={savePost} disabled={isLoading} className="focus-ring rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background disabled:opacity-60">
              Save
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">
            Title
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold">
            Slug
            <input value={form.slug} onChange={(event) => updateField("slug", slugify(event.target.value))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            Description
            <input value={form.description} onChange={(event) => updateField("description", event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold">
            Topic
            <input value={form.topic} onChange={(event) => updateField("topic", event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold">
            Tags
            <input value={form.tags.join(", ")} onChange={(event) => updateField("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold md:col-span-2">
            Cover key / URL
            <input value={form.coverImage ?? ""} onChange={(event) => updateField("coverImage", event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
          </label>
          <label className="text-sm font-semibold">
            Upload cover
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={isUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.currentTarget.value = "";
                if (file) void uploadCover(file);
              }}
              className="mt-2 block w-full text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Chèn ảnh/file
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,application/zip"
              disabled={isUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.currentTarget.value = "";
                if (file) void insertUploadIntoContent(file);
              }}
              className="mt-2 block w-full text-sm"
            />
          </label>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={Boolean(form.published)} onChange={(event) => updateField("published", event.target.checked)} />
              published
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => updateField("featured", event.target.checked)} />
              featured
            </label>
          </div>
        </div>
        {!form.published ? (
          <p className="mt-4 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-800 dark:text-amber-200">
            Bài đang là draft nên chưa xuất hiện ở trang /bookshelf. Bấm Publish hoặc bật published rồi Save.
          </p>
        ) : null}

        <label className="mt-5 block text-sm font-semibold">
          Markdown / MDX-like content
          <textarea
            ref={contentRef}
            value={form.content}
            onChange={(event) => updateField("content", event.target.value)}
            rows={18}
            className="mt-2 w-full rounded-2xl border border-border bg-background p-4 font-mono text-sm leading-7 outline-none focus:border-accent"
            placeholder="# Nội dung bài viết"
          />
        </label>
      </section>
    </main>
  );
}
