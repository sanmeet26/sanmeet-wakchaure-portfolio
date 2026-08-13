/**
 * POST /api/contact
 *
 * Runs on Vercel's Edge runtime and talks to Resend over plain fetch, so it
 * needs no Node-only APIs and no SDK dependency. The API key is read from the
 * environment and never leaves the server.
 *
 * Environment variables (set these in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      — from resend.com
 *   CONTACT_TO_EMAIL    — where enquiries land
 *   CONTACT_FROM_EMAIL  — an address on a domain verified with Resend
 */

export const config = { runtime: 'edge' };

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot. Real people never see this field, so a value means a bot. */
  company?: unknown;
}

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(payload: ContactPayload) {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);
  const errors: FieldErrors = {};

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Enter your name, between 2 and 80 characters.';
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    errors.email = 'Enter an email address I can reply to.';
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Enter a message between 10 and 2000 characters.';
  }

  return { name, email, message, errors };
}

/** Keep submitted text out of the HTML structure of the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Use POST to send a message.' }, 405);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: 'The request body was not valid JSON.' }, 400);
  }

  // Honeypot filled: accept silently so the bot learns nothing.
  if (asTrimmedString(payload.company).length > 0) {
    return json({ ok: true }, 200);
  }

  const { name, email, message, errors } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return json({ error: 'Some fields need attention.', fields: errors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Misconfiguration, not the visitor's fault — the UI offers email instead.
    return json({ error: 'The contact form is not configured yet.' }, 503);
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      html: [
        `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>`,
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      ].join(''),
      text: `From: ${name} (${email})\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return json({ error: 'The message could not be sent. Please email me directly.' }, 502);
  }

  return json({ ok: true }, 200);
}
