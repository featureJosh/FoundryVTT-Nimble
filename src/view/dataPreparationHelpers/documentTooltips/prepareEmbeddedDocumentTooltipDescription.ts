// eslint-disable-next-line max-len
export default function prepareEmbeddedDocumentTooltipDescription(
	source: string | undefined,
	heading,
): string | null {
	if (!source) return null;

	return `<section>
    <header>
      <h4 class="nimble-heading" data-heading-variant="section">
        ${heading}
      </h4>

      <div class="nimble-tooltip__description-wrapper">
        ${source}
      </div>
  </section>`;
}
