<script>
import { getContext } from 'svelte';

import Editor from '../components/Editor.svelte';
import SecondaryNavigation from '../../components/SecondaryNavigation.svelte';

const subNavigation = [
	{
		component: DescriptionTab,
		label: 'Base Effect',
		name: 'baseEffect',
	},
	{
		component: HigherLevelDescriptionTab,
		label: 'Higher Level Effect',
		name: 'higherLevelEffect',
	},
];

let item = getContext('document');
let currentTab = $state(subNavigation[0]);
</script>

{#snippet DescriptionTab()}
    {#key item.reactive.system.description.baseEffect}
        <header class="nimble-section-header">
            <h3 class="nimble-heading" data-heading-variant="section">
                Base Spell Effect
            </h3>
        </header>

        <Editor
            field="system.description.baseEffect"
            content={item.reactive.system.description.baseEffect}
            document={item}
        />
    {/key}
{/snippet}

{#snippet HigherLevelDescriptionTab()}
    {#key item.reactive.system.description.higherLevelEffect}
        <header class="nimble-section-header">
            <h3 class="nimble-heading" data-heading-variant="section">
                Higher Level Effect
            </h3>
        </header>

        <Editor
            field="system.description.higherLevelEffect"
            content={item.reactive.system.description.higherLevelEffect}
            document={item}
        />
    {/key}
{/snippet}

<SecondaryNavigation bind:currentTab {subNavigation} />

<section class="nimble-sheet__body nimble-sheet__body--item">
    {@render currentTab?.component?.()}
</section>
