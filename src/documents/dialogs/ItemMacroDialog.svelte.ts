import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import ItemMacroDialogComponent from '../../view/dialogs/ItemMacroDialog.svelte';

const { ApplicationV2 } = foundry.applications.api;

export default class CheckRollDialog extends SvelteApplicationMixin(ApplicationV2) {
	constructor(item, data = {}, options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				document: item,
				svelte: {
					document: item,
					component: ItemMacroDialogComponent,
				},
				window: {
					title: `${item.name}: Macro Configuration`,
				},
			}),
		);

		this.props = {
			item,
			dialog: this,
			...data,
		};
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet'],
			window: {
				icon: 'fa-solid fa-terminal',
			},
			position: {
				width: 576,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);
}
