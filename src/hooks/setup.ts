import registerKeybindings from '../registerKeyBindings.js';
import registerSystemSettings from '../settings/index.js';
import { preparePackIndexes } from '../utils/preparePackIndexes.js';

export default function setup() {
	preparePackIndexes();
	registerKeybindings();
	registerSystemSettings();

	game.nimble.conditions.initialize();
}
