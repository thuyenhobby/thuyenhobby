export type LabItem = {
  title: string;
  description: string;
  status: "idea" | "testing" | "building" | "done" | "paused";
  tags: string[];
  date: string;
  link?: string;
};

export const labItems: LabItem[] = [
  {
    title: "Cloudflare R2 Assets",
    description: "Quản lý ảnh và file public qua helper tập trung, không hard-code base URL.",
    status: "building",
    tags: ["R2", "Assets", "Next.js"],
    date: "2026-07-10",
  },
  {
    title: "Next.js App Router",
    description: "Thử tổ chức route theo nhiều khu vực nhỏ thay vì một blog hoặc portfolio truyền thống.",
    status: "testing",
    tags: ["Next.js", "Routing"],
    date: "2026-07-10",
  },
  {
    title: "Vercel Auto Deploy",
    description: "Giữ workflow push, build, preview và deploy đơn giản cho website cá nhân.",
    status: "done",
    tags: ["Vercel", "Deploy"],
    date: "2026-07-09",
  },
  {
    title: "Dark Mode Interface",
    description: "Tinh chỉnh giao diện tối để có cảm giác cozy tech room nhưng vẫn dễ đọc.",
    status: "testing",
    tags: ["UI", "Dark Mode"],
    date: "2026-07-09",
  },
  {
    title: "Personal Room UI",
    description: "Biến homepage thành một căn phòng số gồm các món đồ có thể bấm vào.",
    status: "building",
    tags: ["Design", "Room"],
    date: "2026-07-10",
  },
  {
    title: "R2 Image Gallery Idea",
    description: "Ý tưởng làm gallery ảnh nhỏ dùng R2 cho các ảnh học tập, screenshot và demo.",
    status: "idea",
    tags: ["R2", "Gallery"],
    date: "2026-07-10",
  },
];
