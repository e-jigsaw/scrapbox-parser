import { createNodeParser } from "./creator.ts";
import { createPlainNode } from "./PlainNode.ts";

import type { BlankNode, PlainNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const blankRegExp = /\[\s+\]/;

const createBlankNode: NodeCreator<BlankNode | PlainNode> = (raw, opts) =>
  opts.context === "table" ? createPlainNode(raw, opts) : [
    {
      type: "blank",
      raw,
      text: raw.substring(1, raw.length - 1),
    },
  ];

export const BlankNodeParser = createNodeParser(createBlankNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [blankRegExp],
});
