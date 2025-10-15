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
    pattern: /<Mindmap\s*\/>/i,
    lang: "component-mindmap",
    name: "Mindmap",
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

      for (const component of COMPONENT_PATTERNS) {
        if (!component.pattern.test(node.value)) {
          continue;
        }

        if (component.remove) {
          if (parent && typeof index === "number") {
            const parentNode = parent as Parent;
            if (parentNode.children) {
              parentNode.children.splice(index, 1);
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
