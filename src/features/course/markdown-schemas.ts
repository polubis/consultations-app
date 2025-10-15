import { z } from "zod";

export const TimelineMonthSchema = z.object({
  month: z.number().int().positive().min(1).max(12),
  roman: z.string().min(1),
  modules: z.array(z.string().min(1)).min(1),
});

export const TimelineSchema = z.array(TimelineMonthSchema).min(1);

export const GalleryImageSchema = z.object({
  src: z
    .string()
    .min(1)
    .refine(
      (val) => {
        if (val.startsWith("/")) return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Must be a valid URL or relative path starting with /" },
    ),
  alt: z.string().min(1),
});

export const GallerySchema = z.array(GalleryImageSchema).min(1);

export const MindmapNodeDataSchema = z.object({
  content: z.string(),
  description: z.string().nullable(),
  name: z.string(),
  path: z.string(),
});

export const MindmapPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const MindmapNodeSchema = z.object({
  id: z.string(),
  type: z.literal("embedded"),
  position: MindmapPositionSchema,
  data: MindmapNodeDataSchema,
});

export const MindmapEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string(),
});

export const MindmapSchema = z.object({
  edges: z.array(MindmapEdgeSchema),
  nodes: z.array(MindmapNodeSchema),
  orientation: z.string().optional(),
});

export type TimelineMonth = z.infer<typeof TimelineMonthSchema>;
export type Timeline = z.infer<typeof TimelineSchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
export type Gallery = z.infer<typeof GallerySchema>;
export type Mindmap = z.infer<typeof MindmapSchema>;

export function validateTimeline(data: unknown): Timeline | null {
  const result = TimelineSchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid timeline data:", result.error.format());
    return null;
  }
  return result.data;
}

export function validateGallery(data: unknown): Gallery | null {
  const result = GallerySchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid gallery data:", result.error.format());
    return null;
  }
  return result.data;
}

export function validateMindmap(data: unknown): Mindmap | null {
  const result = MindmapSchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid mindmap data:", result.error.format());
    return null;
  }
  return result.data;
}
