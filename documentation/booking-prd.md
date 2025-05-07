# System Umawiania Konsultacji z Wykorzystaniem Linków do Harmonogramów Spotkań Google Calendar

**1. Cel Produktu:**
Umożliwienie klientom rezerwacji różnych typów konsultacji z mentorem poprzez stronę internetową. System będzie kierował klientów do odpowiednich, publicznych stron rezerwacyjnych "Harmonogramów spotkań" Google Calendar, skonfigurowanych i zarządzanych przez mentora.

**2. Użytkownicy Docelowi:**
*   **Mentor:** Osoba oferująca konsultacje, zarządzająca swoją dostępnością bezpośrednio w Google Calendar.
*   **Klient:** Osoba chcąca umówić się na konsultację z mentorem.

**3. Główne Funkcjonalności (MVP - Minimum Viable Product):**

*   **Dla Klienta (na stronie WWW):**
    *   Możliwość przeglądania listy dostępnych typów konsultacji oferowanych przez mentora (np. "Konsultacja 1-godzinna", "Sesja 30-minutowa").
    *   Dla każdego typu konsultacji, możliwość kliknięcia przycisku/linku "Zarezerwuj termin" (lub podobnego).
    *   Po kliknięciu, przekierowanie do odpowiedniej, publicznej strony rezerwacyjnej "Harmonogramu spotkań" Google Calendar, skonfigurowanej dla danego typu konsultacji.
    *   Dalszy proces rezerwacji (wybór daty/godziny, podanie danych) odbywa się w całości na stronie Google.
*   **Dla Mentora (poza aplikacją, w Google Calendar):**
    *   Możliwość tworzenia i zarządzania wieloma "Harmonogramami spotkań" w swoim Google Calendar, po jednym dla każdego oferowanego typu konsultacji.
    *   Każdy "Harmonogram spotkań" powinien być skonfigurowany z odpowiednią dostępnością, długością spotkania, buforami, oknem rezerwacji itp.
    *   "Harmonogramy spotkań" powinny być skonfigurowane tak, aby sprawdzały zajętość w głównym kalendarzu mentora (i innych relevantnych kalendarzach) w celu automatycznego wykrywania i unikania konfliktów.
    *   Możliwość uzyskania publicznego linku do strony rezerwacyjnej dla każdego stworzonego "Harmonogramu spotkań".
*   **Dla Administratora Systemu/Dewelopera:**
    *   Możliwość skonfigurowania na stronie WWW listy typów konsultacji i przypisania do każdego z nich odpowiedniego publicznego linku do "Harmonogramu spotkań" Google Calendar dostarczonego przez mentora.

**4. Założenia i Zależności:**

*   Mentor posiada aktywne konto Google i potrafi korzystać z funkcji "Harmonogramy spotkań" (Appointment Schedules) w Google Calendar.
*   Mentor jest odpowiedzialny za poprawną konfigurację swoich "Harmonogramów spotkań", w tym za zapewnienie, że sprawdzają one konflikty z jego głównym kalendarzem.
*   Cały proces rezerwacji po kliknięciu linku na stronie WWW odbywa się na platformie Google.
*   Potwierdzenia, powiadomienia i zarządzanie spotkaniami (po rezerwacji) są obsługiwane przez Google Calendar.
*   Płatności są poza zakresem tego MVP i będą obsługiwane manualnie.
*   Obsługa anulowania/zmiany terminu przez klienta odbywa się zgodnie z możliwościami oferowanymi przez Google Calendar (np. poprzez link w potwierdzeniu e-mail) lub poprzez bezpośredni kontakt z mentorem.

**5. Przepływ Użytkownika (Klient):**

1.  Klient wchodzi na stronę internetową mentora, do sekcji umawiania konsultacji.
2.  Klient widzi listę dostępnych typów konsultacji wraz z krótkim opisem i/lub ceną (wyświetlaną informacyjnie).
3.  Klient wybiera interesujący go typ konsultacji.
4.  Klient klika przycisk "Zarezerwuj termin" (lub podobny) przypisany do wybranego typu konsultacji.
5.  Klient zostaje przekierowany (w nowej karcie lub tym samym oknie) na publiczną stronę rezerwacyjną "Harmonogramu spotkań" Google Calendar, specyficzną dla wybranego typu konsultacji.
6.  Na stronie Google Calendar, klient wybiera dostępną datę i godzinę, podaje wymagane przez Google dane (zazwyczaj imię, nazwisko, e-mail).
7.  Klient potwierdza rezerwację na stronie Google.
8.  Klient otrzymuje potwierdzenie rezerwacji e-mailem od Google Calendar. Spotkanie zostaje dodane do kalendarza mentora i (jeśli klient używa Google Calendar i ma odpowiednie ustawienia) do kalendarza klienta.

**6. Wymagania Techniczne (Strona WWW):**

*   Strona statyczna lub dynamiczna (np. zbudowana w Astro) zdolna do wyświetlania listy usług.
*   Możliwość łatwej aktualizacji listy usług i przypisanych do nich linków do "Harmonogramów spotkań" Google (np. poprzez plik konfiguracyjny, system CMS lub bezpośrednią edycję kodu).
*   Linki powinny być skonfigurowane tak, aby otwierały się w sposób przyjazny dla użytkownika (np. `target="_blank"`).

**7. Kryteria Sukcesu MVP:**

*   Klient może pomyślnie przejść proces od wyboru typu konsultacji na stronie WWW do zarezerwowania terminu na stronie Google Calendar.
*   Mentor widzi zarezerwowane spotkania w swoim Google Calendar.
*   System jest prosty w utrzymaniu dla administratora/dewelopera.

**8. Przyszłe Możliwości (Poza MVP):**

*   Integracja z systemem płatności.
*   Możliwość zbierania dodatkowych informacji od klienta przed przekierowaniem do Google.
*   Bardziej zaawansowane śledzenie konwersji.
*   Jeśli API Google Calendar rozwinie wsparcie dla "Harmonogramów spotkań", rozważenie głębszej integracji w celu np. wyświetlania dostępności bezpośrednio na stronie WWW.
