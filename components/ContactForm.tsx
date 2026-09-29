"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Built once on the client; the anon key is safe to expose by design. */
let cached: SupabaseClient | null = null;

function client() {
  if (cached) return cached;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}

const MAX_MESSAGE = 4000;

export default function ContactForm() {
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
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
      return;
    }

    if (message.length > MAX_MESSAGE) {
      setError(`Please keep the message under ${MAX_MESSAGE} characters.`);
      return;
    }

    const supabase = client();

    if (!supabase) {
      setError(
        "The contact form is not available right now. Please email info@royalcollege.net.",
      );
      return;
    }

    setPending(true);
    setError(null);

    // Only visitor-supplied fields are sent. is_handled / handled_by are
    // deliberately never included so a submission cannot pre-mark itself read.
    const { error: insertError } = await supabase
      .from("site_contact_submissions")
      .insert({ name, email, phone: phone || null, message });

    setPending(false);

    if (insertError) {
      setError(
        "We could not send that just now. Please email info@royalcollege.net instead.",
      );
      return;
    }

    form.reset();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="cf-form" role="status">
        <div className="cf-success">
          <h3>Thank you — your message has been sent.</h3>
          <p className="muted">
            The office will get back to you. For urgent queries please call
            +91 98765 43210.
          </p>
          <button
            className="cf-submit"
            type="button"
            onClick={() => setSent(false)}
          >
            Send another message
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={onSubmit} noValidate>
      <div className="cf-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>
      <div className="cf-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="cf-field">
        <label htmlFor="contact-phone">
          Phone <span className="cf-optional">optional</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
        />
      </div>
      <div className="cf-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="How can we help?"
          rows={5}
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
            Sending
            <Loader2 className="cf-spin" size={15} strokeWidth={2.4} aria-hidden="true" />
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
