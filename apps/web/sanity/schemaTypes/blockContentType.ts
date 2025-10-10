import { defineType } from "sanity";
import TiptapInput from "../components/TiptapInput";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "string",
  components: {
    input: TiptapInput,
  },
});
