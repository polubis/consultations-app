// /src/features/course/markdown-renderer.tsx
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CourseTable } from "./course-table";
import { CourseTimeline, type TimelineMonth } from "./course-timeline";
import { CourseGallery, type GalleryImage } from "./course-gallery";
import { CourseMindmap } from "./course-mindmap";
import { remarkCustomComponents } from "./remark-custom-components";
import type { Components } from "react-markdown";
import type { Mindmap } from "./markdown-schemas";

type MarkdownRendererProps = {
  content: string;
  timeline?: TimelineMonth[];
  gallery?: GalleryImage[];
  mindmap?: Mindmap;
  headingIds: Record<string, string>;
};

const COMPONENT_MAP = {
  "component-timeline": CourseTimeline,
  "component-gallery": CourseGallery,
  "component-mindmap": CourseMindmap,
} as const;

type ComponentType = keyof typeof COMPONENT_MAP;

function isValidComponentType(type: string): type is ComponentType {
  return type in COMPONENT_MAP;
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map((child) => extractTextFromChildren(child)).join("");
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) return extractTextFromChildren(props.children);
  }
  return "";
}

function extractLanguageFromClassName(className?: string): string | null {
  if (!className) return null;
  const match = /language-(\S+)/.exec(className);
  return match ? match[1] : null;
}

function renderCustomComponent(
  language: string | null,
  timeline: TimelineMonth[],
  gallery: GalleryImage[],
  mindmap?: Mindmap,
): React.ReactNode {
  if (!language || !isValidComponentType(language)) return null;
  if (language === "component-timeline" && timeline.length > 0) {
    return <CourseTimeline timelineData={timeline} />;
  }
  if (language === "component-gallery" && gallery.length > 0) {
    return <CourseGallery images={gallery} />;
  }
  if (language === "component-mindmap" && mindmap) {
    return <CourseMindmap mindmapData={mindmap} />;
  }
  return null;
}

function MarkdownRenderer({
  content,
  timeline = [],
  gallery = [],
  mindmap,
  headingIds,
}: MarkdownRendererProps) {
  const components: Components = useMemo(
    () => ({
      h1: ({ children }) => (
        <h1 className="text-4xl tbt:text-5xl font-bold mt-8 mb-4 first:mt-0">
          {children}
        </h1>
      ),
      h2: ({ children }) => {
        const text = extractTextFromChildren(children);
        const id = headingIds[text] || undefined;
        return (
          <h2
            id={id}
            className="text-3xl tbt:text-4xl font-bold mt-8 mb-4 first:mt-0 scroll-mt-[80px]"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => (
        <h3 className="text-2xl tbt:text-3xl font-bold mt-6 mb-3">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl tbt:text-2xl font-bold mt-6 mb-3">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-lg tbt:text-xl font-bold mt-5 mb-2">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="tbt:text-lg font-bold mt-5 mb-2">{children}</h6>
      ),
      p: ({ children }) => (
        <p className="text-regular text-foreground leading-[150%] mb-4">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-outside pl-5 my-4 space-y-2">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-outside pl-5 my-4 space-y-2">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="text-regular text-foreground">{children}</li>
      ),
      table: ({ children }) => (
        <CourseTable>
          <table className="min-w-full border-collapse">{children}</table>
        </CourseTable>
      ),
      th: ({ children }) => (
        <th className="course-table-cell px-6 py-3 text-left text-regular font-bold text-foreground">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="course-table-cell px-6 py-3 text-regular text-foreground whitespace-nowrap">
          {children}
        </td>
      ),
      pre: ({ children }) => {
        if (React.isValidElement(children)) {
          const childProps = children.props as { className?: string };
          const language = extractLanguageFromClassName(childProps.className);
          const customComponent = renderCustomComponent(
            language,
            timeline,
            gallery,
            mindmap,
          );
          if (customComponent) return customComponent;
        }
        return <pre className="my-6">{children}</pre>;
      },
      code: ({ children }) => {
        return (
          <code className="block bg-[#181818] p-4 rounded-lg text-small font-mono overflow-x-auto">
            {children}
          </code>
        );
      },
      a: ({ children, href }) => (
        <a
          href={href}
          className="text-primary-500 hover:text-primary-400 transition-colors underline break-words"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary-500 pl-6 my-6 text-foreground-secondary italic">
          {children}
        </blockquote>
      ),
      hr: () => (
        <hr className="border-t border-[rgba(255,255,255,0.05)] my-8" />
      ),
    }),
    [timeline, gallery, mindmap, headingIds],
  );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkCustomComponents]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

export { MarkdownRenderer };
export type { MarkdownRendererProps };
