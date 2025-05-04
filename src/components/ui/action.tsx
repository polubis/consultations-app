import { ArrowRightIcon } from "lucide-react";

const Action = () => {
  return (
    <a
      className="relative flex items-center pl-13.5 pr-6.5 w-fit h-11 group mt-7"
      href="#paths"
      aria-label="Wybierz ścieżkę rozwoju"
    >
      <div
        className="absolute left-0 top-0 bottom-0 my-auto bg-primary-500 size-11 rounded-full border border-primary-400 transition-all shadow-[0_0_16px_2px_rgba(1,120,70,0.6)] group-hover:w-full group-hover:shadow-[0_0_16px_2px_rgba(1,120,70,0.9)]"
        aria-hidden="true"
      />
      <div
        className="absolute transition-transform flex justify-center items-center left-0 top-0 bottom-0 my-auto size-11 text-inverted-foreground text-regular-bold font-m group-hover:translate-x-3.5"
        aria-hidden="true"
      >
        <ArrowRightIcon />
      </div>
      <span className="text-regular-bold font-m drop-shadow-[0_0_11.9px_rgba(0,131,74,0.9)] transition-colors group-hover:text-inverted-foreground">
        Wybierz ścieżkę
      </span>
    </a>
  );
};

export { Action };
