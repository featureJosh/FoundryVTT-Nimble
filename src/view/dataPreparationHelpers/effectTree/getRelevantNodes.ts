import type { EffectNode } from '#types/effectTree.js';
import { findNodesByContexts } from '../../../utils/treeManipulation/findNodesByContexts.js';
import { groupNodes } from './groupNodes.js';
import { processNodes } from './processNodes.js';

export function getRelevantNodes(
	effects: EffectNode[],
	contexts: string[],
	fullTree: EffectNode[] | null = null,
): EffectNode[][] {
	const relevantNodes = findNodesByContexts(effects, contexts);

	// The full tree must be used here if possible to ensure the locate parent rolls.
	const processedNodes = processNodes(fullTree ?? effects, relevantNodes);
	const groupedNodes = groupNodes(processedNodes);

	return groupedNodes;
}
