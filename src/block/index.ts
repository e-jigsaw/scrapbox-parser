import { convertToTitle } from "./Title.ts";
import { convertToCodeBlock } from "./CodeBlock.ts";
import { convertToTable } from "./Table.ts";
import { convertToLine } from "./Line.ts";

import type { Pack } from "./Pack.ts";
import type { Title } from "./Title.ts";
import type { CodeBlock } from "./CodeBlock.ts";
import type { Table } from "./Table.ts";
import type { Line } from "./Line.ts";

export type Block = Title | CodeBlock | Table | Line;

export const convertToBlock = (pack: Pack): Block => {
  switch (pack.type) {
    case "title":
      return convertToTitle(pack);

    case "codeBlock":
      return convertToCodeBlock(pack);

    case "table":
      return convertToTable(pack);

    case "line":
      return convertToLine(pack);
    default:
      return null as never;
  }
};
