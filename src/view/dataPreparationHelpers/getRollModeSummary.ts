export function getRollModeSummary(rollMode: number): string | null {
	if (rollMode >= 1) return `Advantage × ${rollMode}`;

	if (rollMode <= -1) {
		return `Disadvantage × ${Math.abs(rollMode)}`;
	}

	return null;
}
