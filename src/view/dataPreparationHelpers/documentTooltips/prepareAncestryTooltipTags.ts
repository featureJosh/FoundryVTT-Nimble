import type { NimbleAncestryItem } from '../../../documents/item/ancestry.js';

import prepareEmbeddedDocumentTooltipTags from './prepareEmbeddedDocumentTooltipTags.js';

export default function prepareAncestryTooltipTags(ancestry: NimbleAncestryItem): string | null {
	const tags: TooltipTag[] = [];

	if (ancestry?.system.exotic) tags.push({ label: 'Exotic Ancestry' });

	return prepareEmbeddedDocumentTooltipTags(tags);
}
