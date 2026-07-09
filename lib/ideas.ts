export type Idea = {
  title: string;
  description: string;
  status: "idea" | "planning" | "building" | "paused" | "done";
  tags: string[];
  priority?: "low" | "medium" | "high";
};

export const ideas: Idea[] = [
  {
    title: "Personal Dashboard",
    description: "Một dashboard nhỏ tổng hợp trạng thái học, build và mục tiêu gần nhất.",
    status: "planning",
    tags: ["Dashboard", "Now"],
    priority: "high",
  },
  {
    title: "R2 Image Gallery",
    description: "Gallery ảnh public lấy từ Cloudflare R2, có fallback khi ảnh chưa có.",
    status: "idea",
    tags: ["R2", "Gallery"],
    priority: "medium",
  },
  {
    title: "Bookmark Manager",
    description: "Lưu link học tập theo category, tag và ghi chú ngắn.",
    status: "idea",
    tags: ["Links", "Learning"],
  },
  {
    title: "Learning Tracker",
    description: "Theo dõi topic đang học, tài liệu đã đọc và bài học rút ra.",
    status: "idea",
    tags: ["Learning", "Notes"],
    priority: "medium",
  },
  {
    title: "Mini Note App",
    description: "Ứng dụng ghi chú cực nhỏ để thử server actions hoặc local storage.",
    status: "paused",
    tags: ["Notes", "App"],
  },
  {
    title: "Tech Timeline",
    description: "Biến timeline thành nơi ghi lại các mốc học và build đáng nhớ.",
    status: "building",
    tags: ["Timeline", "Personal"],
    priority: "high",
  },
  {
    title: "Command Library",
    description: "Thư viện command hay dùng cho Git, npm, Next.js và Vercel.",
    status: "idea",
    tags: ["Commands", "Tools"],
  },
];
