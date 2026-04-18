# Checklist — fechar 100% do PDF (literal)

Marque `[x]` conforme definir ou implementar. Itens dependem de **decisão de
negócio**, **dados reais** ou **ferramentas externas** à landing estática.

## Decisões de produto e preço

**Fonte única:** `src/_data/lavacash.json` (preço, trial, oferta, reembolso, iOS, escopo). Meta description da home: `src/index.11tydata.js`.

- [x] **Oferta de lançamento:** `launchOffer.active` (hoje `false`). Ao ativar, preencher `formatted`, `reais`, `centavos`, `endsLabel` — a UI de preço e comparativos já alterna automaticamente.
- [x] **Duração do teste:** `trialDays` (hoje **7**). Alterar só no JSON; copy + termos + FAQ acompanham.
- [x] **Reembolso:** `refund.moneyBackAfterPaidSubscription` (hoje `false`). Garantia na landing + cláusula em **Termos §4** alinhadas.
- [x] **iOS:** `ios.badge`, `ios.roadmap`, opcional `ios.waitlistUrl` (link só aparece se não vazio).
- [x] **Escopo / integrações:** seção **#escopo-produto** + listas `productScope.includes` / `excludes`; FAQ linka para ela.

## Métricas reais para a página (substituir placeholders)

- [ ] **Número de negócios/usuários** ativos ou cadastrados (só publicar o que
      puder comprovar)
- [ ] **Avaliações** (média + N), se existirem em loja ou pesquisa interna
- [ ] **Urgência honesta**: vagas reais em onboarding, turmas, ou prazo de
      campanha — só se for verdade
- [ ] Atualizar **tabela comparativa** com preços/nomes de concorrentes
      **conferidos** (evitar achismo)

## Assets e demo

- [ ] **3–4 telas** ou vídeos curtos cobrindo o fluxo completo (registro →
      relatório → histórico), se faltar cobertura
- [ ] **Vídeo demo ~30s** (roteiro do PDF) como arquivo único opcional (além dos
      loops atuais)
- [ ] **Antes/depois** visual mais forte (foto mock do caderno vs app), se
      quiser mais impacto que texto

## Confiança e compliance

- [ ] Revisar texto **LGPD/backup/criptografia** com o que o produto
      **realmente** faz (jurídico/técnico)
- [ ] Garantir **política de privacidade** e **termos** alinhados ao que a
      landing promete

## Formulário e remarketing

- [ ] Confirmar no Netlify (ou host) que o form **lead-lavacash** aparece e
      entrega notificações
- [ ] Definir **sequência de e-mails** pós-cadastro (ferramenta externa: RD,
      Mailchimp, etc.)
- [x] Opcional: **popup** de e-mail — `partials/lead-popup.njk` + `modules/lead-popup.js` (`POPUP_TIMING` + `POPUP_STORAGE_VERSION` em `lead-popup.js`). Form Netlify: `lead-lavacash-popup`. **Testar de novo:** abrir `/?reset-popup=1` (limpa `lc-lead-popup-*` e tira o query da barra).

## Testes A/B e analytics

- [ ] Escolher ferramenta (**Netlify Split Testing**, **Google Optimize**
      sucessor, **VWO**, script próprio, etc.)
- [ ] Definir **variantes** mínimas: headline, CTA, bloco de urgência
- [ ] Instalar **analytics** (Plausible, GA4, etc.) e eventos de conversão
      (clique WhatsApp, submit form)

## Itens do PDF não obrigatórios para “literal”

- [ ] Programa de **indicação** / Instagram / chatbot — só se forem escopo

---

**Última revisão:** preencher datas e responsáveis aqui embaixo.

| Item              | Responsável | Data |
| ----------------- | ----------- | ---- |
| Preço/oferta      |             |      |
| Métricas públicas |             |      |
| Vídeo 30s         |             |      |
| A/B               |             |      |
