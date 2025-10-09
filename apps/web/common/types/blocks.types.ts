export type CodeBlock = {
  _type: "code";
  code: string;
  language: string;
  highlightedLines: number[];
};
