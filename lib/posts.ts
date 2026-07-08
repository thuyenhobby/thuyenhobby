import { assets } from "@/lib/assets";
import type { BlogPost } from "@/types/blog";

function slugifyTopic(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const posts: BlogPost[] = [
  {
    slug: "hanh-trinh-xay-dung-blog-ca-nhan-voi-nextjs",
    title: "Hành trình xây dựng blog cá nhân với Next.js",
    description:
      "Những quyết định nền tảng khi chuyển một website cá nhân thành blog chia sẻ kiến thức: cấu trúc App Router, dữ liệu bài viết và trải nghiệm đọc.",
    date: "2026-07-09",
    updatedAt: "2026-07-09",
    tags: ["Next.js", "Blog", "Frontend"],
    topic: "Next.js",
    series: "xay-dung-blog-ca-nhan-tu-con-so-0",
    published: true,
    featured: true,
    readingTime: "6 phút đọc",
    coverImage: assets.blog.nextjsPortfolio,
    content: `
Một blog cá nhân tốt không cần bắt đầu bằng hệ thống phức tạp. Điều quan trọng hơn là có cấu trúc rõ ràng để viết đều, sửa dễ và mở rộng được khi nội dung nhiều lên.

## Vì sao chọn Next.js

Next.js giúp tôi có App Router, static generation, metadata theo từng trang và khả năng deploy rất nhanh trên Vercel. Với một blog kỹ thuật, những thứ này đủ để bắt đầu nghiêm túc mà không phải dựng quá nhiều hạ tầng.

## Tôi ưu tiên điều gì

- Trang chủ tập trung vào bài viết, chủ đề và series.
- Dữ liệu bài viết được tách khỏi component.
- Ảnh cover lấy từ Cloudflare R2 thông qua helper tập trung.
- Bố cục bài viết phải dễ đọc trên mobile trước.

## Bước tiếp theo

Khi nội dung ổn định hơn, tôi có thể chuyển phần content sang MDX để viết bài dài, thêm component minh họa và quản lý bài viết tốt hơn.
`,
  },
  {
    slug: "vi-sao-toi-chon-vercel-de-deploy-website-ca-nhan",
    title: "Vì sao tôi chọn Vercel để deploy website cá nhân",
    description:
      "Vercel giúp quy trình deploy blog cá nhân đơn giản, có preview rõ ràng và phù hợp với các dự án Next.js hiện đại.",
    date: "2026-07-02",
    tags: ["Vercel", "Deployment", "Workflow"],
    topic: "Deployment",
    series: "deploy-website-ca-nhan-chuyen-nghiep",
    published: true,
    featured: true,
    readingTime: "5 phút đọc",
    coverImage: assets.blog.vercelDeploy,
    content: `
Với một blog cá nhân, deploy nên là việc nhẹ nhàng. Nếu mỗi lần sửa bài hoặc đổi giao diện đều mất nhiều bước thủ công, mình sẽ ngại cải tiến website.

## Lý do tôi chọn Vercel

Vercel tích hợp rất tốt với Next.js. Tôi có thể push code lên GitHub, xem preview deployment và đưa thay đổi lên production sau khi kiểm tra.

## Điều đáng giá nhất

Điểm tôi thích nhất là feedback loop ngắn. Mỗi thay đổi đều có URL preview, giúp tôi kiểm tra giao diện, metadata và routing trước khi merge.

## Lưu ý khi dùng

Hãy cấu hình environment variables rõ ràng, đặc biệt là các biến public như domain site và R2 public URL. Secret server-side không nên xuất hiện trong client code.
`,
  },
  {
    slug: "cloudflare-r2-la-gi-va-cach-dung-de-luu-anh-cho-blog",
    title: "Cloudflare R2 là gì và cách dùng để lưu ảnh cho blog",
    description:
      "Ghi chú thực tế về cách dùng Cloudflare R2 làm nơi lưu ảnh cover, avatar và file public cho blog cá nhân.",
    date: "2026-06-25",
    tags: ["Cloudflare R2", "Storage", "Images"],
    topic: "Cloudflare",
    series: "xay-dung-blog-ca-nhan-tu-con-so-0",
    published: true,
    featured: true,
    readingTime: "7 phút đọc",
    coverImage: assets.blog.cloudflareR2,
    content: `
Cloudflare R2 là object storage phù hợp để lưu ảnh và file public cho blog. Thay vì đưa ảnh lớn vào repository, tôi lưu chúng trên R2 và chỉ giữ đường dẫn trong dữ liệu bài viết.

## Cách tôi tổ chức asset

Tôi dùng các thư mục như \`avatar/\`, \`blog/\`, \`series/\` và \`cv/\`. Component không tự nối URL; mọi thứ đi qua \`lib/assets.ts\` và \`lib/r2.ts\`.

## Vì sao cần helper riêng

Helper giúp tránh hard-code base URL ở nhiều nơi, xử lý slash thừa và fallback an toàn khi thiếu biến môi trường.

## Điều chưa làm ở giai đoạn này

Tôi chưa tạo upload API public. Khi cần upload, phần đó phải chạy ở server, có authentication và không expose secret R2 ra client.
`,
  },
  {
    slug: "cach-dua-du-an-len-github-cho-nguoi-moi-bat-dau",
    title: "Cách đưa dự án lên GitHub cho người mới bắt đầu",
    description:
      "Một checklist ngắn để đưa dự án cá nhân lên GitHub sạch hơn: gitignore, commit nhỏ, README và biến môi trường.",
    date: "2026-06-18",
    tags: ["GitHub", "Git", "Workflow"],
    topic: "GitHub",
    series: "nextjs-cho-nguoi-moi",
    published: true,
    readingTime: "4 phút đọc",
    coverImage: assets.blog.githubGuide,
    content: `
GitHub không chỉ là nơi lưu code. Với dự án cá nhân, đây còn là nơi thể hiện cách mình tổ chức công việc.

## Checklist cơ bản

- Có \`.gitignore\` để không commit \`.env.local\`, \`.next\` và \`node_modules\`.
- Viết README đủ để người khác chạy được dự án.
- Commit theo từng nhóm thay đổi nhỏ.
- Không đưa secret hoặc file media lớn vào repository.

## Một thói quen tốt

Trước khi push, hãy chạy build local. Việc này giúp giảm lỗi deploy và giữ repository đáng tin cậy hơn.
`,
  },
  {
    slug: "cau-truc-thu-muc-nextjs-sach-cho-blog-ca-nhan",
    title: "Cấu trúc thư mục Next.js sạch cho blog cá nhân",
    description:
      "Cách tách app, components, lib, content và types để blog cá nhân dễ bảo trì khi số lượng bài viết tăng lên.",
    date: "2026-06-10",
    tags: ["Next.js", "Architecture", "TypeScript"],
    topic: "Frontend",
    series: "nextjs-cho-nguoi-moi",
    published: true,
    readingTime: "6 phút đọc",
    coverImage: assets.blog.nextjsStructure,
    content: `
Cấu trúc thư mục tốt không phải để trông phức tạp hơn. Nó giúp mình biết đặt code ở đâu và giảm cảm giác rối khi dự án lớn dần.

## Cách tôi chia

- \`app/\` chứa routes và metadata.
- \`components/\` chứa UI dùng lại.
- \`lib/\` chứa dữ liệu, helper và config nhẹ.
- \`types/\` chứa TypeScript types dùng chung.
- \`content/\` được giữ sẵn cho MDX sau này.

## Nguyên tắc nhỏ

Component nên nhận dữ liệu qua props. Dữ liệu lặp lại nên nằm trong \`lib/\` hoặc \`content/\`, không rải trong nhiều component.
`,
  },
  {
    slug: "nhung-dieu-toi-hoc-duoc-khi-tu-xay-website-dau-tien",
    title: "Những điều tôi học được khi tự xây website đầu tiên",
    description:
      "Một vài ghi chú học tập về UI, deploy, cấu trúc code và cách kiên nhẫn cải thiện sản phẩm cá nhân từng bước.",
    date: "2026-06-01",
    tags: ["Learning Notes", "Personal Build", "Frontend"],
    topic: "Learning Notes",
    published: true,
    readingTime: "5 phút đọc",
    coverImage: assets.blog.learningNotes,
    content: `
Tự xây website đầu tiên dạy tôi nhiều thứ hơn là chỉ viết code. Tôi học cách đưa ra quyết định nhỏ, kiểm tra lại giả định và cải thiện từng phần.

## Điều quan trọng nhất

Đừng cố làm mọi thứ hoàn hảo từ đầu. Một website cá nhân có thể bắt đầu bằng vài trang rõ ràng, sau đó thêm blog, series, asset storage và metadata tốt hơn.

## Những bài học tôi giữ lại

- Nội dung quan trọng hơn hiệu ứng.
- Build pass quan trọng hơn cảm giác "chắc là được".
- Thiết kế tối giản giúp mình tập trung vào việc viết.
- Ghi chú lại quá trình học giúp mình nhìn thấy tiến bộ.
`,
  },
];

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getFeaturedPosts() {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getPostsByTopic(topicSlug: string) {
  return getPublishedPosts().filter((post) => slugifyTopic(post.topic) === topicSlug);
}

export function getPostsBySeries(seriesSlug: string) {
  return getPublishedPosts().filter((post) => post.series === seriesSlug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return getPublishedPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => candidate.topic === post.topic || candidate.series === post.series)
    .slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}
