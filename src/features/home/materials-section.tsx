type Material = {
  id: string;
  title: string;
  description: string;
  price: number;
  url: string;
};

const MATERIALS_MOCK: Material[] = [
  {
    id: "senior-developer",
    title: "Senior Developer Starter Pack",
    description:
      "Code review tools, and problem-solving essentials to help you excel.",
    price: 200,
    url: "/materials/senior-developer",
  },
  {
    id: "better-code",
    title: "Better code pack",
    description:
      "Code review tools, and problem-solving essentials to help you excel.",
    price: 50,
    url: "/materials/better-code",
  },
  {
    id: "cloud",
    title: "Cloud",
    description: "Essential tools for scalable development.",
    price: 120,
    url: "/materials/cloud",
  },
  {
    id: "faster-coding-1",
    title: "Faster coding",
    description:
      "Automation scripts and best practices to accelerate development.",
    price: 80,
    url: "/materials/faster-coding-1",
  },
  {
    id: "faster-coding-2",
    title: "Faster coding",
    description:
      "Code review tools, and problem-solving essentials to help you excel.",
    price: 299,
    url: "/materials/faster-coding-2",
  },
];

const MaterialsSection = () => {
  return (
    <section
      className="fluid full-section flex flex-col justify-center"
      aria-labelledby="materials-heading"
    >
      <header className="flex gap-4 flex-col mbl:flex-row mbl:justify-between mbl:items-end mb-13">
        <h2 id="materials-heading" className="text-h2 font-500">
          Materiały
        </h2>
        <button
          type="button"
          id="materials-button"
          className="text-regular-bold font-500 cursor-pointer hover:text-white transition-colors duration-300 ease-in-out"
          aria-haspopup="dialog"
          aria-expanded="false"
        >
          Wszystkie materiały
        </button>
      </header>

      <ol
        aria-label="Lista dostępnych materiałów"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
      >
        {MATERIALS_MOCK.map((material) => (
          <li
            key={material.id}
            className="p-[1px] overflow-hidden relative rounded-xl bg-gradient-to-r from-[#111311] via-[#08140f] to-[#010F09]"
          >
            <a
              href={material.url}
              className="p-6 flex flex-col h-full rounded-xl bg-background relative"
              aria-describedby={`description-${material.id}`}
            >
              <div
                className="radial-flare size-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  right: `${Math.random() * 100}%`,
                }}
                aria-hidden="true"
              />
              <article
                aria-labelledby={material.title}
                className="flex flex-col h-full"
              >
                <header className="mb-4">
                  <h4 id={material.title} className="mb-2 text-h4 font-550">
                    {material.title}
                  </h4>
                  <p
                    id={`description-${material.id}`}
                    className="text-regular font-300"
                  >
                    {material.description}
                  </p>
                </header>
                <footer className="mt-auto pt-6">
                  <p
                    className="text-h5 font-550"
                    aria-label={`Cena: ${material.price} złotych`}
                  >
                    {material.price} zł
                  </p>
                </footer>
              </article>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
};

export { MaterialsSection };
export type { Material };
export type MaterialsSectionProps = Record<string, never>;
