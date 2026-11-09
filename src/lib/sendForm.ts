import { GOOGLE_FORMS, type FormKind } from "@/data/forms";
import { LINKS } from "@/data/site";

/**
 * Send a website form.
 * - Connected to a Google Form → posts to it (answers land in your Google Sheet,
 *   and the setup script emails you).
 * - Not connected yet → posts to Formspree with an email subject, as before.
 * Throws when the request fails, so the form can show its error message.
 */
export async function sendForm(kind: FormKind, values: Record<string, string>, subject: string): Promise<void> {
  const target = GOOGLE_FORMS[kind];

  if (target) {
    const body = new URLSearchParams();
    for (const [key, entry] of Object.entries(target.fields)) {
      const v = values[key];
      if (v) body.append(entry, v);
    }
    // Google Forms doesn't allow reading the reply from another website ("no-cors"),
    // so a network failure is the only error we can detect here.
    await fetch(target.action, { method: "POST", mode: "no-cors", body });
    return;
  }

  const data = new FormData();
  for (const [k, v] of Object.entries(values)) if (v) data.append(k, v);
  data.append("_subject", subject);
  data.append("form_type", kind);
  const res = await fetch(LINKS.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(String(res.status));
}

/** Collect a <form>'s named fields as plain strings. */
export function formValues(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === "string") out[k] = v.trim();
  });
  return out;
}
