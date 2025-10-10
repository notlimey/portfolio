import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PortableText({ value }: { value: string }) {
  const editor = useEditor({
    editable: false,
    content: value ? JSON.parse(value) : "",
    extensions: [StarterKit],
  });

  return <EditorContent editor={editor} />;
}
