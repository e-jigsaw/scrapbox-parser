import { createNodeParser } from "./creator.ts";
import { createPlainNode } from "./PlainNode.ts";

import type { HelpfeelNode, PlainNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const helpfeelRegExp = /^\? .+$/;

const createHelpfeelNode: NodeCreator<HelpfeelNode | PlainNode> = (raw, opts) =>
  opts.context === "table" ? createPlainNode(raw, opts) : [
    {
      type: "helpfeel",
      raw,
      text: raw.substring(2),
    },
  ];

export const HelpfeelNodeParser = createNodeParser(createHelpfeelNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp],
});
