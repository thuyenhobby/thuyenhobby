import { assets } from "@/lib/assets";

export type ShelfPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  topic: string;
  tags: string[];
  readingTime?: string;
  coverImage?: string;
  published: boolean;
  featured?: boolean;
  content: string;
};

export const shelfPosts: ShelfPost[] = [
  {
    id: "why-thuyen-room",
    title: "Vì sao tôi xây Thuyên Hobby",
    slug: "vi-sao-toi-xay-thuyen-room",
    description: "Lý do tôi chọn mô hình căn phòng số.",
    date: "2026-07-10",
    topic: "Room",
    tags: ["Room", "Personal Build"],
    readingTime: "4 phút đọc",
    coverImage: assets.blog.learningNotes,
    published: true,
    featured: true,
    content:
      "Tôi muốn có một nơi riêng trên internet để lưu tài nguyên, bài viết và các công cụ nhỏ. Mô hình căn phòng giúp mọi thứ có vị trí rõ hơn: rương đồ cho tài nguyên, giá sách cho bài viết và bàn công cụ cho tiện ích cá nhân.",
  },
  {
    id: "first-github-website",
    title: "Đưa website lên GitHub",
    slug: "dua-website-len-github",
    description: "Các bước nhỏ để dự án dễ theo dõi hơn.",
    date: "2026-07-09",
    topic: "GitHub",
    tags: ["GitHub", "Git"],
    readingTime: "5 phút đọc",
    coverImage: assets.blog.githubGuide,
    published: true,
    content:
      "GitHub giúp tôi giữ lại lịch sử thay đổi của dự án. Điều quan trọng là có .gitignore đúng, commit nhỏ và README đủ rõ để quay lại sau này vẫn hiểu mình đã làm gì.",
  },
  {
    id: "vercel-deploy",
    title: "Deploy website với Vercel",
    slug: "deploy-website-voi-vercel",
    description: "Deploy nhanh cho website Next.js cá nhân.",
    date: "2026-07-08",
    topic: "Deployment",
    tags: ["Vercel", "Next.js"],
    readingTime: "5 phút đọc",
    coverImage: assets.blog.vercelDeploy,
    published: true,
    featured: true,
    content:
      "Vercel giúp workflow đơn giản: push code, xem preview, kiểm tra build và đưa lên production. Với website cá nhân, vòng lặp ngắn giúp tôi ít ngại sửa và thử nghiệm hơn.",
  },
  {
    id: "r2-resources",
    title: "Lưu tài nguyên bằng Cloudflare R2",
    slug: "luu-tai-nguyen-bang-cloudflare-r2",
    description: "Tách ảnh/file public khỏi repository.",
    date: "2026-07-07",
    topic: "Cloudflare R2",
    tags: ["R2", "Assets"],
    readingTime: "6 phút đọc",
    coverImage: assets.blog.cloudflareR2,
    published: true,
    content:
      "Tôi dùng R2 để lưu asset public như avatar, cover và file. Component không tự nối URL mà đi qua lib/assets.ts và lib/r2.ts để tránh hard-code base URL ở nhiều nơi.",
  },
  {
    id: "organize-digital-room",
    title: "Tổ chức một không gian số cá nhân",
    slug: "to-chuc-mot-khong-gian-so-ca-nhan",
    description: "Bài học nhỏ về UI, routing và data.",
    date: "2026-07-06",
    topic: "Learning Notes",
    tags: ["Learning", "UI"],
    readingTime: "5 phút đọc",
    coverImage: assets.blog.nextjsStructure,
    published: true,
    featured: true,
    content:
      "Khi dùng metaphor căn phòng, dữ liệu và navigation trở nên có ý nghĩa hơn. Điều quan trọng là giữ mọi thứ gọn: chỉ bốn khu vực chính, dữ liệu tách riêng và build luôn ổn định.",
  },
];

export function getPublishedShelfPosts() {
  return shelfPosts.filter((post) => post.published).sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getFeaturedShelfPosts() {
  return getPublishedShelfPosts().filter((post) => post.featured);
}

export function getFeaturedPosts() {
  return getFeaturedShelfPosts();
}

export function getShelfPostBySlug(slug: string) {
  return getPublishedShelfPosts().find((post) => post.slug === slug);
}
