import { promises as fs } from "node:fs";
import path from "node:path";

export interface CourseData {
  [key: string]: unknown;
  title?: string;
  description?: string;
  timeline?: Array<{
    month: number;
    roman: string;
    modules: string[];
    title?: string;
    description?: string;
  }>;
  gallery?: Array<{ src: string; alt: string }>;
  mindmap?: {
    edges: Array<{ id: string; source: string; target: string; type: string }>;
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data: {
        content: string;
        description: string | null;
        name: string;
        path: string;
      };
    }>;
    orientation: string;
  };
}

/**
 * Loads all JSON files from a course directory and merges them
 * This is completely generic - any .json file will be loaded
 */
async function loadAllJsonData(
  dirPath: string,
): Promise<Record<string, unknown>> {
  try {
    const files = await fs.readdir(dirPath);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const result: Record<string, unknown> = {};

    await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(dirPath, file);
          const content = await fs.readFile(filePath, "utf-8");
          const data = JSON.parse(content);

          // Remove .json extension to get the key
          const key = file.replace(".json", "");
          result[key] = data;
        } catch {
          // Silently skip files that can't be parsed
        }
      }),
    );

    return result;
  } catch {
    return {};
  }
}

/**
 * Reads markdown file safely
 */
async function readMarkdownFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Generic course loader - loads ANY course by slug
 * Automatically discovers all .json files and content.md
 *
 * @param slug - Course folder name (e.g., 'senior-w-js', 'javascript', 'typescript')
 * @returns Course data with all JSON files merged and markdown content
 */
export async function loadCourseBySlug(slug: string): Promise<{
  frontmatter: CourseData;
  content: string;
} | null> {
  const dirPath = path.join(process.cwd(), "public", "course", slug);
  const contentPath = path.join(dirPath, "content.md");

  try {
    // Load markdown content (required)
    const contentMarkdown = await readMarkdownFile(contentPath);
    if (!contentMarkdown) {
      return null;
    }

    // Load all JSON files (merge everything together)
    const allJsonData = await loadAllJsonData(dirPath);

    // Merge all data into frontmatter
    const frontmatter: CourseData = {
      ...allJsonData,
    };

    return {
      frontmatter,
      content: contentMarkdown,
    };
  } catch {
    return null;
  }
}

export { loadAllJsonData, readMarkdownFile };
