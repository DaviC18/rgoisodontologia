import { existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite";
import { clinica, faq, hero, seo } from "./src/content/site.ts";

const publicDir = fileURLToPath(new URL("./public", import.meta.url));

/** Domínio real definido? Enquanto for TODO, nada que dependa de URL absoluta é publicado. */
const siteUrl = seo.siteUrl.includes("TODO")
  ? null
  : seo.siteUrl.replace(/\/$/, "");
const abs = (path: string) => (siteUrl ? `${siteUrl}${path}` : null);

/** JSON dentro de <script>: escapa "<" para não fechar a tag. */
const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

function dentistSchema() {
  const { endereco } = clinica;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinica.nome,
    alternateName: clinica.nomeGoogle,
    slogan: clinica.slogan,
    description: seo.description,
    telephone: `+55${clinica.telefoneExibicao.replace(/\D/g, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: endereco.lat,
      longitude: endereco.lng,
    },
    hasMap: endereco.mapsUrl,
    openingHoursSpecification: clinica.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [clinica.instagram],
    // sem aggregateRating: nota do Google marcada no próprio site é review autopromovido (SPEC §7)
    ...(siteUrl && {
      url: `${siteUrl}/`,
      image: abs(seo.ogImage),
      logo: abs("/images/logo.webp"),
    }),
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.p,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };
}

/**
 * SEO a partir de site.ts (SPEC §7): title, description, Open Graph, Twitter, JSON-LD,
 * preload da foto do hero, robots.txt e sitemap.xml.
 */
function seoPlugin(): Plugin {
  return {
    name: "rgois-seo",
    transformIndexHtml(html) {
      const meta = (
        attr: "name" | "property",
        key: string,
        content: string,
      ): HtmlTagDescriptor => ({
        tag: "meta",
        attrs: { [attr]: key, content },
        injectTo: "head",
      });
      const heroFoto = hero.fotos.find((f) => existsSync(`${publicDir}${f}`));
      const ogImage = abs(seo.ogImage);

      const tags: HtmlTagDescriptor[] = [
        meta("name", "description", seo.description),
        meta("property", "og:type", "website"),
        meta("property", "og:locale", "pt_BR"),
        meta("property", "og:site_name", clinica.nome),
        meta("property", "og:title", seo.title),
        meta("property", "og:description", seo.description),
        meta("name", "twitter:card", "summary_large_image"),
        meta("name", "twitter:title", seo.title),
        meta("name", "twitter:description", seo.description),
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
          injectTo: "head",
        },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: jsonLd(dentistSchema()),
          injectTo: "head",
        },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: jsonLd(faqSchema()),
          injectTo: "head",
        },
      ];
      if (siteUrl && ogImage) {
        tags.push(
          {
            tag: "link",
            attrs: { rel: "canonical", href: `${siteUrl}/` },
            injectTo: "head",
          },
          meta("property", "og:url", `${siteUrl}/`),
          meta("property", "og:image", ogImage),
          meta("property", "og:image:width", "1200"),
          meta("property", "og:image:height", "630"),
          meta("name", "twitter:image", ogImage),
        );
      }
      if (heroFoto) {
        tags.push({
          tag: "link",
          attrs: {
            rel: "preload",
            as: "image",
            href: heroFoto,
            fetchpriority: "high",
            type: "image/webp",
          },
          injectTo: "head",
        });
      }

      return {
        html: html.replace(/<title>.*<\/title>/, `<title>${seo.title}</title>`),
        tags,
      };
    },
    generateBundle() {
      const robots = [
        "User-agent: *",
        "Allow: /",
        ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
      ];
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `${robots.join("\n")}\n`,
      });
      if (siteUrl) {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`,
        });
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
