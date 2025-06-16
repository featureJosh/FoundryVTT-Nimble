import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import { SvelteItemSheet } from '#lib/SvelteItemSheet.svelte.js';
import SpellSheetComponent from '../../view/sheets/SpellSheet.svelte';

export default class SpellSheet extends SvelteApplicationMixin(SvelteItemSheet) {
	constructor(item, options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				document: item.document,
				svelte: {
					document: item.document,
					component: SpellSheetComponent,
				},
			}),
		);

		this.props = {
			item: item.document,
			sheet: this,
		};
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet', 'nimble-sheet--spell'],
			window: {
				icon: 'fa-solid fa-hand-sparkles',
			},
			position: {
				width: 288,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);

	async toggleSpellSchoolOption(selectedSchool: string | number): Promise<void> {
		if (typeof selectedSchool === 'number') return;

		await this.document.update({
			'system.school': this.document.system.school === selectedSchool ? '' : selectedSchool,
		});
	}

	async toggleSpellTierOption(selectedTier: string | number): Promise<void> {
		if (typeof selectedTier === 'string') selectedTier = Number.parseInt(selectedTier, 10);
		await this.document.update({ 'system.tier': selectedTier });
	}

	async toggleSpellPropertyOption(selectedProperty: string): Promise<void> {
		const selectedProperties = new Set(this.document.system.properties.selected);

		if (selectedProperties.has(selectedProperty)) selectedProperties.delete(selectedProperty);
		else {
			if (selectedProperty === 'range' && selectedProperties.has('reach')) {
				selectedProperties.delete('reach');
			}

			if (selectedProperty === 'reach' && selectedProperties.has('range')) {
				selectedProperties.delete('range');
			}

			selectedProperties.add(selectedProperty);
		}

		await this.document.update({ 'system.properties.selected': selectedProperties });
	}
}
