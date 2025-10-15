import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type TimelineMonth = {
  month: number;
  roman: string;
  modules: string[];
};

type CourseTimelineProps = {
  timelineData: TimelineMonth[];
};

const TICKS_PER_MONTH = 10;

function CourseTimeline({ timelineData }: CourseTimelineProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  return (
    <div className="mb-[48px] tbt:mb-[64px]">
      <Carousel
        aria-label="Oś czasu kursu"
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent
          className="-ml-1"
          onMouseLeave={() => setHoveredMonth(null)}
        >
          {timelineData.map((month) => {
            const isHovered = hoveredMonth === month.month;

            return (
              <CarouselItem
                key={month.month}
                className="basis-1/12 pl-1"
                onMouseEnter={() => setHoveredMonth(month.month)}
              >
                <div className="whitespace-nowrap">
                  <div className="inline-block align-top text-center w-[12px]">
                    <span
                      className="h-8 flex items-end justify-center mb-4 text-small font-450 transition-colors duration-300"
                      style={{
                        color: isHovered
                          ? "var(--primary-500)"
                          : "var(--foreground-secondary)",
                      }}
                    >
                      {month.roman}
                    </span>
                    <div
                      className="h-8 w-px mx-auto rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered
                          ? "var(--primary-500)"
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  {Array.from({ length: TICKS_PER_MONTH }).map((_, index) => (
                    <div
                      key={`${month.month}-tick-${index + 1}`}
                      className="inline-block align-top text-center w-[8px]"
                    >
                      {/* Pusty element dla wyrównania */}
                      <div className="h-8 mb-4" />
                      <div
                        className="h-4 w-px mx-auto rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: isHovered
                            ? "var(--primary-500)"
                            : "rgba(255,255,255,0.2)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export { CourseTimeline };
export type { CourseTimelineProps, TimelineMonth };
