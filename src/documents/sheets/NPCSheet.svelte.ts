import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import type { NimbleNPC } from '../actor/npc.js';

import { SvelteActorSheet } from '#lib/SvelteActorSheet.svelte.js';
import NPCSheetComponent from '../../view/sheets/NPCSheet.svelte';

export default class NPCSheet extends SvelteApplicationMixin(SvelteActorSheet) {
	actorData: Record<string, any>;

	constructor(actor: { document: NimbleNPC }, options = {} as Configuration) {
		// @ts-ignore
		super(
			foundry.utils.mergeObject(options, {
				document: actor.document,
				svelte: {
					document: actor.document,
					component: NPCSheetComponent,
				},
			}),
		);

		this.props = {
			actor: this.document,
			sheet: this,
		};
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet', 'nimble-sheet--npc'],
			window: {
				icon: 'fa-solid fa-ghost',
			},
			position: {
				width: 288,
				height: 'auto' as const,
			},
			actions: {},
		},
		{ inplace: false },
	);
}
