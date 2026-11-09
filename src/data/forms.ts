// Where each website form sends its answers.
//
// Each form posts to its own Google Form, which saves the answer in your
// "Business Nest — website requests" Google Sheet and emails you (see
// scripts/google-forms-setup.gs). Until a form is connected (value is null),
// it falls back to Formspree, so nothing is lost while you set things up.
//
// To connect: run scripts/google-forms-setup.gs once, then paste the
// GOOGLE_FORMS block it prints over the one below.

export type FormKind = "signup" | "team" | "proposal" | "expert";

export interface GoogleFormTarget {
  /** https://docs.google.com/forms/d/e/<id>/formResponse */
  action: string;
  /** website field name → Google Form entry id, e.g. { email: "entry.123456" } */
  fields: Record<string, string>;
}

export const GOOGLE_FORMS: Record<FormKind, GoogleFormTarget | null> = {
  signup: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSf1aw09dvK8LYiVx-_WBMp7zip6ovFhMMqMrMbb7cDn1qBFCA/formResponse",
    fields: { workshop: "entry.2012361986", name: "entry.1002012464", email: "entry.1463486972" },
  },
  team: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSf09cqh4Z-iEbBin7c-f86zVeOaaUkMRNDi63PP2J9UYuWgYg/formResponse",
    fields: {
      workshop: "entry.1082642278",
      name: "entry.1801444911",
      email: "entry.1753991481",
      company: "entry.102198350",
      team_size: "entry.1260285441",
      preferred_dates: "entry.1720730345",
      location: "entry.197896966",
      language: "entry.475088613",
      goals: "entry.223086489",
    },
  },
  proposal: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSd7BOVtoo1QJDd9jtfGWbHxoTx5hNYj-eme3hPujaffx6oY4A/formResponse",
    fields: {
      name: "entry.1819434517",
      email: "entry.571099729",
      phone: "entry.363419397",
      organisation: "entry.823769127",
      workshop_topic: "entry.1986604991",
      description: "entry.1996660921",
      group_size: "entry.1594683369",
      preferred_period: "entry.624478769",
    },
  },
  expert: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSdsbsGBBHqaUfPhLJ0x4bh-S8KL3yVwbIQA1v1hAbvcN-ylFw/formResponse",
    fields: {
      name: "entry.2055799779",
      email: "entry.1951540206",
      phone: "entry.801592113",
      linkedin: "entry.2004745768",
      expertise: "entry.1426428811",
      motivation: "entry.1025213673",
    },
  },
};

/** Field names each website form sends (must match the setup script). */
export const FORM_FIELDS: Record<FormKind, string[]> = {
  signup: ["workshop", "name", "email"],
  team: ["workshop", "name", "email", "company", "team_size", "preferred_dates", "location", "language", "goals"],
  proposal: ["name", "email", "phone", "organisation", "workshop_topic", "description", "group_size", "preferred_period"],
  expert: ["name", "email", "phone", "linkedin", "expertise", "motivation"],
};
