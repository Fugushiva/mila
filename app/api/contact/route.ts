import { NextResponse } from "next/server";

/**
 * Contact form submission endpoint.
 *
 * TODO(provider-email): plug a real transactional email provider (Resend recommended).
 *
 * Required steps when wiring it up:
 *   1. Add `resend` to `package.json`
 *   2. Add `RESEND_API_KEY` to env (Vercel project settings)
 *   3. Validate the JSON body server-side with `zod` before sending
 *   4. Send the transactional email + return 204 on success
 *   5. Handle rate-limiting (Vercel KV or Upstash) to prevent abuse
 *
 * Until then, this endpoint returns 503 so the client toast surfaces an honest
 * error rather than silently dropping leads (the bug we are fixing here).
 */

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    !isString(body.name) ||
    !isString(body.email) ||
    !isString(body.message)
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      error: "Email provider not configured.",
      hint: "See app/api/contact/route.ts TODO.",
    },
    { status: 503 },
  );
}
