import React, { useState } from "react";
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

const ChatIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Ikona miesięcy</title>
    <g opacity="0.2">
      <path
        d="M17.5 10.3822C17.5029 11.4821 17.2459 12.5671 16.75 13.5489C16.162 14.7253 15.2581 15.7148 14.1395 16.4066C13.021 17.0983 11.7319 17.465 10.4167 17.4655C9.31678 17.4684 8.23176 17.2114 7.25 16.7155L2.5 18.2989L4.08333 13.5489C3.58744 12.5671 3.33047 11.4821 3.33333 10.3822C3.33384 9.06698 3.70051 7.77789 4.39227 6.65931C5.08402 5.54073 6.07355 4.63682 7.25 4.04885C8.23176 3.55296 9.31678 3.29598 10.4167 3.29885H10.8333C12.5703 3.39468 14.2109 4.12782 15.441 5.3579C16.671 6.58798 17.4042 8.22856 17.5 9.96552V10.3822Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

function CourseTimeline({ timelineData }: CourseTimelineProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  return (
    <div className="mb-[48px] tbt:mb-[64px] w-full max-w-full overflow-x-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          slidesToScroll: 1,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {timelineData.map((month) => {
            const isHovered = hoveredMonth === month.month;

            return (
              <CarouselItem
                key={month.month}
                className="pl-4 basis-1/7 min-w-[120px] shrink"
              >
                <div
                  className="flex flex-col items-start"
                  onMouseEnter={() => setHoveredMonth(month.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Roman numeral */}
                  <span
                    className={`text-small font-450 transition-colors duration-300 mb-[16px] ${
                      isHovered
                        ? "text-primary-500"
                        : "text-foreground-secondary"
                    }`}
                  >
                    {month.roman}
                  </span>

                  {/* Ticks for this month - 1 long + 11 short */}
                  <div className="flex items-start gap-[10px] mb-[24px]">
                    {Array.from({ length: 12 }).map((_, index) => {
                      const isFirstTick = index === 0;
                      return (
                        <div
                          key={`${month.month}-tick-${index}`}
                          className={`transition-colors duration-300 rounded-[14px] ${
                            isHovered
                              ? "bg-primary-500"
                              : "bg-[rgba(255,255,255,0.2)]"
                          } ${
                            isFirstTick ? "w-[2px] h-[32px]" : "w-px h-[16px]"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Icon */}
                  <div
                    className={`transition-all duration-300 ${
                      isHovered ? "scale-110" : ""
                    }`}
                    style={{
                      color: isHovered ? "#38C775" : "#D7D8D9",
                    }}
                  >
                    <ChatIcon />
                  </div>
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
