import { NimbleCharacterCombatantData } from './CharacterCombatantDataModel.js';
import { NimbleNPCCombatantData } from './NPCCombatantDataModel.js';
import { NimbleSoloMonsterCombatantData } from './SoloMonsterCombatantDataModel.js';

const actorDataModels = {
	character: NimbleCharacterCombatantData,
	npc: NimbleNPCCombatantData,
	soloMonster: NimbleSoloMonsterCombatantData,
};

export default actorDataModels;

// Merge types into fvtt-types
declare global {
	interface DataModelConfig {
		Combatant: {
			character: NimbleCharacterCombatantData;
			npc: NimbleNPCCombatantData;
			soloMonster: NimbleSoloMonsterCombatantData;
		};
	}
}
