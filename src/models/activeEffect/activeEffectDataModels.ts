import { NimbleConditionEffectData } from './conditionDataModel.js';

const activeEffectDataModels = {
	condition: NimbleConditionEffectData,
};

export default activeEffectDataModels;

declare global {
	interface DataModelConfig {
		ActiveEffect: {
			condition: NimbleConditionEffectData;
		};
	}
}
