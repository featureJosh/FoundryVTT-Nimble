import type { NimbleObjectItem } from '../../../documents/item/object.js';

export default function prepareObjectMetadata(item: NimbleObjectItem): string {
	const { objectTypes } = CONFIG.NIMBLE;

	return objectTypes[item?.system?.objectType] || '';
}
