"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import type { ImageUploadHandler, MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { cn } from "@/lib/utils";

type AdminMdxEditorClientProps = Omit<MDXEditorProps, "plugins"> & {
  editorRef?: ForwardedRef<MDXEditorMethods>;
  imageUploadHandler?: NonNullable<ImageUploadHandler>;
};

const codeBlockLanguages = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  js: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  ts: "TypeScript",
  tsx: "TSX",
  txt: "Text",
};

export function AdminMdxEditorClient({
  className,
  contentEditableClassName,
  editorRef,
  imageUploadHandler,
  ...props
}: AdminMdxEditorClientProps) {
  return (
    <MDXEditor
      {...props}
      ref={editorRef}
      className={cn("admin-mdx-editor", className)}
      contentEditableClassName={cn("admin-mdx-content", contentEditableClassName)}
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          disableImageResize: false,
          imageUploadHandler,
        }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({ codeBlockLanguages }),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarClassName: "admin-mdx-toolbar",
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={["rich-text", "source"]}>
              <UndoRedo />
              <Separator />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle options={["bullet", "number", "check"]} />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertCodeBlock />
              <InsertThematicBreak />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
    />
  );
}
