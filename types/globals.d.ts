import type { NIMBLE } from '../src/config.js';
import type { NIMBLE_GAME } from '../src/game.js';

declare global {
	interface AssumeHookRan {
		init: never;
	}

	interface AssumeHookRan {
		setup: never;
	}

	interface AssumeHookRan {
		ready: never;
	}

	interface CONFIG {
		NIMBLE: typeof NIMBLE;
	}

	interface Game {
		nimble: typeof NIMBLE_GAME;
	}
}

export default (something = {});
