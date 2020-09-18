/**
 * JOI!
 */
const Joi = require('joi');

/**
 * Custom Joi Error Handling
 */
function myJoiError(error = {}) {
	const joiError = error.error.details[0];
	const errorMessage = {
		joiError: 'joi',
		message: joiError.message
	};

	return errorMessage;
}

module.exports = {
	/**
	 * Dynamic Schema Example
	 */
	validateEvents: function (book, field = null) {
		const joiSchema = {
			title: Joi.string().min(3).required(),
			location: Joi.string().min(3).required(),
			participant: Joi.string().min(3).required(),
			date: Joi.string().min(3).required(),
			note: Joi.string().min(3).required(),
			image: Joi.string().min(3).required(),
			// note: Joi.string().min(50).required(),
		};

		if (!field) {
			return new Promise((resolve, reject) => {
				const error = Joi.validate(book, joiSchema);

				if (error.error != null) {
					reject(myJoiError(error));
				}
				resolve();
			});
		} else {
			const dynamicSchema = Object.keys(joiSchema)
				.filter(key => field.includes(key))
				.reduce((obj, key) => {
					obj[key] = joiSchema[key];
					return obj;
				}, {});
			return new Promise((resolve, reject) => {
				const error = Joi.validate(book, dynamicSchema);

				if (error.error != null) {
					reject(myJoiError(error));
				}
				resolve();
			});
		}
	}
}
