import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend / API",
    skills: ["REST API", "Server Actions", "Authentication Basics", "Data Modeling"],
  },
  {
    title: "Tools",
    skills: ["Git", "ESLint", "npm", "VS Code", "Figma Basics"],
  },
  {
    title: "Deployment / Cloud",
    skills: ["Vercel", "Cloudflare R2", "Environment Variables", "SEO"],
  },
];

export function SkillsSection() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold text-accent">Skills</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Kỹ năng chính</h2>
          <p className="mt-4 leading-7 text-muted">
            Tôi ưu tiên nền tảng frontend chắc, cách làm việc có quy trình và khả năng đưa sản phẩm
            lên môi trường thật một cách ổn định.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
