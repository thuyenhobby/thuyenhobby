# Professional Portfolio Blog

Website ca nhan/portfolio/blog duoc xay dung bang Next.js App Router, TypeScript va Tailwind CSS.

## Tinh nang

- App Router voi cac trang Home, About, Projects, Blog va Contact.
- Layout dung chung: Header, Footer, Container, Section.
- Dark mode bang class strategy va localStorage.
- SEO metadata rieng cho tung trang.
- Blog Markdown trong `content/blog`.
- Projects dung du lieu tinh trong `lib/projects.ts`.
- San sang deploy len Vercel.
- File `.env.example` cho Cloudflare R2, khong hard-code secret.

## Cai dat

```bash
npm install
npm run dev
```

Mo `http://localhost:3000` de xem local.

## Lenh huu ich

```bash
npm run build
npm run start
npm run lint
npm run typecheck
```

## Viet blog

Them file Markdown vao `content/blog`:

```md
---
title: "Tieu de bai viet"
description: "Mo ta ngan cho SEO va danh sach bai viet"
date: "2026-07-09"
---

Noi dung bai viet...
```

Slug duoc lay tu ten file, vi du `content/blog/my-post.md` thanh `/blog/my-post`.

## Projects

Cap nhat danh sach du an trong `lib/projects.ts`. Khong dua file media lon vao repo; hay dung CDN hoac Cloudflare R2 va chi luu URL cong khai khi can.

## Cloudflare R2

Sao chep `.env.example` thanh `.env.local` va dien gia tri thuc te:

```bash
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

Khong commit `.env.local` hoac bat ky secret nao len repository.

## Deploy len Vercel

1. Push project len GitHub/GitLab/Bitbucket.
2. Import repository trong Vercel.
3. Chon framework preset `Next.js`.
4. Them cac bien moi truong R2 trong Project Settings neu website can truy cap R2.
5. Deploy.

## Cau truc du an

```txt
app/
  about/
  blog/
  contact/
  projects/
components/
  layout/
content/
  blog/
lib/
```
