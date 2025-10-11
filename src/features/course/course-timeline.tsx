import React, { useState } from "react";

type TimelineMonth = {
  month: number;
  roman: string;
  modules: string[];
};

type CourseTimelineProps = {
  timelineData: TimelineMonth[];
};

function CourseTimeline({ timelineData }: CourseTimelineProps) {
  const [activeMonth, setActiveMonth] = useState(1);

  const activeMonthData = timelineData.find((m) => m.month === activeMonth);

  return (
    <div className="mb-[48px] tbt:mb-[64px] dsp:hidden">
      <div className="mb-[32px]">
        {/* Timeline ruler */}
        <div className="relative">
          {/* Blue progress line */}
          <div
            className="absolute top-0 left-0 h-[2px] bg-primary-500 transition-all duration-300"
            style={{ width: `${(activeMonth / timelineData.length) * 100}%` }}
          />

          {/* Gray background line */}
          <div className="h-[2px] bg-[rgba(255,255,255,0.1)] mb-[24px]" />

          {/* Month markers */}
          <div className="relative flex justify-between items-center px-[8px]">
            {timelineData.map((month) => (
              <button
                key={month.month}
                type="button"
                onClick={() => setActiveMonth(month.month)}
                className={`flex flex-col items-center gap-[8px] transition-colors ${
                  activeMonth === month.month
                    ? "text-primary-500"
                    : "text-foreground-secondary"
                }`}
                aria-label={`Miesiąc ${month.roman}`}
              >
                {/* Tick mark */}
                <div className="w-px h-[12px] bg-current" />

                {/* Roman numeral */}
                <span className="text-small font-450">{month.roman}</span>

                {/* Circle indicator */}
                <div
                  className={`w-[8px] h-[8px] rounded-full border-2 transition-all ${
                    activeMonth === month.month
                      ? "border-primary-500 bg-primary-500"
                      : "border-current bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active month content */}
      {activeMonthData && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[12px] p-[24px]">
          <h3 className="text-h4 font-500 text-foreground mb-[16px]">
            Miesiąc {activeMonthData.roman}
          </h3>
          <ul className="space-y-[12px]">
            {activeMonthData.modules.map((module) => (
              <li key={module} className="flex items-start gap-[12px]">
                <span className="text-primary-500 text-regular font-500 mt-[2px]">
                  •
                </span>
                <span className="text-regular text-foreground">{module}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export { CourseTimeline };
export type { CourseTimelineProps, TimelineMonth };
