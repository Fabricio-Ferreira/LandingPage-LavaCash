/**
 * Defina GA4_MEASUREMENT_ID e META_PIXEL_ID no Netlify (Site settings → Environment).
 * Build local: export antes de `npm run build` ou use .env com ferramenta compatível.
 */
module.exports = () => ({
  ga4Id: process.env.GA4_MEASUREMENT_ID
    ? String(process.env.GA4_MEASUREMENT_ID).trim()
    : "",
  metaPixelId: process.env.META_PIXEL_ID
    ? String(process.env.META_PIXEL_ID).trim()
    : "",
});
