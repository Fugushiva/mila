"use client";

import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type ContactFormProps = {
  locale: Locale;
  dict: Dictionary["contact"]["form"];
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ locale, dict }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedSubject = values.subject.trim();
    const trimmedMessage = values.message.trim();

    if (!trimmedName) {
      nextErrors.name = dict.fields.name.required;
    }

    if (!trimmedEmail) {
      nextErrors.email = dict.fields.email.required;
    } else if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = dict.fields.email.invalid;
    }

    if (!trimmedSubject) {
      nextErrors.subject = dict.fields.subject.required;
    }

    if (!trimmedMessage) {
      nextErrors.message = dict.fields.message.required;
    }

    if (!values.consent) {
      nextErrors.consent = dict.fields.consent.required;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: values.phone.trim(),
      subject: trimmedSubject,
      message: trimmedMessage,
      consent: values.consent,
    };

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 800);
      });

      console.log("ContactForm submission:", payload);
      toast.success(dict.successTitle, {
        description: dict.successDescription,
      });
      setValues(initialValues);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      lang={locale}
      className="rounded-2xl border border-border bg-surface p-6 shadow-md md:p-10"
    >
      <div>
        <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
          {dict.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium text-primary md:text-3xl">
          {dict.title}
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
          {dict.intro}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <Label htmlFor="name" required>
            {dict.fields.name.label}
          </Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={dict.fields.name.placeholder}
            autoComplete="name"
            error={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p
              id="name-error"
              role="alert"
              className="mt-1.5 font-sans text-sm text-red-600"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="email" required>
            {dict.fields.email.label}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder={dict.fields.email.placeholder}
            autoComplete="email"
            error={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 font-sans text-sm text-red-600"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="phone">{dict.fields.phone.label}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder={dict.fields.phone.placeholder}
            autoComplete="tel"
          />
        </div>

        <div>
          <Label htmlFor="subject" required>
            {dict.fields.subject.label}
          </Label>
          <Select
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            error={!!errors.subject}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <option value="">{dict.fields.subject.placeholder}</option>
            {Object.entries(dict.fields.subject.options).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors.subject ? (
            <p
              id="subject-error"
              role="alert"
              className="mt-1.5 font-sans text-sm text-red-600"
            >
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="message" required>
            {dict.fields.message.label}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={dict.fields.message.placeholder}
            error={!!errors.message}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="mt-1.5 font-sans text-sm text-red-600"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              name="consent"
              checked={values.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <div className="flex-1">
              <Label htmlFor="consent" required className="mb-0 leading-relaxed">
                {dict.fields.consent.label}
              </Label>
              {errors.consent ? (
                <p
                  id="consent-error"
                  role="alert"
                  className="mt-1.5 font-sans text-sm text-red-600"
                >
                  {errors.consent}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? dict.submitting : dict.submit}
        </Button>
      </form>
    </div>
  );
}
