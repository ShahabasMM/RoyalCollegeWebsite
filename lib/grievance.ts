/**
 * Grievance submission: the categories, the limits and the validation, shared
 * by the browser form (early feedback) and the server route (the check that
 * actually matters). Keeping one copy means the two can never drift.
 *
 * A grievance is stored as a row in `site_contact_submissions` — the same inbox
 * the public contact form already uses — with its category folded into the
 * subject line. No separate table or workflow is created, and nothing here
 * reads submissions back: the table has no public read policy.
 */

export const GRIEVANCE_CATEGORIES = [
  "Academic",
  "Examination",
  "Fees & accounts",
  "Harassment or safety",
  "Campus facilities",
  "Other",
] as const;

export const GRIEVANCE_MAX_NAME = 120;
export const GRIEVANCE_MAX_EMAIL = 200;
export const GRIEVANCE_MAX_PHONE = 40;
export const GRIEVANCE_MAX_MESSAGE = 4000;

export type GrievanceSubmission = {
  name: string;
  email: string;
  phone: string | null;
  category: string;
  message: string;
};

export type GrievanceValidation =
  | { ok: true; value: GrievanceSubmission }
  | { ok: false; error: string };

/** Deliberately simple: one @, a dot in the domain, no whitespace. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateGrievance(input: unknown): GrievanceValidation {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Could not read the submitted form." };
  }

  const raw = input as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const phone = String(raw.phone ?? "").trim();
  const category = String(raw.category ?? "").trim();
  const message = String(raw.message ?? "").trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > GRIEVANCE_MAX_NAME) {
    return { ok: false, error: "Please shorten your name." };
  }

  if (!email) return { ok: false, error: "Please enter your email." };
  if (email.length > GRIEVANCE_MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (phone.length > GRIEVANCE_MAX_PHONE) {
    return { ok: false, error: "Please shorten the phone number." };
  }

  if (!(GRIEVANCE_CATEGORIES as readonly string[]).includes(category)) {
    return { ok: false, error: "Please choose a category." };
  }

  if (!message) return { ok: false, error: "Please describe your concern." };
  if (message.length > GRIEVANCE_MAX_MESSAGE) {
    return {
      ok: false,
      error: `Please keep the message under ${GRIEVANCE_MAX_MESSAGE} characters.`,
    };
  }

  return {
    ok: true,
    value: { name, email, phone: phone || null, category, message },
  };
}
