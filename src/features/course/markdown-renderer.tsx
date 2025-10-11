import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CourseTable } from "./course-table";
import { CourseTimeline, type TimelineMonth } from "./course-timeline";
import { CourseGallery, type GalleryImage } from "./course-gallery";

type MarkdownRendererProps = {
  content: string;
  timeline?: TimelineMonth[];
  gallery?: GalleryImage[];
};

function MarkdownRenderer({
  content,
  timeline = [],
  gallery = [],
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Headings
        h1: ({ children, ...props }) => (
          <h1
            className="text-h1 font-500 text-foreground mb-[24px] tbt:mb-[32px]"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="text-h2 font-500 text-foreground mb-[16px] tbt:mb-[24px] mt-[48px] tbt:mt-[64px] first:mt-0"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="text-h3 font-500 text-foreground mb-[12px] tbt:mb-[16px] mt-[32px] tbt:mt-[40px]"
            {...props}
          >
            {children}
          </h3>
        ),

        // Paragraphs
        p: ({ children, ...props }) => {
          // Check if paragraph contains only a custom component tag
          if (React.isValidElement(children)) {
            return <>{children}</>;
          }

          const childString = String(children);
          if (childString.includes("<Timeline") || childString.trim() === "") {
            return <CourseTimeline timelineData={timeline} />;
          }
          if (childString.includes("<Gallery") || childString.trim() === "") {
            return <CourseGallery images={gallery} />;
          }

          return (
            <p
              className="text-regular text-foreground leading-[150%] mb-[16px] tbt:mb-[24px]"
              {...props}
            >
              {children}
            </p>
          );
        },

        // Lists
        ul: ({ children, ...props }) => (
          <ul className="space-y-[12px] mb-[24px] tbt:mb-[32px]" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="space-y-[12px] mb-[24px] tbt:mb-[32px] list-decimal list-inside"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li
            className="text-regular text-foreground flex items-start gap-[12px]"
            {...props}
          >
            <span className="text-primary-500 text-regular font-500 mt-[2px]">
              •
            </span>
            <span className="flex-1">{children}</span>
          </li>
        ),

        // Tables
        table: ({ children, ...props }) => (
          <CourseTable>
            <table
              className="min-w-full divide-y divide-[rgba(255,255,255,0.05)]"
              {...props}
            >
              {children}
            </table>
          </CourseTable>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-[rgba(255,255,255,0.02)]" {...props}>
            {children}
          </thead>
        ),
        tbody: ({ children, ...props }) => (
          <tbody
            className="divide-y divide-[rgba(255,255,255,0.05)] bg-background"
            {...props}
          >
            {children}
          </tbody>
        ),
        tr: ({ children, ...props }) => (
          <tr
            className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            {...props}
          >
            {children}
          </tr>
        ),
        th: ({ children, ...props }) => (
          <th
            className="px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-left text-small tbt:text-regular font-500 text-foreground"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="px-[16px] tbt:px-[24px] py-[12px] tbt:py-[16px] text-small tbt:text-regular text-foreground"
            {...props}
          >
            {children}
          </td>
        ),

        // Code
        code: ({ children, className, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-[rgba(255,255,255,0.05)] px-[6px] py-[2px] rounded-[4px] text-small font-400 text-primary-400"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="block bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-[16px] rounded-[8px] text-small font-400 text-foreground overflow-x-auto"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Links
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            className="text-primary-500 hover:text-primary-400 transition-colors underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
          </a>
        ),

        // Blockquote
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-primary-500 pl-[16px] tbt:pl-[24px] py-[8px] my-[24px] tbt:my-[32px] text-foreground-secondary italic"
            {...props}
          >
            {children}
          </blockquote>
        ),

        // Horizontal rule
        hr: ({ ...props }) => (
          <hr
            className="border-t border-[rgba(255,255,255,0.05)] my-[32px] tbt:my-[48px]"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export { MarkdownRenderer };
export type { MarkdownRendererProps };
