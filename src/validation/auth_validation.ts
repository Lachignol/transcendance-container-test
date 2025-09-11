//Faire toutes les validation des champs necessaire ici en amont 

export function makeLoginValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				email: { type: 'string' },
				password: { type: 'string' },
			},
			required: ['email', 'password'],
			additionalProperties: false,
		}
	};
}


export function makeSignUpValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				name: { type: 'string', maxLength: 8 },
				email: { type: 'string' },
				password: { type: 'string' },
			},
			required: ['name', 'email', 'password'],
			additionalProperties: false,
		}
	};
}

