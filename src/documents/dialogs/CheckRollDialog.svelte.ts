import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.js';
import CheckRollDialogComponent from '../../view/dialogs/CheckRollDialog.svelte';

const { ApplicationV2 } = foundry.applications.api;

export default class CheckRollDialog extends SvelteApplicationMixin(ApplicationV2) {
	declare promise: Promise<any>;

	declare resolve: any;

	constructor(actor, title, data = {}, options = {} as Configuration) {
		super(
			foundry.utils.mergeObject(options, {
				document: actor,
				svelte: {
					document: actor,
					component: CheckRollDialogComponent,
				},
				window: {
					title,
				},
			}),
		);

		this.props = {
			actor,
			dialog: this,
			...data,
		};

		this.promise = new Promise((resolve) => {
			this.resolve = resolve;
		});
	}

	static override DEFAULT_OPTIONS = foundry.utils.mergeObject(
		super.DEFAULT_OPTIONS,
		{
			classes: ['nimble-sheet'],
			window: {
				icon: 'fa-solid fa-dice-d20',
			},
			position: {
				width: 576,
				height: 'auto',
			},
			actions: {},
		},
		{ inplace: false },
	);

	async submit(results) {
		this.#resolvePromise(results);
		return super.close();
	}

	override async close(options) {
		this.#resolvePromise(null);
		return super.close(options);
	}

	#resolvePromise(data) {
		if (this.resolve) {
			this.resolve(data);
		}
	}
}
