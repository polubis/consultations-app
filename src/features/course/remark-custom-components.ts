import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";

interface HtmlNode extends Node {
  type: "html";
  value: string;
}

interface CodeNode extends Node {
  type: "code";
  lang: string | null;
  meta: string | null;
  value: string;
}

function isHtmlNode(node: Node): node is HtmlNode {
  return node.type === "html" && typeof (node as HtmlNode).value === "string";
}

type ComponentConfig = {
  pattern: RegExp;
  lang: string | null;
  name: string;
  remove?: boolean;
};

const COMPONENT_PATTERNS: ComponentConfig[] = [
  {
    pattern: /<Timeline\s*\/>/i,
    lang: "component-timeline",
    name: "Timeline",
  },
  {
    pattern: /<Gallery\s*\/>/i,
    lang: "component-gallery",
    name: "Gallery",
  },
  {
    pattern: /<CourseTable\s*>/i,
    lang: null,
    name: "CourseTable",
    remove: true,
  },
  {
    pattern: /<\/CourseTable\s*>/i,
    lang: null,
    name: "CourseTable",
    remove: true,
  },
];

export const remarkCustomComponents: Plugin = () => {
  return (tree) => {
    visit(tree, "html", (node: Node, index, parent) => {
      if (!isHtmlNode(node)) {
        return;
      }

      // Check each component pattern
      for (const component of COMPONENT_PATTERNS) {
        if (!component.pattern.test(node.value)) {
          continue;
        }

        // Handle component removal (e.g., wrapper tags)
        if (component.remove) {
          if (parent && typeof index === "number") {
            const parentNode = parent as Parent;
            if (parentNode.children) {
              parentNode.children.splice(index, 1);
              // Return index to continue visiting
              return index;
            }
          }
          return;
        }

        if (component.lang) {
          const codeNode: CodeNode = {
            type: "code",
            lang: component.lang,
            meta: null,
            value: "",
          };

          Object.assign(node, codeNode);
        }

        break;
      }
    });
  };
};
