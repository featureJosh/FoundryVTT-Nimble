import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import { SvelteActorSheet } from '#lib/SvelteActorSheet.svelte.js';
import PlayerCharacterSheetComponent from '../../view/sheets/PlayerCharacterSheet.svelte';

import type { NimbleCharacter } from '../actor/character.js';

export default class PlayerCharacterSheet extends SvelteApplicationMixin(SvelteActorSheet) {
	constructor(actor: { document: NimbleCharacter }, options = {} as Configuration) {
		// @ts-ignore
		super(
			foundry.utils.mergeObject(options, {
				document: actor.document,
				svelte: {
					document: actor.document,
					component: PlayerCharacterSheetComponent,
				},
			}),
		);

		this.props = {
			actor: this.document,
			sheet: this,
		};
	}

	// @ts-ignore
	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet', 'nimble-sheet--player-character'],
			window: {
				icon: 'fa-solid fa-user',
			},
			position: {
				width: 336,
				height: 'auto' as const,
			},
			actions: {},
		},
		{ inplace: false },
	);
}
