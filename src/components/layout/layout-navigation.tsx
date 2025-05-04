import { useSimpleFeature } from "@/lib/dk/use-simple-feature";
import { MenuIcon, XIcon } from "lucide-react";

const LayoutNavigation = () => {
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
                href="/materialy"
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
            className="primary-button text-center px-6 py-2.5 ml-16 ltp:inline hidden"
            href="/konsultacje"
          >
            Umów konsultację
          </a>

          {menu.isOff && (
            <button
              className="ml-auto ltp:hidden"
              aria-label="Otwórz menu"
              type="button"
              onClick={menu.toggle}
            >
              <MenuIcon role="img" aria-labelledby="menuIconTitle">
                <title id="menuIconTitle">
                  Ikona do otwierania nawigacji mobilnej
                </title>
              </MenuIcon>
            </button>
          )}
        </nav>
      </header>

      {menu.isOn && (
        <nav
          className="layout-mobile-navigation"
          aria-label="Nawigacja mobilna"
        >
          <div className="absolute top-0 right-0 left-0 h-16 mbl:h-18 tbt:h-20 flex items-center justify-end px-4 mbl:px-6 tbt:px-10">
            <button
              aria-label="Zamknij menu"
              type="button"
              onClick={menu.toggle}
            >
              <XIcon role="img" aria-labelledby="mobileMenuIconTitle">
                <title id="mobileMenuIconTitle">
                  Ikona do zamykania nawigacji mobilnej
                </title>
              </XIcon>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="space-y-4" role="menu">
              <li
                className="text-center animate-jump-top-bottom"
                role="presentation"
              >
                <a
                  className="hover:text-white font-m text-h4"
                  href="/specjalizacje"
                  role="menuitem"
                >
                  Specjalizacje
                </a>
              </li>
              <li
                className="text-center animate-jump-top-bottom delay-100"
                role="presentation"
              >
                <a
                  className="hover:text-white font-m text-h4"
                  href="/materialy"
                  role="menuitem"
                >
                  Materiały
                </a>
              </li>
              <li
                className="text-center animate-jump-top-bottom delay-200"
                role="presentation"
              >
                <a
                  className="hover:text-white font-m text-h4"
                  href="/o-mnie"
                  role="menuitem"
                >
                  O mnie
                </a>
              </li>
              <li
                className="text-center animate-jump-top-bottom delay-300"
                role="presentation"
              >
                <a
                  className="hover:text-white font-m text-h4"
                  href="/opinie"
                  role="menuitem"
                >
                  Opinie
                </a>
              </li>
              <li
                className="text-center animate-jump-top-bottom delay-400"
                role="presentation"
              >
                <a
                  className="hover:text-white font-m text-h4"
                  href="/faq"
                  role="menuitem"
                >
                  FAQ
                </a>
              </li>
            </ul>
            <a
              className="primary-button text-center px-6 py-2.5 mt-8 animate-jump-top-bottom delay-500"
              href="/konsultacje"
            >
              Umów konsultację
            </a>
          </div>
        </nav>
      )}
    </>
  );
};

export { LayoutNavigation };
