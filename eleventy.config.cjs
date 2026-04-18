/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  /**
   * URL canônica e Open Graph: em Netlify use `URL` (domínio principal do deploy).
   * Em dev local, cai em localhost com a porta do `eleventy --serve` (8080).
   */
  eleventyConfig.addGlobalData("site", () => {
    const fromEnv = process.env.URL && String(process.env.URL).trim();
    const base =
      fromEnv ||
      `http://localhost:${process.env.ELEVENTY_SERVE_PORT || "8080"}`;
    return {
      url: base.replace(/\/$/, ""),
      /** Caminho absoluto no site; og:image precisa de URL absoluta (base + isto). */
      ogImagePath: "/assets/images/app-icon.png",
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
