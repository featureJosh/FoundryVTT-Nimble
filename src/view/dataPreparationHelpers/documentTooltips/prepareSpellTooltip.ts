import prepareEmbeddedDocumentTooltipDescription from './prepareEmbeddedDocumentTooltipDescription.js';
import prepareEmbeddedDocumentTooltipHeader from './prepareEmbeddedDocumentTooltipHeader.js';
import prepareSpellMetadata from '../metaData/prepareSpellMetadata.js';
import prepareSpellTooltipTags from './prepareSpellTooltipTags.js';

import type { NimbleSpellItem } from '../../../documents/item/spell.js';

export default function prepareSpellTooltip(spell: NimbleSpellItem): string {
	const metadata = prepareSpellMetadata(spell, true);
	const properties = spell?.system?.properties?.selected ?? [];

	const components = [
		prepareEmbeddedDocumentTooltipHeader(spell, metadata),
		prepareSpellTooltipTags(spell),
		prepareEmbeddedDocumentTooltipDescription(
			spell.system?.description?.baseEffect || 'No description available.',
			'Spell Description',
		),
		prepareEmbeddedDocumentTooltipDescription(
			properties.includes('utilitySpell') ? '' : spell.system?.description?.higherLevelEffect,
			spell?.system?.tier > 0 ? 'Upcast' : 'Higher Level Effect',
		),
	];

	return components.filter(Boolean).join('');
}
