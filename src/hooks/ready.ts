import { mount } from 'svelte';

import CombatTracker from '../view/ui/CombatTracker.svelte';

export default function ready() {
	game.nimble.conditions.configureStatusEffects();

	const target = document.body;
	const anchor = document.querySelector('#notifications');

	if (!target || !anchor) return;

	mount(CombatTracker, {
		anchor,
		target,
	});

	const combatTrackerConfig = game.settings.get('core', 'combatTrackerConfig') ?? {};
	combatTrackerConfig.skipDefeated ??= true;
	game.settings.set('core', 'combatTrackerConfig', combatTrackerConfig);
}
