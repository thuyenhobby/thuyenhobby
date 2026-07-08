import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {siteConfig.role}
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
          Xin chào, tôi là {siteConfig.author}.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Tôi xây dựng giao diện web hiện đại, dễ sử dụng và có nền tảng kỹ thuật rõ ràng. Website
          này là nơi tôi giới thiệu dự án, ghi lại quá trình học hỏi và chia sẻ góc nhìn về frontend.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/projects">View Projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Me
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
