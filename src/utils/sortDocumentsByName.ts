import type { NimbleBaseItem } from '../documents/item/base.svelte.js';

export default function sortDocumentsByName<T extends NimbleBaseItem>(documents: T[]): T[] {
	return documents.sort((a, b) => {
		const strippedA = a?.name?.replace(/\(|\)/g, '')?.trim();
		const strippedB = b?.name?.replace(/\(|\)/g, '')?.trim();

		return strippedA.localeCompare(strippedB);
	});
}
