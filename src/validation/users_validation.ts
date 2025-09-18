//Faire toutes les validation des champs necessaire ici en amont 
//ici length basse juste pour tester

export function makeCreateUserValidationForm() {
	return {
		body: {
			type: 'object',
			properties: {
				name: { type: 'string', maxLength: 8 },
				email: { type: 'string' },
				password: { type: 'string' },
			},
			required: ['name', 'email'],
			additionalProperties: false,
		}
	};
}


export function makeUpdateUserValidationForm() {
	return {
		filename: {
			type: 'string'
		},
		schema: {
			consumes: ["multipart/form-data"],
			body: {
				type: 'object',
				properties: {
					id: { type: 'integer' },
					name: { type: 'string', maxLength: 8 },
					email: { type: 'string' },
					file: { type: 'binary' },
				},
				required: ['id', 'name', 'email'],
				additionalProperties: false,
			}
		}
	};
}

export function makeGetUserValidationParams() {
	return {
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}

export function makeDelUserValidationParams() {
	return {
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' },
			},
			required: ['id'],
			additionalProperties: false,
		}
	};
}

