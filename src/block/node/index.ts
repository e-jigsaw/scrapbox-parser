import { QuoteNodeParser } from "./QuoteNode.ts";
import { HelpfeelNodeParser } from "./HelpfeelNode.ts";
import { StrongImageNodeParser } from "./StrongImageNode.ts";
import { StrongIconNodeParser } from "./StrongIconNode.ts";
import { StrongNodeParser } from "./StrongNode.ts";
import { FormulaNodeParser } from "./FormulaNode.ts";
import { DecorationNodeParser } from "./DecorationNode.ts";
import { CodeNodeParser } from "./CodeNode.ts";
import { CommandLineNodeParser } from "./CommandLineNode.ts";
import { BlankNodeParser } from "./BlankNode.ts";
import { ImageNodeParser } from "./ImageNode.ts";
import { ExternalLinkNodeParser } from "./ExternalLinkNode.ts";
import { GoogleMapNodeParser } from "./GoogleMapNode.ts";
import { InternalLinkNodeParser } from "./InternalLinkNode.ts";
import { IconNodeParser } from "./IconNode.ts";
import { HashTagNodeParser } from "./HashTagNode.ts";
import { PlainNodeParser } from "./PlainNode.ts";

import type { Node } from "./type.ts";

export interface NodeParserOption {
  nested: boolean;
  quoted: boolean;
  context: "line" | "table";
}
export type NextNodeParser = () => Node[];
export type NodeParser = (
  text: string,
  opts: NodeParserOption,
  next?: NextNodeParser,
) => Node[];

const FalsyEliminator: NodeParser = (text, _, next) => {
  if (text === "") return [];
  return next?.() ?? [];
};

const combineNodeParsers = (...parsers: NodeParser[]) =>
  (text: string, opts: NodeParserOption): Node[] =>
    parsers.reduceRight(
      (acc: NextNodeParser, parser: NodeParser): NextNodeParser =>
        () => parser(text, opts, acc),
      () => PlainNodeParser(text, opts),
    )();

export const convertToNodes = combineNodeParsers(
  FalsyEliminator,
  QuoteNodeParser,
  HelpfeelNodeParser,
  CodeNodeParser,
  CommandLineNodeParser,
  FormulaNodeParser,
  BlankNodeParser,
  DecorationNodeParser,
  StrongImageNodeParser,
  StrongIconNodeParser,
  StrongNodeParser,
  ImageNodeParser,
  ExternalLinkNodeParser,
  IconNodeParser,
  GoogleMapNodeParser,
  InternalLinkNodeParser,
  HashTagNodeParser,
);
