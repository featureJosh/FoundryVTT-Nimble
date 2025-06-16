import type { HealingNode } from '#types/effectTree.js';

export function createHealingNode(
	parentNode: string | null = null,
	context: string | null = null,
): HealingNode {
	return {
		id: foundry.utils.randomID(),
		type: 'healing',
		healingType: 'healing',
		formula: '',
		parentContext: context,
		parentNode,
	};
}
