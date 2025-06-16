import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import { SvelteItemSheet } from '#lib/SvelteItemSheet.svelte.js';
import SubclassSheetComponent from '../../view/sheets/SubclassSheet.svelte';

export default class SubclassSheet extends SvelteApplicationMixin(SvelteItemSheet) {
	constructor(item, options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				document: item.document,
				svelte: {
					document: item.document,
					component: SubclassSheetComponent,
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
				icon: 'fa-solid fa-user',
			},
			position: {
				width: 288,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);
}
