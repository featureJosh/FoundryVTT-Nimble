import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import SystemSettingsDialog from '../view/dialogs/SystemSettingsDialog.svelte';

const { ApplicationV2 } = foundry.applications.api;

export class SystemSettings extends SvelteApplicationMixin(ApplicationV2) {
	constructor(options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				svelte: {
					component: SystemSettingsDialog,
				},
			}),
		);

		this.props = {
			dialog: this,
		};
	}

	static DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			id: `app-${Math.random().toString(36).substring(2, 9)}`,
			title: 'Configure System Settings',
			classes: ['nimble-sheet'],
			window: {
				icon: 'fa-solid fa-cog',
			},
			position: {
				width: 640,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);

	getSettings() {
		const allSettings = game.settings.settings;
		const nimbleSettings = [...allSettings].filter(([id]) => id.startsWith('nimble.'));

		return new Map(nimbleSettings);
	}
}
