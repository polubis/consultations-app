import React, { useState, useEffect, useCallback } from "react";

type NavigationItem = {
  id: string;
  label: string;
};

type CourseNavigationProps = {
  items: NavigationItem[];
};

function CourseNavigation({ items }: CourseNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(
    items[0]?.id || "",
  );

  // Find which section is currently visible
  const findActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 150; // offset from top

    for (let i = items.length - 1; i >= 0; i--) {
      const element = document.getElementById(items[i].id);
      if (element && element.offsetTop <= scrollPosition) {
        return items[i].id;
      }
    }

    return items[0]?.id || "";
  }, [items]);

  useEffect(() => {
    // Set initial active section after mount
    const timer = setTimeout(() => {
      const active = findActiveSection();
      if (active) {
        setActiveSection(active);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [findActiveSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev,
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -66% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const timeoutId = setTimeout(() => {
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Match scroll-mt-[80px] from h2
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });

      // Immediately update active section (don't wait for observer)
      setActiveSection(id);
    }
  };

  const activeIndex = items.findIndex((item) => item.id === activeSection);

  return (
    <nav
      className="hidden dsp:block dsp:sticky dsp:top-[120px] w-full max-w-[240px] dsp:self-start"
      aria-label="Nawigacja kursu"
    >
      <div className="relative pl-[20px]">
        <ul className="space-y-0">
          {items.map((item, index) => {
            const isActive = activeSection === item.id;
            const isBeforeActive = index < activeIndex;
            const isAfterActive = index > activeIndex;

            return (
              <li key={item.id} className="relative">
                {/* Line segment above active item */}
                {isBeforeActive && (
                  <div
                    className="absolute left-[-20px] top-0 bottom-0 w-px bg-[#676767]"
                    aria-hidden="true"
                  />
                )}

                {/* Gap where chevron is - line with breaks */}
                {isActive && (
                  <>
                    {/* Line above chevron */}
                    {index > 0 && (
                      <div
                        className="absolute left-[-20px] top-0 w-px bg-[#676767]"
                        style={{ height: "calc(50% - 12px)" }}
                        aria-hidden="true"
                      />
                    )}
                    {/* Line below chevron */}
                    {index < items.length - 1 && (
                      <div
                        className="absolute left-[-20px] bottom-0 w-px bg-[#676767]"
                        style={{ height: "calc(50% - 12px)" }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}

                {/* Line segment after active item */}
                {isAfterActive && (
                  <div
                    className="absolute left-[-20px] top-0 bottom-0 w-px bg-[#676767]"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative w-full text-left py-[8px] text-small font-400 transition-all flex items-center gap-[16px] ${
                    isActive
                      ? "text-foreground font-450"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Chevron icon - visible only when active */}
                  {isActive && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 absolute left-[-32px]"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.2498 11.9742L8.2998 7.02422L9.3748 5.94922L15.3998 11.9742L9.3748 17.9992L8.2998 16.9242L13.2498 11.9742Z"
                        fill="#0BAD67"
                      />
                    </svg>
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export { CourseNavigation };
export type { CourseNavigationProps, NavigationItem };
