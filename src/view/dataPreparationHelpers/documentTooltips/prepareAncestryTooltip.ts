import prepareAncestryMetadata from '../metaData/prepareAncestryMetadata.js';
import prepareAncestryTooltipTags from './prepareAncestryTooltipTags.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleAncestryItem } from '../../../documents/item/ancestry.js';

export default function prepareAncestryTooltip(ancestry: NimbleAncestryItem): string {
	const metadata = prepareAncestryMetadata(ancestry);

	const components = [
		prepareEmbeddedDocumentTooltipHeader(ancestry, metadata),
		prepareAncestryTooltipTags(ancestry),
		prepareEmbeddedDocumentTooltipDescription(
			ancestry.system?.description || 'No description available.',
			'Ancestry Description',
		),
	];

	return components.filter(Boolean).join('');
}
