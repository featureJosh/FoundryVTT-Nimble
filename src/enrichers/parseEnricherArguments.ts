export default function parseEnricherArguments(argString: string): Record<string, any> {
	const args = argString.toLowerCase().split(' ').filter(Boolean);

	const structured = args.reduce((acc, curr) => {
		const [key, value] = curr.split('=').map((a) => a.trim());
		acc[key] = Number.isNumeric(value) ? Number.parseInt(value, 10) : value;

		return acc;
	}, {});

	return structured;
}
