import { z } from "zod";

/**
 * Schema for timeline month data
 */
export const TimelineMonthSchema = z.object({
  month: z.number().int().positive().min(1).max(12),
  roman: z.string().min(1),
  modules: z.array(z.string().min(1)).min(1),
});

/**
 * Schema for timeline data array
 */
export const TimelineSchema = z.array(TimelineMonthSchema).min(1);

/**
 * Schema for gallery image data
 * Accepts both absolute URLs and relative paths
 */
export const GalleryImageSchema = z.object({
  src: z
    .string()
    .min(1)
    .refine(
      (val) => {
        // Accept relative paths starting with /
        if (val.startsWith("/")) return true;
        // Accept full URLs
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

/**
 * Schema for gallery data array
 */
export const GallerySchema = z.array(GalleryImageSchema).min(1);

/**
 * Type inference from schemas
 */
export type TimelineMonth = z.infer<typeof TimelineMonthSchema>;
export type Timeline = z.infer<typeof TimelineSchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
export type Gallery = z.infer<typeof GallerySchema>;

/**
 * Safe parsing helpers with error logging
 */
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
