<script>
import replaceHyphenWithMinusSign from '../../../dataPreparationHelpers/replaceHyphenWithMinusSign.js';

import Hint from '../../../components/Hint.svelte';

function canAdd(skill, skillKey) {
	const skillPointRemoved = Object.values(skillPointChanges).some((value) => value === -1);
	const skillPointAdded = Object.values(skillPointChanges).some((value) => value >= 1);

	const quantityOfSkillsWithPointsAdded = Object.values(skillPointChanges).reduce((count, mod) =>
		mod > 0 ? count + mod : count,
	);

	if (skillPointRemoved && skillPointChanges[skillKey] === 2) return false;
	if (!skillPointRemoved && skillPointAdded) return false;
	if (quantityOfSkillsWithPointsAdded === 2) return false;

	return true;
}

function canSubtract(skill, skillKey) {
	if (skill.points + skillPointChanges[skillKey] < 1) return false;
	if (skillPointChanges[skillKey] === -1) return false;
	if (skillPointChanges[skillKey] > 0) return true;
	if (Object.values(skillPointChanges).some((value) => value === 1)) return true;
	if (Object.values(skillPointChanges).some((value) => value === -1)) return false;

	return true;
}

function getSkillMod(skill, skillKey, change) {
	const defaultAbility = defaultSkillAbilities[skillKey];
	let abilityBonus = 0;

	if (!selectedBoon && defaultAbility === selectedAbilityScore) {
		abilityBonus += 1;
	}

	return Math.min(skill.mod + (change ?? 0) + abilityBonus);
}

let {
	chooseBoon,
	document,
	selectedAbilityScore,
	selectedBoon,
	skillPointChanges = $bindable(),
} = $props();

const { defaultSkillAbilities, skills } = CONFIG.NIMBLE;

const hintText =
	'You may assign a single skill point to a skill of your choice. In addition, you may transfer one of your assigned skill points to another skill of your choice.';
</script>

<section>
    <header class="nimble-section-header">
        <h3 class="nimble-heading" data-heading-variant="section">Skill Points</h3>
    </header>

    <Hint {hintText} />

    <table class="nimble-skill-config-table">
        <thead>
            <tr>
                <th>Skill</th>
                <th>Ability Mod</th>
                <th>Skill Bonus</th>
                <th>Skill Points</th>
                <th>Total</th>
            </tr>
        </thead>

        <tbody>
            {#each Object.entries(document?.reactive?.system?.skills) as [key, skill]}
                {@const skillName = skills[key] ?? key}
                {@const defaultAbility = defaultSkillAbilities[key] ?? 'Strength'}
                {@const abilityMod = document?.reactive?.system?.abilities[defaultAbility]?.mod ?? 0}

                <tr>
                    <th class="nimble-skill-config-table__skill-name">{skillName}</th>
                    <td>{replaceHyphenWithMinusSign(abilityMod)}</td>
                    <td>{replaceHyphenWithMinusSign(skill.bonus)}</td>

                    <td class="nimble-skill-config-table__skill-points">
                        <button
                            class="nimble-button"
                            style="grid-area: decrementButton;"
                            data-button-variant="basic"
                            disabled={!canSubtract(skill, key)}
                            aria-label="Decrement Skill Points"
                            onclick={() => skillPointChanges[key]--}
                        >
                            -
                        </button>

                        <span class="nimble-skill-config__value">
                            {replaceHyphenWithMinusSign(skill.points + (skillPointChanges[key] ?? 0))}
                        </span>

                        <button
                            class="nimble-button"
                            style="grid-area: incrementButton;"
                            data-button-variant="basic"
                            disabled={!canAdd(skill, key)}
                            aria-label="Increment Skill Points"
                            onclick={() => skillPointChanges[key]++}
                        >
                            +
                        </button>
                    </td>

                    <td>
                        {getSkillMod(skill, key, skillPointChanges[key])}

                        {#if skillPointChanges[key]}
                            <span class="nimble-skill-point-delta">
                              ({replaceHyphenWithMinusSign(new Intl.NumberFormat("en-US", { signDisplay: "always" }).format(skillPointChanges[key]))})
                            </span>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<style lang="scss">
    .nimble-skill-config-table {
        --nimble-button-min-width: 4ch;

        text-align: center;
        vertical-align: middle;

        thead {
            text-align: center;
        }

        th {
            padding-inline: 0;
        }

        td {
            font-size: var(--nimble-md-text);

            &:last-of-type {
                position: relative;
            }
        }

        &__skill-name {
            font-weight: 900 !important;
            text-transform: uppercase;
        }

        &__skill-points {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
    }

    .nimble-skill-config__value {
        width: 3ch;
    }

    .nimble-skill-point-delta {
        position: absolute;
        right: 1rem;
        color: var(--nimble-medium-text-color);
    }
</style>
