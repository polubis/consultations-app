import { useSimpleFeature } from "@/lib/dk/use-simple-feature";
import { MenuIcon } from "lucide-react";

export const HomeView = () => {
  const menu = useSimpleFeature();

  return (
    <>
      <header className="layout-navigation" aria-label="Główna nawigacja">
        <nav className="fluid flex items-center h-full">
          <a href="/">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="logoTitle"
            >
              <title id="logoTitle">Logo strony</title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6411 0.0666544C13.8722 -0.0222182 14.128 -0.0222182 14.3591 0.0666544C18.0156 1.47302 19.9884 4.1104 20.8906 7.14802C16.2833 6.80582 11.7169 6.8058 7.10958 7.14798C8.01182 4.11038 9.98458 1.47302 13.6411 0.0666544ZM6.59852 9.69546C5.9667 15.1647 7.91124 21.309 9.2229 24.4944C9.32102 24.7328 9.50736 24.924 9.74306 25.0282C10.7327 25.466 11.691 25.7558 12.6392 25.8978V26.5C12.6392 27.3284 13.3107 28 14.1392 28C14.9676 28 15.6392 27.3284 15.6392 26.5V25.8518C16.4965 25.6976 17.3639 25.4232 18.2567 25.0282C18.4924 24.924 18.6787 24.7328 18.7768 24.4944C20.0884 21.309 22.0334 15.1648 21.4016 9.6955C16.4488 9.28998 11.5514 9.28998 6.59852 9.69546ZM21.0888 25.446C21.9268 23.4106 23.0846 20.0584 23.6638 16.3323C24.0618 17.1629 24.371 18.0637 24.5888 18.9634C25.1764 21.389 25.1936 24.1766 24.2352 26.2366C23.8692 27.0232 23.1568 27.461 22.399 27.5188C21.663 27.5752 20.9212 27.2758 20.394 26.7004L20.3086 26.6068C20.6412 26.2792 20.9078 25.8856 21.0888 25.446ZM4.3357 16.3259C4.9143 20.0544 6.07272 23.4092 6.9114 25.446C7.092 25.8846 7.358 26.2778 7.6896 26.605L7.60226 26.7008C7.0749 27.2762 6.3331 27.5756 5.59718 27.5192C4.83938 27.4612 4.12694 27.0236 3.76102 26.237C2.80264 24.177 2.81988 21.3894 3.40732 18.9637C3.6258 18.0617 3.93596 17.1584 4.3357 16.3259Z"
                fill="currentColor"
                className="text-primary-500"
              />
            </svg>
          </a>

          <ul className="gap-8 ml-auto ltp:flex hidden">
            <li>
              <a
                className="text-regular hover:text-white transition-colors font-r duration-300 ease-in-out"
                href="/specjalizacje"
              >
                Specjalizacje
              </a>
            </li>
            <li>
              <a
                className="text-regular hover:text-white transition-colors font-r duration-300 ease-in-out"
                href="/specjalizacje"
              >
                Materiały
              </a>
            </li>
            <li>
              <a
                className="text-regular hover:text-white transition-colors font-r duration-300 ease-in-out"
                href="/o-mnie"
              >
                O mnie
              </a>
            </li>
            <li>
              <a
                className="text-regular hover:text-white transition-colors font-r duration-300 ease-in-out"
                href="/opinie"
              >
                Opinie
              </a>
            </li>
            <li>
              <a
                className="text-regular hover:text-white transition-colors font-r duration-300 ease-in-out"
                href="/faq"
              >
                FAQ
              </a>
            </li>
          </ul>

          <a
            className="primary-button ml-16 ltp:inline hidden"
            href="/konsultacje"
          >
            Umów konsultację
          </a>

          <button
            className="ml-auto ltp:hidden"
            aria-label={menu.isOn ? "Zamknij menu" : "Otwórz menu"}
            type="button"
            onClick={menu.toggle}
          >
            <MenuIcon role="img" aria-labelledby="menuIconTitle">
              <title id="menuIconTitle">Ikona nawigacji mobilnej</title>
            </MenuIcon>
          </button>
        </nav>
      </header>

      {menu.isOn && (
        <div className="layout-mobile-navigation">
          <div className="absolute top-0 right-0 left-0 h-20 flex items-center justify-end px-6 tbt:px-10">
            <button
              aria-label={menu.isOn ? "Zamknij menu" : "Otwórz menu"}
              type="button"
              onClick={menu.toggle}
            >
              <MenuIcon role="img" aria-labelledby="menuIconTitle">
                <title id="menuIconTitle">Ikona nawigacji mobilnej</title>
              </MenuIcon>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="space-y-4">
              <li className="text-center animate-jump-top-bottom">
                <a
                  className="hover:text-white font-m text-h4"
                  href="/specjalizacje"
                >
                  Specjalizacje
                </a>
              </li>
              <li className="text-center animate-jump-top-bottom delay-100">
                <a
                  className="hover:text-white font-m text-h4"
                  href="/specjalizacje"
                >
                  Materiały
                </a>
              </li>
              <li className="text-center animate-jump-top-bottom delay-200">
                <a className="hover:text-white font-m text-h4" href="/o-mnie">
                  O mnie
                </a>
              </li>
              <li className="text-center animate-jump-top-bottom delay-300">
                <a className="hover:text-white font-m text-h4" href="/opinie">
                  Opinie
                </a>
              </li>
              <li className="text-center animate-jump-top-bottom delay-400">
                <a className="hover:text-white font-m text-h4" href="/faq">
                  FAQ
                </a>
              </li>
            </ul>
            <a
              className="primary-button mt-8 animate-jump-top-bottom delay-500"
              href="/konsultacje"
            >
              Umów konsultację
            </a>
          </div>
        </div>
      )}

      <main>
        <section aria-labelledby="hero-title">
          <h1 id="hero-title">Chcesz awansować na seniora w rok?</h1>
          <p>
            Zdobądź wiedzę i umiejętności w oparciu o spersonalizowany plan
            działania
          </p>
          <a href="#paths">Wybierz ścieżkę</a>
          <div aria-hidden="true">{/* Decorative green circles */}</div>
        </section>

        <section aria-labelledby="progress-title">
          <h2 id="progress-title">
            Stoisz w miejscu i nie wiesz jak zrobić kolejny krok?
          </h2>
          <p>
            Pomogę Ci rozwinąć umiejętności i poszerzyć wiedzę w wielu
            dziedzinach IT.
          </p>
          <nav aria-label="Specialization categories">
            <ul>
              <li>
                <button type="button">Frontend</button>
              </li>
              <li>
                <button type="button">Backend</button>
              </li>
              <li>
                <button type="button">AI</button>
              </li>
              <li>
                <button type="button">Soft skills</button>
              </li>
              <li>
                <button type="button">Devops</button>
              </li>
              <li>
                <button type="button">Testowanie</button>
              </li>
            </ul>
          </nav>
        </section>

        <section aria-labelledby="about-title">
          <h2 id="about-title">Działam w IT od [X] lat</h2>
          <div>
            <img src="/path-to-image.jpg" alt="Adrian - IT Mentor" />
            <div aria-label="Social media links">
              {/* Social media icons/links */}
            </div>
          </div>
          <p>{/* About text */}</p>
        </section>

        <section aria-labelledby="publications-title">
          <header>
            <h2 id="publications-title">Publikacje</h2>
            <span>/2024</span>
          </header>
          <section aria-label="Publications carousel">
            {/* Publication cards */}
          </section>
        </section>

        <section aria-labelledby="pricing-title">
          <h2 id="pricing-title">
            Wybierz plan nauki i umów się na spotkanie lub kup materiały
          </h2>
          <div>
            <article>
              <h3>SAMOUK</h3>
              <p>{/* Plan description */}</p>
              <ul>{/* Feature list */}</ul>
              <p>od 50 zł</p>
              <a href="/materials">Zobacz materiały</a>
            </article>
            {/* Other pricing plans */}
          </div>
        </section>

        <section aria-labelledby="booking-title">
          <h2 id="booking-title">Umów spotkanie</h2>
          <div>
            <div>
              <blockquote>
                {/* Testimonial content */}
                <footer>
                  <img src="/path-to-image.jpg" alt="" />
                  <cite>Anna - Junior Frontend Developer</cite>
                </footer>
              </blockquote>
            </div>
            <form aria-label="Booking form">
              {/* Calendar and form fields */}
            </form>
          </div>
        </section>

        <section aria-labelledby="materials-title">
          <header>
            <h2 id="materials-title">Materiały</h2>
            <a href="/materials">Wszystkie materiały</a>
          </header>
          <div>{/* Material cards */}</div>
        </section>

        <section aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">
            Opinie osób, które osiągnęły swój cel, dzięki mojemu wsparciu
          </h2>
          <section aria-label="Testimonials carousel">
            {/* Testimonial slides */}
          </section>
        </section>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title">FAQ</h2>
          <div>
            <form aria-label="Contact form">{/* Contact form fields */}</form>
            <div>{/* FAQ accordion */}</div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <nav aria-label="Footer navigation">
            <div>
              <h3>Mentoring</h3>
              <ul>
                <li>
                  <a href="/specjalizacje">Specjalizacje</a>
                </li>
                <li>
                  <a href="/konsultacje">Konsultacje</a>
                </li>
                <li>
                  <a href="/materialy">Materiały</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Informacje</h3>
              <ul>
                <li>
                  <a href="/o-mnie">O mnie</a>
                </li>
                <li>
                  <a href="/opinie">Opinie</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/kontakt">Kontakt</a>
                </li>
              </ul>
            </div>
          </nav>
          <div aria-label="Social media links">
            {/* Social media icons/links */}
          </div>
        </div>
        <div>
          <p>Powered by GreenOn Software © 2025</p>
          <p>Design by Małgo Kruszyńska</p>
        </div>
      </footer>
    </>
  );
};
