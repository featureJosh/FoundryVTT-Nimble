import type { NimbleBoonData } from '../../models/item/BoonDataModel.js';

import { NimbleBaseItem } from './base.svelte.js';

export class NimbleBoonItem extends NimbleBaseItem {
	declare system: NimbleBoonData;

	override async prepareChatCardData() {
		return {
			author: game.user?.id,
			flavor: `${this.actor?.name}: ${this.name}`,
			type: 'feature',
			system: {
				description: this.system.description || 'No description available.',
				featureType: this.type,
				name: this.name,
			},
		};
	}
}
