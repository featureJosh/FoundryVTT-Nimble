const { fields } = foundry.data;

export const identifier = () => ({
	identifier: new fields.StringField({ required: true, nullable: false, initial: '' }),
});
