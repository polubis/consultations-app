import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Heading } from "mdast";

type NavigationItem = {
  id: string;
  label: string;
};

type ProcessedMarkdown = {
  content: string;
  navigationItems: NavigationItem[];
  headingIds: Record<string, string>;
};

/**
 * Creates a URL-friendly ID from heading text
 */
function createHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9ąćęłńóśźż\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z");
}

/**
 * Extract h2 headings from markdown for navigation
 */
function extractHeadings(markdown: string): {
  navigationItems: NavigationItem[];
  headingIds: Record<string, string>;
} {
  const tree = unified().use(remarkParse).parse(markdown);
  const navigationItems: NavigationItem[] = [];
  const headingIds: Record<string, string> = {};

  visit(tree, (node) => {
    if (node.type === "heading" && (node as Heading).depth === 2) {
      const heading = node as Heading;
      const text = mdastToString(heading);
      const id = createHeadingId(text);

      navigationItems.push({ id, label: text });
      headingIds[text] = id;
    }
  });

  return { navigationItems, headingIds };
}

/**
 * Process markdown content:
 * - Extract h2 headings for navigation
 * - Replace custom component tags with code blocks (via regex for simplicity)
 * - Return processed markdown and navigation data
 */
export function processMarkdown(markdown: string): ProcessedMarkdown {
  // Extract headings using AST
  const { navigationItems, headingIds } = extractHeadings(markdown);

  // Simple string replacements for custom components
  // (AST stringify was destroying markdown structure)
  let content = markdown;

  // Remove <CourseTable> wrapper tags
  content = content.replace(/<CourseTable>\s*/g, "");
  content = content.replace(/\s*<\/CourseTable>/g, "");

  // Replace <Timeline /> with code block
  content = content.replace(
    /<Timeline\s*\/>/g,
    "\n\n```timeline\nRENDER_TIMELINE\n```\n\n",
  );

  // Replace <Gallery /> with code block
  content = content.replace(
    /<Gallery\s*\/>/g,
    "\n\n```gallery\nRENDER_GALLERY\n```\n\n",
  );

  return {
    content,
    navigationItems,
    headingIds,
  };
}

export type { NavigationItem, ProcessedMarkdown };
