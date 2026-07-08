import type { BlogPost } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    slug: "hanh-trinh-xay-dung-website-ca-nhan-voi-nextjs",
    title: "Hành trình xây dựng website cá nhân với Next.js",
    description:
      "Những quyết định nền tảng khi xây dựng một portfolio cá nhân: cấu trúc App Router, nội dung, SEO và khả năng mở rộng.",
    date: "2026-07-09",
    tags: ["Next.js", "Portfolio", "Frontend"],
    published: true,
    content:
      "Website cá nhân không chỉ là nơi đặt vài đường link. Với tôi, đây là một không gian để trình bày cách làm việc, ghi lại quá trình học hỏi và giới thiệu những dự án có giá trị. Next.js là lựa chọn phù hợp vì cân bằng tốt giữa trải nghiệm phát triển, SEO và khả năng deploy nhanh.",
  },
  {
    slug: "vi-sao-toi-chon-vercel-de-deploy-portfolio",
    title: "Vì sao tôi chọn Vercel để deploy portfolio",
    description:
      "Vercel giúp quy trình deploy website cá nhân đơn giản, ổn định và phù hợp với các dự án Next.js hiện đại.",
    date: "2026-07-02",
    tags: ["Vercel", "Deployment", "Workflow"],
    published: true,
    content:
      "Với một portfolio cá nhân, tôi ưu tiên quy trình deploy ít ma sát: push code, kiểm tra build, preview và đưa lên production. Vercel làm tốt những việc này, đặc biệt khi dự án dùng Next.js và cần tốc độ lặp nhanh.",
  },
  {
    slug: "cloudflare-r2-la-gi-va-khi-nao-nen-dung",
    title: "Cloudflare R2 là gì và khi nào nên dùng",
    description:
      "Ghi chú ngắn về Cloudflare R2, object storage và cách chuẩn bị cho nhu cầu lưu ảnh, file hoặc media của website cá nhân.",
    date: "2026-06-25",
    tags: ["Cloudflare R2", "Storage", "Media"],
    published: true,
    content:
      "Cloudflare R2 là object storage phù hợp khi website cần lưu trữ media hoặc file tĩnh mà không muốn đưa trực tiếp vào repository. Với portfolio/blog, R2 có thể là nơi lưu ảnh dự án, file tải xuống hoặc hình minh họa cho bài viết.",
  },
];

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}
