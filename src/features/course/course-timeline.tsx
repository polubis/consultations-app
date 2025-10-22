import { useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { TimelineMonth } from "./markdown-schemas";

type CourseTimelineProps = {
  timelineData: TimelineMonth[];
};

const TICKS_PER_MONTH = 11;

function CourseTimeline({ timelineData }: CourseTimelineProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const activeMonthDetails = useMemo(() => {
    return timelineData.find((month) => month.month === hoveredMonth) ?? null;
  }, [hoveredMonth, timelineData]);

  return (
    <div className="mb-[48px] tbt:mb-[64px]">
      <Carousel
        aria-label="Oś czasu kursu"
        opts={{
          align: "start",
        }}
        onMouseLeave={() => setHoveredMonth(null)}
      >
        <CarouselContent className="-ml-2">
          {timelineData.map((month) => {
            const isHovered = hoveredMonth === month.month;

            return (
              <CarouselItem
                key={month.month}
                className="basis-1/3 cursor-pointer pl-2 tbt:basis-1/5 ltp:basis-1/6 dsp:basis-1/7"
                onMouseEnter={() => setHoveredMonth(month.month)}
              >
                <div className="flex w-full items-start">
                  <div className="flex flex-col items-center">
                    <span
                      className="mb-4 flex h-8 items-end justify-center text-small font-450"
                      style={{
                        color: isHovered
                          ? "var(--primary-500)"
                          : "var(--foreground-secondary)",
                      }}
                    >
                      {month.roman}
                    </span>

                    {/*
                      THE ONLY CHANGE IS HERE:
                      Changed `items-center` to `items-start`.
                      This aligns the bar to the top of the 64px container,
                      so it correctly grows downwards on hover.
                    */}
                    <div className="flex h-[64px] items-start">
                      <div
                        className="w-[2px] rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          height: isHovered ? "64px" : "32px",
                          backgroundColor: isHovered
                            ? "var(--primary-500)"
                            : "#676767",
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <div
                        className="h-[20px] w-[20px]"
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                        dangerouslySetInnerHTML={{ __html: month.icon }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 justify-between pl-1 mbl:pl-2">
                    {Array.from({ length: TICKS_PER_MONTH }).map((_, index) => (
                      <div
                        key={`${month.month}-tick-${index + 1}`}
                        className="flex flex-col items-center"
                      >
                        <div className="h-8 mb-4" />
                        <div
                          className="h-4 w-px rounded-full"
                          style={{
                            backgroundColor: "#676767",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* This section for the details remains correct */}
      <div className="relative mt-6 h-[120px]">
        {activeMonthDetails && (
          <div
            key={activeMonthDetails.month}
            className="absolute inset-0 animate-jump-top-bottom"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-h4 font-500 text-foreground">
                {activeMonthDetails.title}
              </h3>
            </div>
            <p className="mt-2 max-w-md text-regular text-foreground-secondary">
              {activeMonthDetails.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { CourseTimeline };
export type { CourseTimelineProps, TimelineMonth };
