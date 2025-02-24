import type { Row } from "./Row.ts";

export interface CodeBlockPack {
  type: "codeBlock";
  rows: Row[];
}

export interface CodeBlock {
  indent: number;
  type: "codeBlock";
  fileName: string;
  content: string;
}

export const convertToCodeBlock = (pack: CodeBlockPack): CodeBlock => {
  const {
    rows: [head, ...body],
  } = pack;
  const { indent = 0, text = "" } = head ?? {};
  const fileName: string = text.replace(/^\s*code:/, "");

  return {
    indent,
    type: "codeBlock",
    fileName,
    content: body
      .map((row: Row): string => row.text.substring(indent + 1))
      .join("\n"),
  };
};
