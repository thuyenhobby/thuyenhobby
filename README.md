# Thuyên Trần Blog

Blog chia sẻ kiến thức về lập trình web, Next.js, frontend, deployment, Cloudflare R2, Vercel, GitHub và hành trình tự xây sản phẩm cá nhân. Dự án dùng Next.js App Router, TypeScript và Tailwind CSS, deploy trên Vercel.

## Tính Năng

- Trang chủ tập trung vào bài viết mới, topics, series và giới thiệu tác giả ngắn.
- Blog có danh sách bài viết, trang chi tiết bài viết, cover image, tags, topic, reading time và related posts.
- Topics: `/topics` và `/topics/[slug]`.
- Series: `/series` và `/series/[slug]`.
- Cloudflare R2 asset registry qua `lib/r2.ts` và `lib/assets.ts`.
- SEO metadata cho Home, Blog, Topics, Series, About, Contact và bài viết.
- Dark mode, responsive, typography tối giản, dễ đọc.

## Cài Đặt Local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm Tra

```bash
npm run typecheck
npm run lint
npm run build
```

## Cấu Trúc Chính

```txt
app/
  blog/
  topics/
  series/
components/
  layout/
  sections/
  ui/
lib/
  posts.ts
  topics.ts
  series.ts
  assets.ts
  r2.ts
types/
```

## Quản Lý Nội Dung

- Bài viết mẫu nằm trong `lib/posts.ts`.
- Topics nằm trong `lib/topics.ts`.
- Series nằm trong `lib/series.ts`.
- `content/blog` được giữ để sau này chuyển sang Markdown/MDX.

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

## Deploy Vercel

1. Push code lên GitHub.
2. Import project trong Vercel.
3. Thêm `NEXT_PUBLIC_SITE_URL` và `NEXT_PUBLIC_R2_PUBLIC_URL`.
4. Build command: `npm run build`.
5. Redeploy khi đổi domain R2 để `next/image` nhận đúng hostname.
