"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_MAX_MESSAGE,
} from "@/lib/grievance";

const MAX_MESSAGE = GRIEVANCE_MAX_MESSAGE;

/**
 * Grievance categories. These are written into the submission's subject line
 * (`Grievance — <category>`) so the office can triage them in the same inbox it
 * already uses for contact enquiries. No separate table or fake workflow is
 * created.
 */
const CATEGORIES = GRIEVANCE_CATEGORIES;

export default function GrievanceForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !category || !message) {
      setError("Please fill in your name, email, category and message.");
      return;
    }

    if (message.length > MAX_MESSAGE) {
      setError(`Please keep the message under ${MAX_MESSAGE} characters.`);
      return;
    }

    setPending(true);
    setError(null);

    // The server route validates the same fields again and writes the row. Only
    // visitor-supplied fields are sent; nothing can mark the grievance handled.
    try {
      const response = await fetch("/api/grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, category, message }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        setError(
          payload?.error ??
            "We could not submit that just now. Please try again, or email royalcsa@gmail.com.",
        );
        return;
      }
    } catch {
      setError(
        "We could not submit that just now. Please try again, or email royalcsa@gmail.com.",
      );
      return;
    } finally {
      setPending(false);
    }

    form.reset();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="cf-form" role="status">
        <div className="cf-success">
          <h3>Thank you — your grievance has been submitted.</h3>
          <p className="muted">
            The college will review it and respond through the contact details you
            provided. If it is urgent, please also contact the office directly.
          </p>
          <button
            className="cf-submit"
            type="button"
            onClick={() => setSent(false)}
          >
            Submit another
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={onSubmit} noValidate>
      <div className="cf-field">
        <label htmlFor="grievance-name">Name</label>
        <input
          id="grievance-name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>
      <div className="cf-field">
        <label htmlFor="grievance-email">Email</label>
        <input
          id="grievance-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="cf-field">
        <label htmlFor="grievance-phone">
          Phone <span className="cf-optional">optional</span>
        </label>
        <input
          id="grievance-phone"
          name="phone"
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
        />
      </div>
      <div className="cf-field">
        <label htmlFor="grievance-category">Category</label>
        <select id="grievance-category" name="category" defaultValue="" required>
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="cf-field">
        <label htmlFor="grievance-message">What would you like to raise?</label>
        <textarea
          id="grievance-message"
          name="message"
          placeholder="Describe the concern, including dates where relevant."
          rows={6}
          maxLength={MAX_MESSAGE}
          required
        />
      </div>

      {error ? (
        <p className="cf-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="cf-submit" type="submit" disabled={pending}>
        {pending ? (
          <>
            Submitting
            <Loader2 className="cf-spin" size={15} strokeWidth={2.4} aria-hidden="true" />
          </>
        ) : (
          <>
            Submit grievance
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
