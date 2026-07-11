import { redirect } from "next/navigation";

type BookshelfRedirectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookshelfRedirectPage({ params }: BookshelfRedirectPageProps) {
  const { slug } = await params;
  redirect(`/post/${slug}`);
}
