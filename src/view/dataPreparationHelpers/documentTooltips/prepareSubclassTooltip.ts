import prepareSubclassMetadata from '../metaData/prepareSubclassMetadata.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleSubclassItem } from '../../../documents/item/subclass.js';

export default function prepareAncestryTooltip(subclass: NimbleSubclassItem): string {
	const metadata = prepareSubclassMetadata(subclass);

	const components = [
		prepareEmbeddedDocumentTooltipHeader(subclass, metadata),
		prepareEmbeddedDocumentTooltipDescription(
			subclass.system?.description || 'No description available.',
			'Subclass Description',
		),
	];

	return components.filter(Boolean).join('');
}
