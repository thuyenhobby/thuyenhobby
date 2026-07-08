import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Lien he hop tac du an web, portfolio hoac blog chuyen nghiep.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold text-accent">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Hay bat dau mot cuoc tro chuyen ro rang.</h1>
        <p className="mt-5 leading-8 text-muted">
          Gui email den{" "}
          <a className="font-semibold text-accent hover:underline" href="mailto:hello@example.com">
            hello@example.com
          </a>{" "}
          hoac ket noi qua LinkedIn/GitHub. Form lien he co the duoc them sau voi server actions
          hoac dich vu email rieng.
        </p>
      </Container>
    </Section>
  );
}
