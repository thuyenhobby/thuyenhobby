import { ButtonLink } from "@/components/ui/button";
import { R2Image } from "@/components/ui/r2-image";
import { assets } from "@/lib/assets";
import { isRemoteAssetUrl } from "@/lib/r2";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const hasAvatar = isRemoteAssetUrl(assets.avatar);

  return (
    <section className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex size-28 items-center justify-center overflow-hidden rounded-full border border-border bg-accent/10 shadow-soft sm:size-32">
          {hasAvatar ? (
            <R2Image
              src={assets.avatar}
              alt="Thuyên Trần profile photo"
              width={128}
              height={128}
              priority
              className="size-full object-cover"
              fallbackLabel="TT"
              fallbackClassName="text-2xl font-semibold text-accent"
            />
          ) : (
            <span className="text-2xl font-semibold text-accent">TT</span>
          )}
        </div>
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
          <ButtonLink
            href={assets.cv}
            variant="ghost"
            target="_blank"
            rel="noreferrer"
            aria-label="Download Thuyên Trần CV"
          >
            Download CV
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
