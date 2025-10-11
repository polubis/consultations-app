import React from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CourseTable } from "./course-table";
import { CourseTimeline, type TimelineMonth } from "./course-timeline";
import { CourseGallery, type GalleryImage } from "./course-gallery";

type MarkdownRendererProps = {
  content: string;
  timeline?: TimelineMonth[];
  gallery?: GalleryImage[];
  headingIds?: Record<string, string>;
};

function MarkdownRenderer({
  content,
  timeline = [],
  gallery = [],
  headingIds = {},
}: MarkdownRendererProps) {
  const options: Options = {
    remarkPlugins: [remarkGfm],
    components: {
      // Headings
      h1: ({ children }) => (
        <h1 className="text-h1 font-500 text-foreground mb-[24px] tbt:mb-[32px]">
          {children}
        </h1>
      ),
      h2: ({ children }) => {
        const text = String(children);
        const id = headingIds[text] || undefined;
        return (
          <h2
            id={id}
            className="text-h2 font-500 text-foreground mb-[16px] tbt:mb-[24px] mt-[32px] tbt:mt-[64px] first:mt-0"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => (
        <h3 className="text-h3 font-500 text-foreground mb-[8px] tbt:mb-[16px] mt-[32px] tbt:mt-[40px]">
          {children}
        </h3>
      ),

      // Paragraphs
      p: ({ children }) => (
        <p className="text-regular text-foreground leading-[150%] mb-[16px] tbt:mb-[24px]">
          {children}
        </p>
      ),

      // Code - handles both inline code and code blocks
      code: ({ children, className }) => {
        // Check if it's a code block (has language class)
        if (className) {
          const language = className.replace("language-", "");
          const code = String(children).trim();

          // Custom component markers
          if (language === "timeline" && code === "RENDER_TIMELINE") {
            return <CourseTimeline timelineData={timeline} />;
          }
          if (language === "gallery" && code === "RENDER_GALLERY") {
            return <CourseGallery images={gallery} />;
          }

          // Regular code block
          return (
            <pre className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-[16px] rounded-[8px] mb-[24px] tbt:mb-[32px] overflow-x-auto">
              <code className="text-small font-400 text-foreground">
                {children}
              </code>
            </pre>
          );
        }

        // Inline code
        return (
          <code className="bg-[rgba(255,255,255,0.05)] px-[6px] py-[2px] rounded-[4px] text-small font-400 text-primary-400">
            {children}
          </code>
        );
      },

      // Lists
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

      // Tables
      table: ({ children }) => (
        <CourseTable>
          <table className="min-w-full divide-y divide-[rgba(255,255,255,0.05)]">
            {children}
          </table>
        </CourseTable>
      ),
      thead: ({ children }) => (
        <thead className="bg-[rgba(255,255,255,0.02)]">{children}</thead>
      ),
      tbody: ({ children }) => (
        <tbody className="divide-y divide-[rgba(255,255,255,0.05)] bg-background">
          {children}
        </tbody>
      ),
      tr: ({ children }) => (
        <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
          {children}
        </tr>
      ),
      th: ({ children }) => (
        <th className="px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-left text-small tbt:text-regular font-500 text-foreground">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-small tbt:text-regular text-foreground">
          {children}
        </td>
      ),

      // Links
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

      // Blockquote
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary-500 pl-[16px] tbt:pl-[24px] py-[8px] my-[24px] tbt:my-[32px] text-foreground-secondary italic">
          {children}
        </blockquote>
      ),

      // Horizontal rule
      hr: () => (
        <hr className="border-t border-[rgba(255,255,255,0.05)] my-[32px] tbt:my-[48px]" />
      ),
    },
  };

  return <ReactMarkdown {...options}>{content}</ReactMarkdown>;
}

export { MarkdownRenderer };
export type { MarkdownRendererProps };
