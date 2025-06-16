import prepareFeatureMetadata from '../metaData/prepareFeatureMetadata.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleFeatureItem } from '../../../documents/item/feature.js';

export default function prepareFeatureTooltip(feature: NimbleFeatureItem): string {
	const metadata = prepareFeatureMetadata(feature);

	const components = [
		prepareEmbeddedDocumentTooltipHeader(feature, metadata),
		prepareEmbeddedDocumentTooltipDescription(
			feature.system?.description || 'No description available.',
			'Feature Description',
		),
	];

	return components.filter(Boolean).join('');
}
