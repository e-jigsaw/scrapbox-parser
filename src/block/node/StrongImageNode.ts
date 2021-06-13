import { createNodeParser } from "./creator";

import type { StrongImageNode } from "./type";
import type { NodeCreator } from "./creator";

const strongImageRegExp = /\[\[https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg)\]\]/i;
const strongGyazoImageRegExp =
  /\[\[https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}\]\]/;

const createStrongImageNode: NodeCreator<StrongImageNode> = (raw) => {
  const src = raw.substring(2, raw.length - 2);
  const isGyazoImage =
    /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src);
  return {
    type: "strongImage",
    raw,
    src: isGyazoImage ? `${src}/thumb/1000` : src,
  };
};

export const StrongImageNodeParser = createNodeParser(createStrongImageNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongImageRegExp, strongGyazoImageRegExp],
});
