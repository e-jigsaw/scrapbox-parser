import { createNodeParser } from "./creator.ts";
import { createPlainNode } from "./PlainNode.ts";

import type { CommandLineNode, PlainNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const commandLineRegExp = /^[$%] .+$/;

const createCommandLineNode: NodeCreator<CommandLineNode | PlainNode> = (
  raw: string,
  opts,
) => {
  if (opts.context === "table") {
    return createPlainNode(raw, opts);
  }

  const symbol = raw[0] ?? "";
  const text = raw.substring(2);

  return [
    {
      type: "commandLine",
      raw,
      symbol,
      text,
    },
  ];
};

export const CommandLineNodeParser = createNodeParser(createCommandLineNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [commandLineRegExp],
});
