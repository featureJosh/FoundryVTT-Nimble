import { NimbleTokenHUD } from '../pixi/NimbleTokenHUD.js';

export default function canvasInit() {
	// @ts-expect-error
	game.canvas.hud.token = new NimbleTokenHUD();
}
