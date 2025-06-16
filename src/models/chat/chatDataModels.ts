import { NimbleAbilityCheckCardData } from './AbilityCheckCardDataModel.js';
import { NimbleFeatureCardData } from './FeatureCardDataModel.js';
import { NimbleLevelUpSummaryCardData } from './LevelUpSummaryCardDataModel.js';
import { NimbleObjectCardData } from './ObjectCardDataModel.js';
import { NimbleSavingThrowCardData } from './SavingThrowCardDataModel.js';
import { NimbleSkillCheckCardData } from './SkillCheckCardDataModel.js';
import { NimbleSpellCardData } from './SpellCardDataModel.js';

const chatDataModels = {
	abilityCheck: NimbleAbilityCheckCardData,
	feature: NimbleFeatureCardData,
	levelUpSummary: NimbleLevelUpSummaryCardData,
	object: NimbleObjectCardData,
	savingThrow: NimbleSavingThrowCardData,
	skillCheck: NimbleSkillCheckCardData,
	spell: NimbleSpellCardData,
};

export default chatDataModels;

// Merge types into fvtt-types
declare global {
	interface DataModelConfig {
		ChatMessage: {
			abilityCheck: NimbleAbilityCheckCardData;
			feature: NimbleFeatureCardData;
			levelUpSummary: NimbleLevelUpSummaryCardData;
			object: NimbleObjectCardData;
			savingThrow: NimbleSavingThrowCardData;
			skillCheck: NimbleSkillCheckCardData;
			spell: NimbleSpellCardData;
		};
	}
}
