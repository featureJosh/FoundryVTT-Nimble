export default function registerPredicateConfig() {
	const PREDICATE_KEY_CONFIG_MAPPING = {
		size: {
			tiny: 0,
			small: 1,
			medium: 2,
			large: 3,
			huge: 4,
			gargantuan: 5,
		},
	} as const;

	return { PREDICATE_KEY_CONFIG_MAPPING };
}
