export function isPlainObject(obj: unknown): obj is object {
	if (typeof obj !== 'object' || obj === null) return false;

	const proto = Object.getPrototypeOf(obj);
	return proto !== null && Object.getPrototypeOf(proto) === null;
}
