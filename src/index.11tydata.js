/**
 * Meta description alinhada a `src/_data/lavacash.json`.
 */
module.exports = {
  eleventyComputed: {
    description(data) {
      const L = data.lavacash;
      if (!L) {
        return "LavaCash — controle de atendimentos para lava-jato.";
      }
      const priceLine = L.launchOffer.active
        ? `R$${L.launchOffer.formatted}/mês (oferta)`
        : `R$${L.priceMonthly.formatted}/mês`;
      return `Lucro e atendimentos com clareza. ${priceLine} · ${L.trialDays} dias grátis sem cartão · Android (${L.ios.badge}).`;
    },
  },
};
