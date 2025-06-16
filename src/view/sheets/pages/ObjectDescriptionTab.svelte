<script>
import { getContext } from 'svelte';

import Editor from '../components/Editor.svelte';
import SecondaryNavigation from '../../components/SecondaryNavigation.svelte';

const subNavigation = [
	{
		component: DescriptionTab,
		label: 'Base',
		name: 'baseDescription',
	},
	{
		component: UnidentifiedDescription,
		label: 'Unidentified',
		name: 'unidentifiedDescription',
	},
	{
		component: SecretDescriptionTab,
		label: 'Secret',
		name: 'secretDescription',
	},
];

let item = getContext('document');
let currentTab = $state(subNavigation[0]);
</script>

{#snippet DescriptionTab()}
    {#key item.reactive.system.description.public}
        <header class="nimble-sheet-section-header">
            <h3 class="nimble-heading" data-heading-variant="section">
                Description
            </h3>
        </header>

        <Editor
            field="system.description.public"
            content={item.reactive.system.description.public}
            document={item}
        />
    {/key}
{/snippet}

{#snippet SecretDescriptionTab()}
    {#key item.reactive.system.description.secret}
        <header class="nimble-sheet-section-header">
            <h3 class="nimble-heading" data-heading-variant="section">
                Secret Notes
            </h3>
        </header>

        <Editor
            field="system.description.secret"
            content={item.reactive.system.description.secret}
            document={item}
        />
    {/key}
{/snippet}

{#snippet UnidentifiedDescription()}
    {#key item.reactive.system.description.unidentified}
        <header class="nimble-sheet-section-header">
            <h3 class="nimble-heading" data-heading-variant="section">
                Unidentified Description
            </h3>
        </header>

        <Editor
            field="system.description.unidentified"
            content={item.reactive.system.description.unidentified}
            document={item}
        />
    {/key}
{/snippet}

<SecondaryNavigation bind:currentTab {subNavigation} />

<section class="nimble-sheet__body">
    {@render currentTab?.component?.()}
</section>
