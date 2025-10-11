import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Heading } from "mdast";
import { remarkCustomComponents } from "./remark-custom-components";

type NavigationItem = {
  id: string;
  label: string;
};

type ProcessedMarkdown = {
  content: string;
  navigationItems: NavigationItem[];
  headingIds: Record<string, string>;
};

function createHeadingId(text: string): string {
  const normalized = text.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  return normalized
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(markdown: string): {
  navigationItems: NavigationItem[];
  headingIds: Record<string, string>;
} {
  const tree = unified()
    .use(remarkParse)
    .use(remarkCustomComponents)
    .parse(markdown);

  const navigationItems: NavigationItem[] = [];
  const headingIds: Record<string, string> = {};
  const seenIds = new Set<string>();

  visit(tree, (node) => {
    if (node.type === "heading" && (node as Heading).depth === 2) {
      const heading = node as Heading;
      const text = mdastToString(heading);
      let id = createHeadingId(text);
      const originalId = id;

      // Handle duplicate IDs
      let counter = 1;
      while (seenIds.has(id)) {
        id = `${originalId}-${counter}`;
        counter++;
      }

      seenIds.add(id);
      navigationItems.push({ id, label: text });
      headingIds[text] = id;
    }
  });

  return { navigationItems, headingIds };
}

export function processMarkdown(markdown: string): ProcessedMarkdown {
  const { navigationItems, headingIds } = extractHeadings(markdown);

  const content = markdown;

  return {
    content,
    navigationItems,
    headingIds,
  };
}

export type { NavigationItem, ProcessedMarkdown };
