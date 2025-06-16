import prepareClassMetadata from '../metaData/prepareClassMetadata.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleClassItem } from '../../../documents/item/class.js';

export default function prepareAncestryTooltip(characterClass: NimbleClassItem): string {
	const metadata = prepareClassMetadata(characterClass);

	const components = [
		prepareEmbeddedDocumentTooltipHeader(characterClass, metadata),
		prepareEmbeddedDocumentTooltipDescription(
			characterClass.system?.description || 'No description available.',
			'Class Description',
		),
	];

	return components.filter(Boolean).join('');
}
