//Faire toutes les validation des champs necessaire ici en amont 

export function makeCreateMatchValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				idUser1: { type: 'integer' },
				idUser2: { type: 'integer' },
			},
			required: ['idUser1', 'idUser2'],
			additionalProperties: false,
		}
	};
}


export function makeMatchHasFinishValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				id: { type: 'integer' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}


export function makeMatchHasCancelValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				id: { type: 'integer' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}

export function makeGetMatchValidationParams() {
	return {
		params: {
			type: 'object',
			properties: {
				id: { type: 'integer' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}

export function makeDelMatchValidationParams() {
	return {
		params: {
			type: 'object',
			properties: {
				id: { type: 'integer' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}

