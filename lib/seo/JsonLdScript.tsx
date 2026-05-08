import "server-only";

type JsonLdProps = {
  data: object | object[];
};

/**
 * Render JSON-LD as a `<script type="application/ld+json">` tag using
 * `dangerouslySetInnerHTML` (per Next.js docs). The `<` escape protects
 * against any string content that might break out of the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
