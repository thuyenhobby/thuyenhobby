import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import { getPostsByTopic } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { getAllTopics, getTopicBySlug } from "@/lib/topics";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.name} | Topics`,
    description: topic.description,
    alternates: {
      canonical: `/topics/${topic.slug}`,
    },
    openGraph: {
      title: `${topic.name} | ${siteConfig.name} Blog`,
      description: topic.description,
      url: `${siteConfig.url}/topics/${topic.slug}`,
      siteName: `${siteConfig.name} Blog`,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const posts = getPostsByTopic(topic.slug);

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Topic</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{topic.name}</h1>
          <p className="mt-4 leading-7 text-muted">{topic.description}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
