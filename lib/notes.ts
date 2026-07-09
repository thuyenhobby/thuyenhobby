export type Note = {
  title: string;
  content: string;
  tags: string[];
  date: string;
  type: "quick-note" | "command" | "lesson" | "bug-fix";
};

export const notes: Note[] = [
  {
    title: "Git remote là gì?",
    content: "Remote là địa chỉ repository bên ngoài, thường là GitHub, nơi mình push/pull code.",
    tags: ["Git", "GitHub"],
    date: "2026-07-10",
    type: "quick-note",
  },
  {
    title: ".env.local dùng để làm gì?",
    content: "Dùng để lưu biến môi trường local, không commit lên GitHub, ví dụ R2 public URL hoặc secret server-side.",
    tags: ["Env", "Security"],
    date: "2026-07-10",
    type: "lesson",
  },
  {
    title: "Vercel tự deploy khi git push",
    content: "Khi project nối với GitHub, mỗi push có thể tạo preview hoặc production deployment tùy branch.",
    tags: ["Vercel", "Deploy"],
    date: "2026-07-09",
    type: "quick-note",
  },
  {
    title: "Cloudflare R2 public URL",
    content: "Chỉ NEXT_PUBLIC_R2_PUBLIC_URL được dùng ở client. Secret R2 không được đưa vào component.",
    tags: ["R2", "Security"],
    date: "2026-07-09",
    type: "lesson",
  },
  {
    title: "Không commit secret lên GitHub",
    content: "Luôn kiểm tra .gitignore có .env.local. Secret đã lộ nên rotate ngay.",
    tags: ["Security", "GitHub"],
    date: "2026-07-08",
    type: "bug-fix",
  },
];
