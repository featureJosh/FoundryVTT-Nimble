import prepareBoonMetadata from '../metaData/prepareBoonMetadata.js';
import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';

import type { NimbleBoonItem } from '../../../documents/item/boon.js';

export default function prepareBoonTooltip(boon: NimbleBoonItem): string {
	const components: (string | null)[] = [];
	const metadata = prepareBoonMetadata(boon);

	components.push(
		prepareEmbeddedDocumentTooltipHeader(boon, metadata),
		prepareEmbeddedDocumentTooltipDescription(
			boon.system?.description || 'No description available.',
			'Boon Description',
		),
	);

	return components.filter(Boolean).join('');
}
