const appConfig = {
  aboutSection: {
    id: "about-section",
  },
  opinionsSection: {
    id: "opinions-section",
  },
  faqSection: {
    id: "faq-section",
  },
  materialsSection: {
    id: "materials-section",
    link: "https://4markdown.com/education-zone/",
  },
  plansSection: {
    id: "plans-section",
    plans: {
      seniorInYear: {
        cost: "4920",
        currency: "PLN",
        label: "Senior w rok",
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
    id: "specializations-section",
  },
  contactSection: {
    id: "contact-section",
    calendarLink: "https://calendar.app.google/unoaL2rV1MhKvVvZ8",
    linkedInLink:
      "https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/",
  },
} as const;

export { appConfig };
