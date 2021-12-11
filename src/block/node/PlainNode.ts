import { createNodeParser } from "./creator.ts";

import type { PlainNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

export const createPlainNode: NodeCreator<PlainNode> = (raw) => [
  {
    type: "plain",
    raw,
    text: raw,
  },
];

export const PlainNodeParser = createNodeParser(createPlainNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [/^()(.*)()$/],
});
