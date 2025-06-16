import { SystemSettings } from './SystemSettings.js';

export default function registerSystemSettings() {
	game.settings.registerMenu('nimble', 'SystemSettings', {
		name: 'System Settings',
		label: 'Configure System Settings',
		icon: 'fas fa bars',
		// @ts-expect-error
		type: SystemSettings,
		restricted: false,
	});
}
