import type { DeepPartial } from '@league-of-foundry-developers/foundry-vtt-types/src/types/utils.d.mts';
import { SvelteApplicationMixin } from '#lib/SvelteApplicationMixin.svelte.js';

import ActorCreationDialogComponent from '../../view/dialogs/ActorCreationDialog.svelte';
import CharacterCreationDialog from './CharacterCreationDialog.svelte.js';

const { ApplicationV2 } = foundry.applications.api;

export default class ActorCreationDialog extends SvelteApplicationMixin(ApplicationV2) {
	declare data: any;

	declare parent: any;

	declare pack: any;

	constructor(data = {}, { parent = null, pack = null, types, ...options } = {}) {
		super(
			foundry.utils.mergeObject(options, {
				svelte: {
					component: ActorCreationDialogComponent,
				},
				window: {
					title: 'Create Actor',
				},
			}),
		);

		this.data = data;
		this.parent = parent;
		this.pack = pack;
		// this.options = foundry.utils.mergeObject(this.options, options, { overwrite: false });
		this.props = { dialog: this };
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet'],
			window: {
				icon: 'fa-solid fa-user',
			},
			position: {
				width: 508,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);

	async submit(actorType: string) {
		const { documentClasses } = CONFIG.NIMBLE.Actor;

		if (actorType === 'character') {
			const characterCreationDialog = new CharacterCreationDialog();
			characterCreationDialog.render(true);
		} else {
			documentClasses[actorType].create(
				{ name: 'New Actor', type: actorType, ...this.data },
				{ pack: this.pack, parent: this.parent, renderSheet: true },
			);
		}

		return super.close();
	}

	override async close(options?: DeepPartial<SvelteApplicationMixin.ClosingOptions>) {
		return super.close(options);
	}
}
