/** Helpers */
const myResponse = require("../helpers/myResponse");
const validate = require('../helpers/joiSchema');
const errorMessage = require("../helpers/myErrorMessage");
const deleteImage = require("../helpers/deleteImage");

/** Model */
const eventsModel = require("../models/m_events");

function generateFilters(filters = {}, fields = {}) {
	let filter = {};
	let search = {};
	let pagination = {};
	let sort = {};

	// get filter
	for (field in fields) {
		// get field name
		const fieldName = fields[field];

		for (fltr in filters) {
			// masukin ke filter
			if (fltr == fieldName) {
				if (fltr in filter == false) {
					filter[fltr] = filters[fltr];
				}
			}
		}
	}

	// get search
	if (filters.search && filters.search.length > 0) {
		search.search = filters.search
	}

	// get pagination
	if ((filters.page && filters.page > 0) && (filters.limit && filters.limit > 0)) {
		pagination.page = filters.page;
		pagination.limit = filters.limit;
	}

	// get sort
	if (filters.sort_by && filters.sort_by.length > 0) {
		sort.sort_by = (filters.sort_by);
	}
	if (filters.sort_type && filters.sort_type.length > 0) {
		sort.sort_type = (filters.sort_type);
	}

	return {
		filter,
		search,
		pagination,
		sort
	};
}

/**
 * CRUD
 */
async function getEvents(req, res) {
	try {
		// Joi validation
		// const fieldToPatch = Object.keys(req.body);
		// await validate.validateEvents(req.body, fieldToPatch);

		const body = req.query;
		const search = body.search ? body.search : "";
		const page = body.page ? body.page : 1;
		const limit = body.limit ? body.limit : 0;
		const result = await eventsModel.getData(search, page, limit);

		if (limit > 0) {
			if (result.data.length > 0) {
				result.previousPage = req.protocol + '://' + req.get('host') + req.originalUrl;
				result.nextPage = req.protocol + '://' + req.get('host') + req.originalUrl;
				if (req.query.page > 1) result.previousPage = result.previousPage.replace(`page=${req.query.page}`, `page=${parseInt(req.query.page) - 1}`)
				result.nextPage = result.nextPage.replace(`page=${req.query.page}`, `page=${parseInt(req.query.page) + 1}`)
				return myResponse.response(res, "success", result, 200, "Ok!");
			} else {
				return myResponse.response(res, "success", [], 200, "Ok!");
			}
		} else {
			return myResponse.response(res, "success", result.data, 200, "Ok!");
		}
	} catch (error) {
		console.log(error);
		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

async function postEvent(req, res) {
	try {
		// Joi validation
		const fieldToPatch = Object.keys(req.body);
		await validate.validateEvents(req.body, fieldToPatch);

		const body = req.body;
		const checkEvent = await eventsModel.getDataByName(body.title);
		
		if (checkEvent.length > 0) {
			if (req.file) {
				// delete new image when duplicated data
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Duplicate data ${body.title}`;
			return myResponse.response(res, "failed", "", 409, message);
		}

		if (req.file === undefined) {
			// set default file when no image to upload
			body.image = `default.png`;
		} else {
			if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
				// get the image name and set into data
				body.image = `${req.file.filename}`;
			} else {
				// delete new file when not an image
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);

				const message = `There is no image to upload`;
				return myResponse.response(res, "failed", "", 500, message);
			}
		}

		// insert data
		const result = await eventsModel.addData(body);
		if (result.affectedRows > 0) {
			body.id = result.insertId;
			return myResponse.response(res, "success", body, 201, "Created!");
		} else {
			if (req.file) {
				// delete new image when insert data is failed
				const myRequest = { protocol: req.protocol, host: req.get('host') }
				deleteImage.delete(myRequest, req.file.filename);
			}

			const message = `Add data failed`;
			return myResponse.response(res, "failed", "", 500, message);
		}
	} catch (error) {
		console.log(error);

		// delete image when error
		if (req.file) {
			const myRequest = { protocol: req.protocol, host: req.get('host') }
			deleteImage.delete(myRequest, req.file.filename);
		}

		return myResponse.response(res, "failed", "", 500, errorMessage.myErrorMessage(error, {}));
	}
}

module.exports = {
	getEvents,
	postEvent,
}