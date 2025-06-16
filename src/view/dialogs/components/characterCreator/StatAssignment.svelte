<script>
import { getContext } from 'svelte';
import generateBlankAttributeSet from '../../../../utils/generateBlankAttributeSet.js';
import replaceHyphenWithMinusSign from '../../../dataPreparationHelpers/replaceHyphenWithMinusSign.js';

import Hint from '../../../components/Hint.svelte';

function handleAbilityModifierDrop(event, abilityKey) {
	const modifierIndex = Number.parseInt(event.dataTransfer.getData('modifier'), 10);

	const existingModifier = Object.entries(tempSelectedAbilityScores).find(
		([_, value]) => value === modifierIndex,
	);

	if (existingModifier) {
		const [previousKey] = existingModifier;

		tempSelectedAbilityScores[previousKey] = tempSelectedAbilityScores[abilityKey];
	}

	tempSelectedAbilityScores[abilityKey] = modifierIndex;
}

function lockInStatAssignment() {
	selectedAbilityScores = tempSelectedAbilityScores;
}

const { abilityScores } = CONFIG.NIMBLE;
const abilityScoreCount = Object.keys(abilityScores).length;
const CHARACTER_CREATION_STAGES = getContext('CHARACTER_CREATION_STAGES');
const dialog = getContext('dialog');

const hintText =
	'Below you will find the stat bonuses granted by your selected array. Drag and drop each of these values onto one of the attribute boxes below to assign your ability scores.';

let {
	active,
	bonusLanguages = $bindable(),
	selectedArray,
	selectedAbilityScores = $bindable(),
} = $props();

let tempSelectedAbilityScores = $state(generateBlankAttributeSet());

let allStatsSelected = $derived(
	Object.values(tempSelectedAbilityScores).every((value) => value !== null),
);

let statsLockedIn = $derived(Object.values(selectedAbilityScores).every((value) => value !== null));

$effect(() => {
	selectedAbilityScores;

	tempSelectedAbilityScores = generateBlankAttributeSet();
	bonusLanguages = [];
});
</script>

<section
    id="{dialog.id}-stage-{CHARACTER_CREATION_STAGES.STATS}"
    style="--abilityScoreCount: {abilityScoreCount};"
>
    <header
        class="nimble-section-header"
        data-header-variant="character-creator"
    >
        <h3 class="nimble-heading" data-heading-variant="section">
            Step 5. Assign Ability Scores

            {#if !active && !Object.values(selectedAbilityScores).some((mod) => mod === null)}
                <button
                    class="nimble-button"
                    data-button-variant="icon"
                    aria-label="Edit Stats"
                    data-tooltip="Edit Stats"
                    onclick={() =>
                        (selectedAbilityScores = generateBlankAttributeSet())}
                >
                    <i class="fa-solid fa-edit"></i>
                </button>
            {/if}
        </h3>
    </header>

    {#if active}
        <Hint {hintText} />

        <ul class="nimble-ability-score-list" role="list">
            {#each Object.entries(tempSelectedAbilityScores) as [abilityKey, arrayIndex]}
                <li
                    class="nimble-cc-ability-score"
                    ondrop={(event) =>
                        handleAbilityModifierDrop(event, abilityKey)}
                >
                    <header class="nimble-cc-ability-score__header">
                        <h4
                            class="nimble-heading"
                            data-heading-variant="section"
                        >
                            {abilityScores[abilityKey]}
                        </h4>
                    </header>

                    {#if arrayIndex !== null}
                        <div
                            class="nimble-cc-ability-score__value"
                            role="listitem"
                            draggable="true"
                            ondragstart={(e) => {
                                e.dataTransfer.dropEffect = "move";
                                e.dataTransfer.setData("modifier", arrayIndex);
                            }}
                        >
                            {replaceHyphenWithMinusSign(
                                selectedArray?.array?.[arrayIndex] ?? "",
                            )}
                        </div>
                    {:else}
                        -
                    {/if}
                </li>
            {/each}
        </ul>

        {#if !allStatsSelected}
            <ul class="nimble-array-value-list">
                {#each selectedArray?.array ?? [] as modifier, modifierIndex (modifierIndex)}
                    {#if !Object.values(tempSelectedAbilityScores).includes(modifierIndex)}
                        <li
                            class="nimble-array-value-list__option"
                            draggable="true"
                            ondragstart={(e) => {
                                e.dataTransfer.dropEffect = "move";
                                e.dataTransfer.setData(
                                    "modifier",
                                    modifierIndex,
                                );
                            }}
                        >
                            {replaceHyphenWithMinusSign(modifier)}
                        </li>
                    {/if}
                {/each}
            </ul>
        {:else}
            <button
                class="nimble-button"
                data-button-variant="basic"
                type="button"
                onclick={lockInStatAssignment}
            >
                Confirm Stat Assignments
            </button>
        {/if}
    {:else if statsLockedIn}
        <ul class="nimble-ability-score-list">
            {#each Object.entries(selectedAbilityScores) as [abilityKey, arrayIndex]}
                <li class="nimble-cc-ability-score">
                    <header class="nimble-cc-ability-score__header">
                        <h4
                            class="nimble-heading"
                            data-heading-variant="section"
                        >
                            {abilityScores[abilityKey]}
                        </h4>
                    </header>

                    <div
                        class="nimble-cc-ability-score__value nimble-cc-ability-score__value--no-drag"
                    >
                        {replaceHyphenWithMinusSign(
                            selectedArray?.array?.[arrayIndex] ?? "",
                        )}
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</section>

<style lang="scss">
    [data-button-variant="basic"] {
        --nimble-button-margin: 0.5rem 0 0 0;
        --nimble-button-padding: 0.5rem;
        --nimble-button-width: 100%;
    }

    .nimble-array-value-list,
    .nimble-ability-score-list {
        display: grid;
        grid-template-columns: repeat(var(--abilityScoreCount, 5), 1fr);
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .nimble-array-value-list {
        margin-block-start: 0.5rem;
    }

    .nimble-array-value-list__option {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        background: var(--nimble-card-background-color, unset);
        border: 1px solid var(--nimble-card-border-color, hsl(41, 18%, 54%));
        box-shadow: var(--nimble-box-shadow);
        border-radius: 4px;
        cursor: grab;
        font-size: var(--nimble-md-text);
    }

    .nimble-cc-ability-score {
        padding: 0.5rem;
        gap: 0.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        background: var(--nimble-card-background-color, unset);
        border: 1px solid var(--nimble-card-border-color, hsl(41, 18%, 54%));
        box-shadow: var(--nimble-box-shadow);
        border-radius: 4px;
        font-size: var(--nimble-md-text);
        cursor: auto;

        &:hover {
            text-shadow: none;
        }

        &__value {
            width: 100%;
            text-align: center;
            cursor: grab;

            &--no-drag {
                cursor: auto;
            }
        }
    }
</style>
