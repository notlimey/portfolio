import { set, unset } from "sanity";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  type SanityDocument,
  typeObject,
  type StringInputProps,
} from "sanity";

const TiptapInput = (
  props: StringInputProps & { document: SanityDocument },
) => {
  const { value, onChange, document } = props;

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      if (Object.keys(json).length > 0) {
        onChange(set(JSON.stringify(json)));
      } else {
        onChange(unset());
      }
    },
  });

  return <EditorContent editor={editor} />;
};

export default TiptapInput;