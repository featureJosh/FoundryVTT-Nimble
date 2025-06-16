export default function getTooltipPermissions(actorType: string, permissions: number): boolean {
	if (!actorType) return true;
	if (actorType === 'character') return true;

	// If actor permissions are at least "Observer", show the tooltip
	return permissions >= 2;
}
