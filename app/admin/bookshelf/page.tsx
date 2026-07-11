import { redirect } from "next/navigation";

export const metadata = {
  title: "Post Admin Redirect",
};

export default function AdminBookshelfPage() {
  redirect("/admin/post");
}
