import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import { SvelteItemSheet } from '#lib/SvelteItemSheet.svelte.js';

import BackgroundSheetComponent from '../../view/sheets/BackgroundSheet.svelte';

export default class BackgroundSheet extends SvelteApplicationMixin(SvelteItemSheet) {
	constructor(item, options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				document: item.document,
				svelte: {
					document: item.document,
					component: BackgroundSheetComponent,
				},
			}),
		);

		this.props = {
			item: this.document,
			sheet: this,
		};
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet'],
			window: {
				icon: 'fa-solid fa-building-columns',
			},
			position: {
				width: 288,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);

	async toggleBackgroundCategoryOption(selectedCategory: string): Promise<void> {
		await this.document.update({ 'system.category': selectedCategory });
	}
}
