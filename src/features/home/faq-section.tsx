import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <section
      className="fluid full-section flex justify-between max-w-xl dsp:max-w-6xl gap-12 flex-col dsp:flex-row dsp:items-center"
      aria-labelledby="faq-title"
      aria-describedby="faq-description"
    >
      <div className="w-full">
        <h2 id="faq-title" className="text-h2 font-500">
          FAQ
        </h2>
        <p id="faq-description" className="text-regular font-300 mt-8 mb-8">
          Jeśli nie znajdziesz tu odpowiedzi na swoje pytanie, śmiało skontaktuj
          się ze mną.
        </p>
        <a
          href="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"
          target="_blank"
          rel="noreferrer"
          title="Skontaktuj się ze mną"
          aria-label="Skontaktuj się ze mną"
          className="block mt-12 w-fit bg-background border-foreground border rounded-full px-6 py-2.5 transition-all hover:shadow-[0_0_16px_2px_rgba(255,255,255,0.3)]"
        >
          Skontaktuj się
        </a>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Na jakim etapie kariery programisty najlepiej rozpocząć mentoring?
          </AccordionTrigger>
          <AccordionContent>
            Mentoring można rozpocząć na każdym etapie kariery. Dla
            początkujących będzie wsparciem w zdobywaniu fundamentalnej wiedzy,
            dla średniozaawansowanych pomoże w specjalizacji, a dla
            doświadczonych w rozwoju umiejętności liderskich i technicznych.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Jak długo trwa typowy proces mentoringowy, aby osiągnąć konkretne
            cele?
          </AccordionTrigger>
          <AccordionContent>
            Czas trwania procesu mentoringowego zależy od indywidualnych celów.
            Typowo trwa od 3 do 6 miesięcy, z regularnymi sesjami. Konkretne
            umiejętności można rozwinąć w krótszym czasie, natomiast kompleksowy
            rozwój wymaga dłuższej współpracy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Jakie techniki używasz, aby pomóc w budowaniu pewności siebie
            programistów?
          </AccordionTrigger>
          <AccordionContent>
            Stosuję podejście oparte na małych sukcesach, code review z
            konstruktywną informacją zwrotną, praktyczne zadania dostosowane do
            poziomu umiejętności oraz regularne retrospektywy postępów. Kluczowe
            jest stworzenie bezpiecznej przestrzeni do eksperymentowania i nauki
            na błędach.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Czy mentoring jest dostosowany do indywidualnych potrzeb, czy
            obejmuje standardowy plan nauki?
          </AccordionTrigger>
          <AccordionContent>
            Mentoring jest zawsze dostosowany do indywidualnych potrzeb. Na
            początku definiujemy cele i oczekiwania, na podstawie których
            tworzony jest spersonalizowany plan rozwoju. Podążamy za Twoimi
            priorytetami, jednocześnie dbając o całościowy rozwój umiejętności.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Jakie są Twoje metody oceny, czy mentoring jest skuteczny i przynosi
            oczekiwane rezultaty?
          </AccordionTrigger>
          <AccordionContent>
            Regularnie mierzymy postępy względem ustalonych celów, stosujemy
            cykliczne retrospektywy, zbieramy metryki wydajności (jeśli to
            możliwe) oraz oceniamy jakościowe zmiany w podejściu do
            rozwiązywania problemów. Ważnym elementem jest również samoocena
            podopiecznego i informacja zwrotna z jego środowiska pracy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export { FaqSection };
