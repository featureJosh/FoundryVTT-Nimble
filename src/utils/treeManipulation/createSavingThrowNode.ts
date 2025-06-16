import type { SavingThrowNode } from '#types/effectTree.js';

export function createSavingThrowNode(
	parentNode: string | null = null,
	context: string | null = null,
): SavingThrowNode {
	return {
		id: foundry.utils.randomID(),
		type: 'savingThrow',
		savingThrowType: 'strength',
		sharedRolls: [],
		on: {},
		parentContext: context,
		parentNode,
	};
}
