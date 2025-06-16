<script>
import { getContext } from 'svelte';
import { getRelevantNodes } from '../../dataPreparationHelpers/effectTree/getRelevantNodes.js';
import { getNodeComponent } from '../../dataPreparationHelpers/effectTree/getNodeComponent.js';

function getContexts() {
	const contexts = [];

	if (isCritical) contexts.push('criticalHit', 'hit');
	else if (isMiss) contexts.push('miss');
	else contexts.push('hit');

	return contexts;
}

let messageDocument = getContext('messageDocument');
let { activation, isCritical, isMiss } = $derived(messageDocument.reactive.system);
let effects = $derived(activation.effects);
</script>

{#each getRelevantNodes(effects, getContexts()) as nodeGroup}
    {#if nodeGroup.length}
        <section
            class="nimble-card-section"
            class:nimble-card-section--conditions={nodeGroup.find(node => node.type === 'condition')}
        >
            {#each nodeGroup as node}
                {@const Component = getNodeComponent(node.type)}

                {#if node.type === 'condition'}
                    <Component {node}/>
                {:else}
                    <section class="nimble-effect">
                        <Component {node}/>
                    </section>
                {/if}
            {/each}
        </section>
    {/if}
{:else}
    <section class="nimble-card-section">
        <p>No Effect</p>
    </section>
{/each}

<style lang="scss">
    .nimble-effect {
        --nimble-hint-block-end-margin: 0;

        padding: 0.5rem;

        &:not(:last-of-type) {
            padding-bottom: 0;
        }
    }

    .nimble-card-section {
        padding: var(--nimble-card-section-padding, 0);

        &:not(:last-of-type) {
            border-bottom: 1px solid var(--nimble-card-border-color);
        }

        &--conditions {
            display: flex;
            gap: 0.375rem;
            flex-wrap: wrap;
            padding: 0.5rem;
        }
    }
</style>
