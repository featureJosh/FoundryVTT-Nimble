import getTooltipPermissions from './getTooltipPermissions.js';
import prepareRollTooltipFormula from './prepareRollTooltipFormula.js';
import prepareRollTooltipRollParts from './prepareRollTooltipParts.js';

export default function prepareRollTooltip(actorType, permissions, roll) {
	if (!getTooltipPermissions(actorType, permissions)) return null;
	return [prepareRollTooltipRollParts(roll), prepareRollTooltipFormula(roll)].join('');
}
