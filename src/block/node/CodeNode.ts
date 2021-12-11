import { createNodeParser } from "./creator.ts";
import { createPlainNode } from "./PlainNode.ts";

import type { CodeNode, PlainNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode | PlainNode> = (raw, opts) =>
  opts.context === "table" ? createPlainNode(raw, opts) : [
    {
      type: "code",
      raw,
      text: raw.substring(1, raw.length - 1),
    },
  ];

export const CodeNodeParser = createNodeParser(createCodeNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [codeRegExp],
});
