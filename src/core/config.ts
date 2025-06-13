const routing = {
  home: "/",
  seniorInYear: "/kurs-senior-w-rok/",
} as const;

const appConfig = {
  aboutSection: {
    id: "omnie",
  },
  opinionsSection: {
    id: "opinie",
  },
  faqSection: {
    id: "faq",
  },
  materialsSection: {
    id: "materiały",
    link: "https://4markdown.com/education-zone/",
  },
  plansSection: {
    id: "plany",
    plans: {
      seniorInYear: {
        cost: "4920",
        currency: "PLN",
        label: "Kurs Senior w rok",
      },
      mockedTechInterview: {
        cost: "369",
        currency: "PLN",
        label: "Mocked Technical Interview",
      },
      quickCall: {
        cost: "123",
        currency: "PLN",
        label: "Konsultacja 1h",
      },
      custom: {
        cost: "Do ustalenia",
        currency: "PLN",
        label: "Własny plan",
      },
    },
  },
  specializationsSection: {
    id: "specjalizacje",
  },
  contactSection: {
    id: "kontakt",
    calendarLink: "https://calendar.app.google/unoaL2rV1MhKvVvZ8",
    linkedInLink:
      "https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/",
  },
} as const;

export { appConfig, routing };
