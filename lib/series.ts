import { assets } from "@/lib/assets";
import type { Series } from "@/types/series";

export const seriesList: Series[] = [
  {
    title: "Xây dựng blog cá nhân từ con số 0",
    slug: "xay-dung-blog-ca-nhan-tu-con-so-0",
    description:
      "Các bài viết ghi lại quá trình biến một website cá nhân thành blog chia sẻ kiến thức có cấu trúc.",
    posts: [
      "hanh-trinh-xay-dung-blog-ca-nhan-voi-nextjs",
      "cloudflare-r2-la-gi-va-cach-dung-de-luu-anh-cho-blog",
    ],
    coverImage: assets.series.buildBlogFromZero,
  },
  {
    title: "Next.js cho người mới",
    slug: "nextjs-cho-nguoi-moi",
    description:
      "Những ghi chú nền tảng về Next.js, cấu trúc thư mục, GitHub và cách bắt đầu dự án cá nhân.",
    posts: [
      "cau-truc-thu-muc-nextjs-sach-cho-blog-ca-nhan",
      "cach-dua-du-an-len-github-cho-nguoi-moi-bat-dau",
    ],
    coverImage: assets.series.nextjsForBeginners,
  },
  {
    title: "Deploy website cá nhân chuyên nghiệp",
    slug: "deploy-website-ca-nhan-chuyen-nghiep",
    description:
      "Tập trung vào Vercel, environment variables, domain, asset storage và cách deploy an toàn hơn.",
    posts: ["vi-sao-toi-chon-vercel-de-deploy-website-ca-nhan"],
    coverImage: assets.series.professionalDeploy,
  },
];

export function getAllSeries() {
  return seriesList;
}

export function getSeriesBySlug(slug: string) {
  return seriesList.find((series) => series.slug === slug);
}
