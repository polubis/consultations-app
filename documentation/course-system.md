# System Dynamicznych Kursów - Dokumentacja

## 📋 Przegląd

System pozwala na tworzenie dynamicznych sekcji kursów/produktów z wykorzystaniem plików Markdown z custom komponentami React. Każdy kurs ma swoją dedykowaną strukturę definiowaną w `.md` i automatycznie renderowaną z pełnym stylowaniem Tailwind.

## 🏗️ Architektura

### 1. Plik Markdown (`public/course/senior-w-js.md`)

Zawiera treść kursu z możliwością użycia:

- Standardowy Markdown (nagłówki, paragrafy, listy, linki)
- Tabele GFM (GitHub Flavored Markdown)
- **Custom komponenty**:
  - `<CourseTable>` - wrapper dla tabel z stylowaniem
  - `<Timeline />` - interaktywna oś czasu (mobile/tablet)
  - `<Gallery />` - galeria zdjęć z thumbnailami

### 2. Komponenty React

#### `MarkdownRenderer` (`markdown-renderer.tsx`)

- Główny renderer wykorzystujący `react-markdown`
- Mapuje elementy MD na komponenty Tailwind
- Obsługuje custom komponenty
- Plugins: `remark-gfm`, `rehype-raw`

**Mapowanie elementów:**

```tsx
h1, h2, h3 → styled headings
p → paragraphs z leading-[150%]
table → CourseTable wrapper
ul, ol, li → custom lists z bullet points
code → inline/block code z syntax highlighting
a → links z hover effects
blockquote → styled quotes
hr → dividers
```

#### `CourseTable` (`course-table.tsx`)

- Wrapper dla tabel
- Overflow handling
- Border i rounded corners
- Responsive width

#### `CourseTimeline` (`course-timeline.tsx`)

- Interaktywna oś czasu z 12 miesiącami
- Progress bar
- Clickable markers
- Content preview dla aktywnego miesiąca
- **Widoczny tylko na mobile/tablet** (`dsp:hidden`)

#### `CourseGallery` (`course-gallery.tsx`)

- Główne zdjęcie + 5 thumbnails
- State management dla aktywnego obrazu
- Hover effects i active borders
- Grayscale filter

#### `CourseNavigation` (`course-navigation.tsx`)

- Sticky sidebar navigation (desktop only)
- Auto-extraction nagłówków h2 z MD
- Intersection Observer dla active state
- Smooth scroll do sekcji
- **Widoczny tylko na desktop** (`dsp:block`)

### 3. Główny Komponent Astro (`mentor-course-section.astro`)

**Funkcjonalność:**

1. Przyjmuje `markdownContent` jako prop
2. Ekstraktuje nagłówki h2 → tworzy navigation items
3. Dodaje ID do nagłówków (auto-generated, URL-friendly)
4. Renderuje grid layout:
   - Left: `CourseNavigation` (desktop)
   - Right: `MarkdownRenderer` z content

**Layout:**

```
Desktop (dsp):
┌─────────────┬──────────────────────┐
│ Navigation  │  Markdown Content    │
│ (240px)     │  (flex-1)            │
│             │                      │
│ - Sticky    │  - H1, H2, H3        │
│ - Auto      │  - Tables            │
│   scroll    │  - Timeline (hidden) │
│             │  - Gallery           │
└─────────────┴──────────────────────┘

Mobile/Tablet:
┌──────────────────────────────────┐
│  Markdown Content (full width)   │
│                                  │
│  - H1, H2, H3                    │
│  - Tables (scrollable)           │
│  - Timeline (visible)            │
│  - Gallery                       │
└──────────────────────────────────┘
```

### 4. Integracja w `[slug].astro`

```astro
// 1. Import
import MentorCourseSection from "@/features/course/mentor-course-section.astro";

// 2. Wczytaj MD (już istnieje)
const markdownContent = await fs.readFile(filePath, "utf-8");

// 3. Użyj w main
<main>
  <MentorHeroSection />
  <MentorCourseSection markdownContent={markdownContent} />
  <MentorWhySection />
  <MentorCtaSection />
</main>
```

## 📦 Zależności

```json
{
  "react-markdown": "^9.x",
  "remark-gfm": "^4.x",
  "rehype-raw": "^7.x"
}
```

## 🎨 Stylowanie

Wszystkie komponenty używają:

- Tailwind v4 utilities
- Custom CSS variables z `global.css`
- Responsive breakpoints: `tbt` (768px), `dsp` (1280px)
- Color palette: `--foreground`, `--primary-500`, `--background`

## 📝 Jak dodać nowy kurs?

1. **Utwórz plik MD** w `public/course/nazwa-kursu.md`:

```markdown
# Tytuł Kursu

Opis kursu...

## Sekcja 1

Content...

<CourseTable>

| Col 1 | Col 2 |
| ----- | ----- |
| A     | B     |

</CourseTable>

<Timeline />

## Sekcja 2

Więcej contentu...

<Gallery />
```

2. **Dodaj slug** w `getStaticPaths()`:

```ts
export async function getStaticPaths() {
  const course = ["senior-w-js", "nazwa-kursu"]; // ← dodaj
  // ...
}
```

3. **Gotowe!** SSG automatycznie wygeneruje stronę.

## 🔧 Custom Komponenty

### Jak stworzyć nowy custom komponent?

1. **Utwórz komponent** w `src/features/course/`:

```tsx
// custom-component.tsx
function CustomComponent() {
  return <div>Custom content</div>;
}
export { CustomComponent };
```

2. **Import w `markdown-renderer.tsx`**:

```tsx
import { CustomComponent } from "./custom-component";
```

3. **Dodaj handling w renderer**:

```tsx
p: ({ children, ...props }) => {
  const childString = String(children);
  if (childString.includes("<CustomComponent")) {
    return <CustomComponent />;
  }
  // ...
};
```

4. **Użyj w MD**:

```markdown
## Sekcja

<CustomComponent />
```

## 🎯 Features

✅ SSG (Static Site Generation)
✅ Responsive design (mobile-first)
✅ Sticky navigation (desktop)
✅ Interactive timeline (mobile/tablet)
✅ Image gallery
✅ Custom table styling
✅ Auto-generated navigation from headings
✅ Smooth scroll
✅ Intersection Observer dla active states
✅ Full Tailwind styling
✅ Accessibility (aria-labels, semantic HTML)
✅ TypeScript type safety

## 🚀 Performance

- **SSG**: Zero JS dla statycznego contentu
- **Client hydration**: Tylko dla interaktywnych komponentów (`client:load`)
- **Lazy loading**: Images z `loading="lazy"`
- **Code splitting**: Automatic per-component
- **Minimal bundle**: React-markdown + 2 plugins

## 📊 Struktura Plików

```
src/features/course/
├── course-table.tsx           # Table wrapper
├── course-timeline.tsx        # Interactive timeline
├── course-gallery.tsx         # Image gallery
├── course-navigation.tsx      # Sidebar navigation
├── markdown-renderer.tsx      # Main MD renderer
└── mentor-course-section.astro # Main section component

public/course/
└── senior-w-js.md            # Course content

src/pages/course/
└── [slug].astro              # Dynamic page
```

## 🎓 Przykład Użycia

Zobacz `public/course/senior-w-js.md` dla pełnego przykładu kursu z:

- 12-miesięczną tabelą programu
- Interaktywną timeline
- Galerią zdjęć
- Multiple sekcje z auto-navigation
