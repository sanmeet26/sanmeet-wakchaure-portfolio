import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/Common';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

type Status = 'idle' | 'submitting' | 'sent' | 'error';
type Field = 'name' | 'email' | 'message';

interface ApiError {
  error?: string;
  fields?: Partial<Record<Field, string>>;
}

const EMPTY = { name: '', email: '', message: '', company: '' };

const fieldClasses =
  'w-full rounded-xl border bg-night/50 px-4 py-3 text-sm text-ink transition-colors duration-300 placeholder:text-ink-faint focus:outline-none focus-visible:border-violet-brand/70';

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus('sent');
        setValues(EMPTY);
        return;
      }

      const body = (await response.json().catch(() => ({}))) as ApiError;
      setFieldErrors(body.fields ?? {});
      setFormError(
        body.error ?? 'The message could not be sent. Email me directly and it will reach me.',
      );
      setStatus('error');
    } catch {
      setFormError('The network dropped the request. Email me directly and it will reach me.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center gap-4 rounded-card border border-cyan-brand/30 bg-cyan-brand/[0.06] p-8"
      >
        <CheckCircle2 size={22} aria-hidden="true" className="text-cyan-brand" />
        <div className="space-y-2">
          <p className="font-display text-xl">Message sent</p>
          <p className="text-sm text-ink-muted">
            It has landed in my inbox. I usually reply within a day or two.
          </p>
        </div>
        <Button size="sm" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={cn(fieldClasses, fieldErrors.name ? 'border-red-400/60' : 'border-line')}
          />
        </FormField>

        <FormField id="email" label="Email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={cn(fieldClasses, fieldErrors.email ? 'border-red-400/60' : 'border-line')}
          />
        </FormField>
      </div>

      <FormField id="message" label="Message" error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building?"
          value={values.message}
          onChange={handleChange}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className={cn(
            fieldClasses,
            'resize-y',
            fieldErrors.message ? 'border-red-400/60' : 'border-line',
          )}
        />
      </FormField>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          leading={
            submitting ? (
              <Loader2 size={16} aria-hidden="true" className="animate-spin" />
            ) : (
              <Send size={16} aria-hidden="true" />
            )
          }
        >
          {submitting ? 'Sending' : 'Send message'}
        </Button>
        <a
          href={`mailto:${profile.email}`}
          className="text-sm text-ink-muted underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
        >
          or email directly
        </a>
      </div>

      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {submitting ? 'Sending your message' : ''}
      </p>

      {formError ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/[0.07] p-4 text-sm text-ink"
        >
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-red-400" />
          {formError}
        </p>
      ) : null}
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
