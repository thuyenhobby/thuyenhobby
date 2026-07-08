import { getPublishedPosts } from "@/lib/posts";
import type { Topic } from "@/types/topic";

function slugifyTopic(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const baseTopics: Topic[] = [
  {
    name: "Next.js",
    slug: "next-js",
    description: "Ghi chú về App Router, metadata, static generation và cách xây blog bằng Next.js.",
  },
  {
    name: "Frontend",
    slug: "frontend",
    description: "UI, component, TypeScript, Tailwind CSS và những quyết định nhỏ khi làm giao diện.",
  },
  {
    name: "Deployment",
    slug: "deployment",
    description: "Triển khai website cá nhân, preview deployment, environment variables và quy trình release.",
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    description: "Cloudflare R2, asset public, ảnh blog và cách chuẩn bị hạ tầng nội dung.",
  },
  {
    name: "GitHub",
    slug: "github",
    description: "Git, GitHub, README, commit nhỏ và cách đưa dự án cá nhân lên repository sạch hơn.",
  },
  {
    name: "Learning Notes",
    slug: "learning-notes",
    description: "Ghi chú học tập, bài học nhỏ và những điều rút ra khi tự xây sản phẩm.",
  },
  {
    name: "Personal Build",
    slug: "personal-build",
    description: "Hành trình tự xây website, blog, workflow và những sản phẩm nhỏ phục vụ việc học.",
  },
];

export function getAllTopics() {
  const posts = getPublishedPosts();

  return baseTopics.map((topic) => ({
    ...topic,
    count: posts.filter((post) => slugifyTopic(post.topic) === topic.slug).length,
  }));
}

export function getTopicBySlug(slug: string) {
  return getAllTopics().find((topic) => topic.slug === slug);
}
