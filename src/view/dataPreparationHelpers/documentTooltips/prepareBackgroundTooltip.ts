import prepareBackgroundMetadata from '../metaData/prepareBackgroundMetadata.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleBackgroundItem } from '../../../documents/item/background.js';

export default function prepareBackgroundTooltip(background: NimbleBackgroundItem): string {
	const metadata = prepareBackgroundMetadata(background);

	const components = [
		prepareEmbeddedDocumentTooltipHeader(background, metadata),
		prepareEmbeddedDocumentTooltipDescription(
			background.system?.description || 'No description available.',
			'Background Description',
		),
	];

	return components.filter(Boolean).join('');
}
