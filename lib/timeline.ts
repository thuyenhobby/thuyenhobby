export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  tags?: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    date: "2026-07-09",
    title: "Bắt đầu xây website cá nhân",
    description: "Tạo nền Next.js, TypeScript, Tailwind CSS và các route cơ bản.",
    tags: ["Next.js", "Setup"],
  },
  {
    date: "2026-07-09",
    title: "Đưa dự án lên GitHub",
    description: "Chuẩn bị repository, gitignore và workflow để deploy dễ hơn.",
    tags: ["GitHub", "Workflow"],
  },
  {
    date: "2026-07-09",
    title: "Deploy thành công lên Vercel",
    description: "Kết nối project với Vercel và xác nhận production build hoạt động.",
    tags: ["Vercel", "Deploy"],
  },
  {
    date: "2026-07-10",
    title: "Kích hoạt Cloudflare R2",
    description: "Thêm helper R2, asset registry và cấu hình next/image cho public URL.",
    tags: ["Cloudflare R2", "Assets"],
  },
  {
    date: "2026-07-10",
    title: "Chuyển hướng thành Personal Digital Room",
    description: "Biến website thành căn phòng số với Now, Lab, Notes, Tools, Ideas, Links và Timeline.",
    tags: ["Digital Room", "UI"],
  },
];
