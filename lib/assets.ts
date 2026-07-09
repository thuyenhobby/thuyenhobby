import { getR2PublicUrl } from "@/lib/r2";

export const assets = {
  roomHero: getR2PublicUrl("room/hero.jpg"),
  chestCover: getR2PublicUrl("room/chest-cover.jpg"),
  bookshelfCover: getR2PublicUrl("room/bookshelf-cover.jpg"),
  toolsCover: getR2PublicUrl("room/tools-cover.jpg"),
  avatar: getR2PublicUrl("avatar/thuyen-tran.jpg"),
  deskImage: getR2PublicUrl("room/desk.jpg"),
  labImage: getR2PublicUrl("room/lab.jpg"),
  cv: getR2PublicUrl("cv/thuyen-tran-cv.pdf"),
  projects: {
    personalWebsite: getR2PublicUrl("projects/personal-website-cover.jpg"),
    blogPlatform: getR2PublicUrl("projects/blog-platform-cover.jpg"),
    r2Gallery: getR2PublicUrl("projects/r2-gallery-cover.jpg"),
  },
  blog: {
    nextjsPortfolio: getR2PublicUrl("blog/nextjs-portfolio-cover.jpg"),
    vercelDeploy: getR2PublicUrl("blog/vercel-deploy-cover.jpg"),
    cloudflareR2: getR2PublicUrl("blog/cloudflare-r2-cover.jpg"),
    githubGuide: getR2PublicUrl("blog/github-guide-cover.jpg"),
    nextjsStructure: getR2PublicUrl("blog/nextjs-structure-cover.jpg"),
    learningNotes: getR2PublicUrl("blog/learning-notes-cover.jpg"),
  },
  series: {
    buildBlogFromZero: getR2PublicUrl("series/build-blog-from-zero-cover.jpg"),
    nextjsForBeginners: getR2PublicUrl("series/nextjs-for-beginners-cover.jpg"),
    professionalDeploy: getR2PublicUrl("series/professional-deploy-cover.jpg"),
  },
};
