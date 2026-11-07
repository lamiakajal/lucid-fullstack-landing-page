/**
 * Renders schema.org structured data (JSON-LD) so search engines can connect
 * this website with its author, Lamia Kajal.
 */
export default function JsonLd({ siteUrl, authorName, authorUrl, description }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
        url: siteUrl,
        sameAs: [authorUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `Lucid by ${authorName}`,
        description,
        inLanguage: "en",
        author: { "@id": `${siteUrl}/#person` },
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `Lucid Landing Page | Full-Stack Next.js Project by ${authorName}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
