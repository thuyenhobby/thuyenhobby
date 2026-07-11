# anx.thnw

A personal workspace for notes, memories, and small things I build.

This is not a traditional portfolio, CV page, or blog template. The public navigation is intentionally compact:

- `/` - Workspace: overview board.
- `/me` - Me: identity, current status, stack, links.
- `/post` - Post: longer notes powered by static fallback data or Cloudflare R2.
- `/memory` - Memory: saved links, files, snippets, and checklists.
- `/drawer` - Drawer: small tools, experiments, and utilities.

Legacy routes such as `/about`, `/desk`, `/bookshelf`, `/resources`, `/tools`, `/blog`, `/notes`, `/lab`, `/ideas`, `/links`, `/timeline`, and `/projects` are kept to avoid breaking old links/builds, but they are not the main navigation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel
- Cloudflare R2 for public assets and Post content

## Local

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Data

- `lib/room.ts`: Workspace zones shown on the homepage.
- `lib/bookshelf.ts`: fallback Post data.
- `lib/resources.ts`: Memory items.
- `lib/tools.ts`: Drawer tools.
- `lib/assets.ts`: R2 asset registry.
- `lib/r2.ts`: public R2 URL helper.

## Add A Memory Item

```ts
{
  title: "Resource name",
  description: "Short description",
  url: "https://example.com",
  category: "docs",
  tags: ["Next.js"],
  type: "link",
  favorite: true,
  addedAt: "2026-07-10"
}
```

## Add A Post Fallback

Add a post to `lib/bookshelf.ts`. Public detail route is `/post/[slug]`.

```ts
{
  title: "Post title",
  slug: "post-title",
  description: "Short summary",
  date: "2026-07-10",
  topic: "Workspace",
  tags: ["Notes"],
  readingTime: "4 min read",
  published: true,
  featured: true,
  content: "Sample content..."
}
```

## Add A Drawer Tool

```ts
{
  name: "Tool name",
  slug: "tool-name",
  description: "What it does",
  status: "building",
  tags: ["Utility"],
  builtWith: ["Next.js"],
  addedAt: "2026-07-10",
  featured: true
}
```

## Cloudflare R2

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-r2-public-url.r2.dev
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
ADMIN_SECRET=
```

`NEXT_PUBLIC_R2_PUBLIC_URL` is public. `R2_*` and `ADMIN_SECRET` are server-only and must not be exposed to client components or public APIs.

Do not commit `.env.local`.

## R2-powered Post Admin

The admin UI is at `/admin/post`. The legacy `/admin/bookshelf` route redirects there, while the internal API and R2 object keys keep the existing `bookshelf` naming to avoid data migration.

Object layout:

```txt
bookshelf/index.json
bookshelf/posts/[slug]/index.mdx
bookshelf/posts/[slug]/metadata.json
bookshelf/posts/[slug]/cover.jpg
bookshelf/posts/[slug]/attachments/[filename]
uploads/images/[yyyy]/[mm]/[filename]
uploads/files/[yyyy]/[mm]/[filename]
```

Admin flow:

- Open `/admin/post`.
- Enter `ADMIN_SECRET`.
- Create, edit, delete, publish, or unpublish posts.
- Write with MDXEditor rich text/source mode.
- Upload covers and inline files through the protected admin upload API.
- Public `/post` only shows `published=true`.
- If R2 is not ready or env is missing, the app falls back safely instead of crashing.

## Deploy Vercel

1. Push code to GitHub.
2. Import the project in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_R2_PUBLIC_URL`, and server-only R2/admin env vars.
4. Build command: `npm run build`.
5. Redeploy after changing the R2 public domain so `next/image` receives the correct hostname.
