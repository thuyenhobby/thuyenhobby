import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "About",
  description: "Gioi thieu kinh nghiem, gia tri lam viec va cach tiep can san pham.",
};

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Lam web ro rang, huu ich va ben vung.</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-muted">
          <p>
            Toi la developer tap trung vao frontend architecture, design systems va cac ung dung
            noi dung co SEO tot. Cach lam viec cua toi uu tien tinh don gian co chu dich.
          </p>
          <p>
            Website nay duoc cau truc de de mo rong: content nam rieng, component tai su dung duoc,
            metadata theo trang va dark mode khong phu thuoc secret hay dich vu ngoai.
          </p>
        </div>
      </Container>
    </Section>
  );
}
