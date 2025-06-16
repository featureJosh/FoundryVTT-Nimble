import { mount } from 'svelte';
import NimbleTokenHUD from '../view/pixi/NimbleTokenHUD.svelte';

export default function renderNimbleTokenHUD(HUD, html, token) {
	const target = $(html).find('.status-effects')[0];
	if (!target) return;

	target.innerHTML = '';
	HUD._svelteComponent = mount(NimbleTokenHUD, {
		target,
		props: { HUD, token },
	});
}
