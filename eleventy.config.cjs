/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("stripHtml", (content) => {
    if (!content || typeof content !== "string") {
      return "";
    }
    return content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  });
  /**
   * Formata ISO 8601 para data em pt-BR (America/Sao_Paulo).
   * @param {string} iso
   */
  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value ?? null));
  eleventyConfig.addFilter("formatDateBR", (iso) => {
    if (!iso || typeof iso !== "string") {
      return "";
    }
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return "";
    }
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    });
  });
  /**
   * URL canônica e Open Graph: em Netlify use `URL` (domínio principal do deploy).
   * Em dev local, cai em localhost com a porta do `eleventy --serve` (8080).
   * OG_IMAGE_PATH opcional (ex.: /assets/images/og-share.png) — default: poster do vídeo.
   */
  eleventyConfig.addGlobalData("site", () => {
    const fromEnv = process.env.URL && String(process.env.URL).trim();
    const base =
      fromEnv ||
      `http://localhost:${process.env.ELEVENTY_SERVE_PORT || "8080"}`;
    const ogFromEnv =
      process.env.OG_IMAGE_PATH && String(process.env.OG_IMAGE_PATH).trim();
    return {
      url: base.replace(/\/$/, ""),
      ogImagePath: ogFromEnv || "/assets/images/hero-video-poster.webp",
      ogImageAlt:
        "LavaCash — app para lava-jato: atendimentos e relatórios no celular",
      twitterSite:
        process.env.TWITTER_SITE && String(process.env.TWITTER_SITE).trim(),
    };
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "src/videos": "videos",
  });
  eleventyConfig.setServerOptions({ showAllHosts: true });
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    htmlTemplateEngine: "njk",
  };
};
