Przeanalizuję Twoją implementację pod kątem architektury, bezpieczeństwa i najlepszych praktyk.
Analiza głównych problemów

1. Mieszanie odpowiedzialności w processMarkdown
   Funkcja robi zbyt wiele:

Parsuje AST dla nagłówków
Wykonuje regex replacements dla komponentów
Zwraca trzy różne rzeczy

Problem: Używasz AST (unified/remark) do jednej rzeczy, a regex do drugiej. To niespójne i trudne w utrzymaniu. 2. Niebezpieczne regex replacements
typescriptcontent = content.replace(/<Timeline\s\*\/>/g, "`timeline\nRENDER_TIMELINE\n`");
Problemy:

Regex nie rozumie kontekstu Markdown (może zastąpić <Timeline /> wewnątrz code blocków)
Ciąg znaków RENDER_TIMELINE to "magic string" - łatwo o literówkę
Trudno debugować gdy coś nie działa

3. Komponent code robi za dużo logiki
   typescriptcode: ({ children, className }) => {
   if (language === "timeline" && code === "RENDER_TIMELINE") {
   return <CourseTimeline timelineData={timeline} />;
   }
   // ...
   }
   Problem: Logika decyzyjna w komponencie renderującym. To powinno być rozwiązane wcześniej.
4. Brak walidacji danych
   Nigdzie nie sprawdzasz czy frontmatter.timeline ma poprawną strukturę. Co gdy:

Timeline jest undefined?
Ma złą strukturę?
Brakuje wymaganych pól?

5. Usuwanie <CourseTable> jest hackiem
   typescriptcontent = content.replace(/<CourseTable>\s\*/g, "");
   To wrapper który nic nie wnosi do Markdown. Jeśli chcesz specjalny styl tabeli, użyj CSS.
   Lepsze podejście
   Oto czystsze rozwiązanie:
   Opcja A: Remark plugin (zalecane)
   Stwórz custom remark plugin do obsługi komponentów:
   typescript// remark-custom-components.ts
   import { visit } from 'unist-util-visit';
   import type { Plugin } from 'unified';

export const remarkCustomComponents: Plugin = () => {
return (tree) => {
visit(tree, 'html', (node: any) => {
// Zamień <Timeline /> na placeholder
if (node.value.match(/<Timeline\s\*\/>/)) {
node.type = 'code';
node.lang = 'component-timeline';
node.value = '';
}

      // Zamień <Gallery /> na placeholder
      if (node.value.match(/<Gallery\s*\/>/)) {
        node.type = 'code';
        node.lang = 'component-gallery';
        node.value = '';
      }
    });

};
};
Opcja B: Prostsze - użyj konwencji Markdown
Zamiast <Timeline /> użyj:
markdown```timeline
To jest już poprawny Markdown code block!
Proponowane zmianymarkdown-processor.ts (ulepszona wersja)Code import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Heading } from "mdast";

type NavigationItem = {
idKluczowe ulepszenia

1. Type safety
   typescripttype ComponentType = keyof typeof COMPONENT_MAP;
   function isValidComponentType(type: string): type is ComponentType
   Teraz TypeScript pilnuje, żeby komponenty istniały.
2. Component registry pattern
   typescriptconst COMPONENT_MAP = {
   timeline: CourseTimeline,
   gallery: CourseGallery,
   } as const;
   Łatwo dodać nowe komponenty, wszystko w jednym miejscu.
3. Obsługa duplikatów ID
   typescriptwhile (seenIds.has(id)) {
   id = `${originalId}-${counter}`;
   counter++;
   }
4. Lepsze normalizowanie polskich znaków
   typescript.normalize("NFD")
   .replace(/[\u0300-\u036f]/g, "")
   Dodatkowe rekomendacje
5. Dodaj walidację w Astro:
   typescript// course-section.astro
   import { z } from 'zod';

const TimelineSchema = z.array(z.object({
month: z.number(),
roman: z.string(),
modules: z.array(z.string()),
}));

const GallerySchema = z.array(z.object({
src: z.string(),
alt: z.string(),
}));

// Waliduj przed użyciem
const timeline = TimelineSchema.safeParse(frontmatter.timeline);
if (!timeline.success) {
console.error('Invalid timeline data:', timeline.error);
} 2. Rozważ prostszą konwencję w Markdown:
Zamiast <Timeline /> użyj:
markdown```timeline
To czysty Markdown, nie potrzebujesz custom parsowania. 3. Usuń <CourseTable> wrapper
Jest niepotrzebny. Jeśli chcesz custom styl, użyj CSS:
css.course-content table {
/_ twoje style _/
} 4. Performance - memoize processor
typescriptimport { useMemo } from 'react';

function MarkdownRenderer({ content, ...props }) {
const renderedContent = useMemo(
() => <ReactMarkdown {...options}>{content}</ReactMarkdown>,
[content, timeline, gallery]
);

return renderedContent;
}
Podsumowanie
Co działa dobrze:

✅ Idea dynamicznego renderowania komponentów
✅ Separacja nawigacji i contentu
✅ Użycie remark/unified

Co wymaga poprawy:

❌ Mieszanie regex i AST
❌ Magic strings ("RENDER_TIMELINE")
❌ Brak walidacji danych
❌ Zbyt dużo logiki w komponencie code

Moje rozwiązanie to eliminuje, dając ci czystszy, bardziej maintainable kod z lepszym type safety.
