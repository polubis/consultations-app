const ratingCategories = ["ugly", "bad", "decent", "good", "perfect"] as const;

type RatingCategory = (typeof ratingCategories)[number];

type Publication = {
  cdate: string;
  name: string;
  url: string;
  id: string;
  rating: Record<RatingCategory, number>;
};

const publicationsMock: Publication[] = [
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74-492584bdec6b",
  },
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74d2-435b-ab584bdec6b",
  },
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74d2-435b-ab2584bdec6b",
  },
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74d2-4358-492584bdec6b",
  },
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74d2-435ba8-492584bdec6b",
  },
  {
    cdate: "2025-04-01T12:52:32.109Z",
    name: "Full Tutorial on Updating Dependencies in JS Projects",
    url: "https://4markdown.com/full-tutorial-on-updating-dependencies-in-js-projects/",
    rating: {
      ugly: 0,
      bad: 0,
      decent: 1,
      good: 1,
      perfect: 1,
    },
    id: "81054519-74d2-435b-aba8-492584b",
  },
];

type PublicationsSectionProps = {
  publications: Publication[];
};

const currentYear = new Date().getFullYear();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const PublicationsSection = () => {
  return (
    <section
      className="flex flex-col justify-center"
      aria-labelledby="activity-title"
    >
      <header className="fluid flex items-center justify-between w-full mb-6">
        <h2 id="activity-title" className="text-h5 font-500">
          Twórczość
        </h2>
        <span className="text-h5 font-500 text-[#2B2B2B]" aria-hidden="true">
          /{currentYear}
        </span>
      </header>
      <div className="relative" aria-label="Lista publikacji">
        <div
          className="absolute bg-[rgba(21,214,131,0.10)] blur-3xl size-[60%] aspect-square inset-0 m-auto rounded-full -z-1"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 h-full w-20 mbl:w-40 bg-gradient-to-r from-transparent to-background z-1"
          aria-hidden="true"
        />
        <div className="overflow-hidden">
          <ol
            className="infinite-scroll-x flex items-center gap-4 [&>li:first-child]:ml-4 [&>li:last-child]:mr-4 py-2"
            aria-label="Lista publikacji do przeczytania"
            aria-roledescription="carousel"
          >
            {publicationsMock.map((publication) => (
              <li
                className="p-[1px] rounded-xl bg-gradient-to-r from-[#111311] via-[#08140f] to-[#010F09]"
                key={publication.id}
                aria-roledescription="slide"
              >
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl"
                  aria-label={`Przeczytaj publikację: ${publication.name}`}
                >
                  <article className="flex flex-col rounded-xl p-4 mbl:p-6 bg-[#060807] w-[280px] mbl:w-[387px] ">
                    <header className="flex flex-col gap-2">
                      <time
                        className="text-small text-[#676767]"
                        dateTime={publication.cdate}
                      >
                        {formatDate(publication.cdate)}
                      </time>
                      <h3 className="text-h5 font-550 text-[#D7D8D9] line-clamp-2">
                        {publication.name}
                      </h3>
                    </header>
                  </article>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export type { PublicationsSectionProps };
export { PublicationsSection };
