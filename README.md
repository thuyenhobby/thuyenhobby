# Thuyên Room

Personal Digital Room của Thuyên: một căn phòng số cá nhân được xây bằng Next.js App Router, TypeScript, Tailwind CSS, Vercel và Cloudflare R2.

Website không phải portfolio, CV online hay blog truyền thống. Nó được tổ chức như một căn phòng riêng trên internet với 4 khu vực chính:

- `/` - Room: không gian tổng quan.
- `/resources` - Rương đồ: tài nguyên, liên kết, template, checklist, snippet.
- `/bookshelf` - Giá sách: bài viết, ghi chép dài hơn, hành trình học công nghệ.
- `/tools` - Công cụ: các tiện ích nhỏ và tool cá nhân.
- `/about` - Giới thiệu ngắn về căn phòng và chủ nhân.

Các route cũ như `/blog`, `/notes`, `/lab`, `/ideas`, `/links`, `/timeline`, `/projects` vẫn còn để không phá dữ liệu/build cũ, nhưng không còn là trọng tâm navigation chính.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel
- Cloudflare R2 cho assets public
- Canvas 2D cho room scene

## Chạy Local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Build

```bash
npm run typecheck
npm run lint
npm run build
```

## Cấu Trúc Dữ Liệu

- `lib/room.ts`: 4 zone chính trong căn phòng.
- `lib/resources.ts`: dữ liệu Rương đồ.
- `lib/bookshelf.ts`: dữ liệu Giá sách và bài viết.
- `lib/tools.ts`: dữ liệu Công cụ cá nhân.
- `lib/assets.ts`: registry asset R2.
- `lib/r2.ts`: helper tạo URL public từ Cloudflare R2.

## Thêm Tài Nguyên

Thêm item mới vào `lib/resources.ts`:

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

## Thêm Bài Viết

Thêm bài mới vào `lib/bookshelf.ts`. Route chi tiết sẽ là `/bookshelf/[slug]`.

```ts
{
  title: "Post title",
  slug: "post-title",
  description: "Short summary",
  date: "2026-07-10",
  topic: "Personal Digital Room",
  tags: ["Room"],
  readingTime: "4 phút đọc",
  published: true,
  featured: true,
  content: "Sample content..."
}
```

## Thêm Công Cụ

Thêm tool mới vào `lib/tools.ts`:

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

## Cloudflare R2 Assets

Tạo `.env.local` từ `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-r2-public-url.r2.dev
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
```

`NEXT_PUBLIC_R2_PUBLIC_URL` là public. Các biến `R2_*` còn lại là server-only, chưa dùng ở client và không được expose qua API public.

Không commit `.env.local`.

## R2-powered Bookshelf

Ke sach co the doc va quan ly bai viet truc tiep tren Cloudflare R2.

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

`bookshelf/index.json` la danh sach metadata. Moi bai co metadata rieng va file `index.mdx`.

Admin:

- Vao `/admin/bookshelf`.
- Nhap `ADMIN_SECRET`.
- Tao, sua, xoa, publish/unpublish bai.
- Upload cover va chen anh/file vao noi dung qua presigned PUT URL.
- Anh/file chen trong bai se duoc luu vao `bookshelf/posts/[slug]/attachments/` khi bai co slug.
- Khong dua R2 secret ra client; admin API luon can `ADMIN_SECRET`.

Env can co tren local/Vercel:

```bash
NEXT_PUBLIC_R2_PUBLIC_URL=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
ADMIN_SECRET=
```

Public routes:

- `/bookshelf` doc `bookshelf/index.json` va chi hien thi `published=true`.
- `/bookshelf/[slug]` doc `metadata.json` va `index.mdx` cua slug.
- Neu R2 chua san sang hoac env thieu, app dung fallback an toan thay vi crash trang man hinh.

## Deploy Vercel

1. Push code lên GitHub.
2. Import project trong Vercel.
3. Thêm `NEXT_PUBLIC_SITE_URL` và `NEXT_PUBLIC_R2_PUBLIC_URL`.
4. Build command: `npm run build`.
5. Redeploy khi đổi domain R2 để `next/image` nhận đúng hostname.
