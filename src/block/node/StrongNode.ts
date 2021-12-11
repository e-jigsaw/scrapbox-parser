import { convertToNodes } from "./index.ts";
import { createNodeParser } from "./creator.ts";
import { createPlainNode } from "./PlainNode.ts";

import type { PlainNode, StrongNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const strongRegExp = /\[\[(?:[^[]|\[[^[]).*?\]*\]\]/;

const createStrongNode: NodeCreator<StrongNode | PlainNode> = (raw, opts) =>
  opts.context === "table" ? createPlainNode(raw, opts) : [
    {
      type: "strong",
      raw,
      nodes: convertToNodes(raw.substring(2, raw.length - 2), {
        ...opts,
        nested: true,
      }),
    },
  ];

export const StrongNodeParser = createNodeParser(createStrongNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongRegExp],
});
