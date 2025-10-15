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
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractTextFromChildren(child)).join("");
  }

  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return extractTextFromChildren(props.children);
    }
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
  if (!language || !isValidComponentType(language)) {
    return null;
  }

  if (language === "component-timeline") {
    if (!timeline || timeline.length === 0) {
      console.warn("Timeline component used but no timeline data provided");
      return null;
    }
    return <CourseTimeline timelineData={timeline} />;
  }

  if (language === "component-gallery") {
    if (!gallery || gallery.length === 0) {
      console.warn("Gallery component used but no gallery data provided");
      return null;
    }
    return <CourseGallery images={gallery} />;
  }

  if (language === "component-mindmap") {
    if (!mindmap) {
      console.warn("Mindmap component used but no mindmap data provided");
      return null;
    }
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
        <h1 className="text-h1 font-500 text-foreground mb-[24px] tbt:mb-[32px]">
          {children}
        </h1>
      ),
      h2: ({ children }) => {
        const text = extractTextFromChildren(children);
        const id = headingIds[text] || undefined;

        return (
          <h2
            id={id}
            className="text-h2 font-500 text-foreground mb-[16px] tbt:mb-[24px] mt-[48px] tbt:mt-[64px] first:mt-0 scroll-mt-[80px]"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => (
        <h3 className="text-h3 font-500 text-foreground mb-[12px] tbt:mb-[16px] mt-[32px] tbt:mt-[40px]">
          {children}
        </h3>
      ),

      p: ({ children }) => {
        if (React.isValidElement(children)) {
          return <>{children}</>;
        }

        return (
          <p className="text-regular text-foreground leading-[150%] mb-[16px] tbt:mb-[24px]">
            {children}
          </p>
        );
      },

      ul: ({ children }) => (
        <ul className="space-y-[12px] mb-[24px] tbt:mb-[32px]">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="space-y-[12px] mb-[24px] tbt:mb-[32px] list-decimal list-inside">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="text-regular text-foreground flex items-start gap-[12px]">
          <span className="text-primary-500 text-regular font-500 mt-[2px]">
            •
          </span>
          <span className="flex-1">{children}</span>
        </li>
      ),

      table: ({ children }) => (
        <CourseTable>
          <table className="min-w-full border-collapse">{children}</table>
        </CourseTable>
      ),
      thead: ({ children }) => <thead>{children}</thead>,
      tbody: ({ children }) => <tbody>{children}</tbody>,
      tr: ({ children }) => <tr>{children}</tr>,
      th: ({ children }) => (
        <th className="course-table-cell px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-left text-small tbt:text-regular font-500 text-foreground">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="course-table-cell px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-small tbt:text-regular text-foreground">
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

          if (customComponent) {
            return customComponent;
          }
        }

        return <pre>{children}</pre>;
      },

      code: ({ children }) => {
        return (
          <code className="block bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-[16px] rounded-[8px] text-small font-400 text-foreground overflow-x-auto">
            {children}
          </code>
        );
      },

      a: ({ children, href }) => (
        <a
          href={href}
          className="text-primary-500 hover:text-primary-400 transition-colors underline"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ),

      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary-500 pl-[16px] tbt:pl-[24px] py-[8px] my-[24px] tbt:my-[32px] text-foreground-secondary italic">
          {children}
        </blockquote>
      ),

      hr: () => (
        <hr className="border-t border-[rgba(255,255,255,0.05)] my-[32px] tbt:my-[48px]" />
      ),
    }),
    [timeline, gallery, mindmap, headingIds],
  );

  const renderedContent = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkCustomComponents]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    ),
    [content, components],
  );

  return renderedContent;
}

export { MarkdownRenderer };
export type { MarkdownRendererProps };
