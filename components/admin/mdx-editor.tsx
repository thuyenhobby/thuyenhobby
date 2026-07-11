"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import type { ImageUploadHandler, MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

type AdminMdxEditorProps = Omit<MDXEditorProps, "plugins"> & {
  imageUploadHandler?: NonNullable<ImageUploadHandler>;
};

const ClientEditor = dynamic(
  () => import("@/components/admin/mdx-editor-client").then((mod) => mod.AdminMdxEditorClient),
  {
    ssr: false,
    loading: () => (
      <div className="mt-2 min-h-[28rem] rounded-2xl border border-border bg-foreground/[0.03] p-4 text-sm font-semibold text-muted">
        Đang tải editor...
      </div>
    ),
  },
);

export const AdminMdxEditor = forwardRef<MDXEditorMethods, AdminMdxEditorProps>((props, ref) => {
  return <ClientEditor {...props} editorRef={ref} />;
});

AdminMdxEditor.displayName = "AdminMdxEditor";
