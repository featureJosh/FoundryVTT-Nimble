import { unmount } from 'svelte';

export class NimbleTokenHUD extends TokenHUD {
	declare _svelteComponent;

	override getData(options: ApplicationOptions) {
		const data = foundry.utils.mergeObject(super.getData(options), {});

		return data;
	}

	override clear() {
		super.clear();

		if (this._svelteComponent) {
			unmount(this._svelteComponent);
			this._svelteComponent = null;
		}
	}
}
