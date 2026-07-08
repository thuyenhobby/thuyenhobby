# Professional Portfolio Blog

Website ca nhan/portfolio/blog xay dung bang Next.js App Router, TypeScript va Tailwind CSS. Du an uu tien cau truc sach, SEO co ban, dark mode, performance va kha nang mo rong cho blog MDX, projects va Cloudflare R2 sau nay.

## Tinh nang

- App Router voi cac route `/`, `/about`, `/projects`, `/blog`, `/contact`.
- Layout dung chung: Header, Footer, main content, Container va Section.
- Homepage gom Hero, About preview, Skills, Featured projects, Latest posts va Contact CTA.
- Dark mode bang Tailwind class strategy va localStorage.
- Metadata SEO rieng cho tung trang, Open Graph co ban, `robots.txt` va `sitemap.xml`.
- Blog preview/list dùng dữ liệu tĩnh trong `lib/posts.ts`, sẵn sàng nâng cấp sang MDX sau này.
- Projects dung du lieu tinh trong `lib/projects.ts`.
- TypeScript strict, component tach theo `layout`, `sections`, `ui`.
- San sang deploy len Vercel, khong commit secret.

## Cai dat local

```bash
npm install
npm run dev
```

Mo `http://localhost:3000` de xem website.

## Build va kiem tra

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Cau truc du an

```txt
app/
  about/
  blog/
  contact/
  projects/
components/
  layout/
  sections/
  ui/
content/
  blog/
lib/
public/
types/
```

## Viết blog

Hiện tại danh sách bài viết được quản lý trong `lib/posts.ts`:

```ts
{
  title: "Tieu de bai viet",
  description: "Mo ta ngan cho SEO va danh sach bai viet",
  date: "2026-07-09",
  tags: ["Next.js"],
  slug: "tieu-de-bai-viet",
  published: true,
  content: "Noi dung ngan..."
}
```

Thư mục `content/blog` được giữ lại để nâng cấp sang Markdown/MDX ở giai đoạn sau.

## Projects

Cap nhat danh sach du an trong `lib/projects.ts`. Type du an nam trong `types/project.ts`.

Khong dua file media lon vao repository. Khi can anh, video hoac file downloadable, hay dung CDN/object storage va chi luu URL cong khai trong du lieu.

## Cloudflare R2

Du an da co `.env.example` cho domain public va R2:

```bash
NEXT_PUBLIC_SITE_URL=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

Khi tich hop R2, sao chep `.env.example` thanh `.env.local` va dien gia tri thuc te. Khong commit `.env.local` hoac bat ky secret nao len repository. Tren Vercel, cau hinh cac bien nay trong Project Settings.

## Deploy len Vercel

1. Push project len GitHub/GitLab/Bitbucket.
2. Import repository trong Vercel.
3. Chon framework preset `Next.js`.
4. Kiem tra build command la `npm run build`.
5. Them environment variables neu can tich hop R2.
6. Deploy.

## Ghi chu mo rong

- Dat `NEXT_PUBLIC_SITE_URL` tren Vercel thanh domain production de sitemap va canonical URL dung.
- Co the nang blog Markdown len MDX khi can component trong bai viet.
- Co the them `lib/r2` khi bat dau upload/list media tu Cloudflare R2.
