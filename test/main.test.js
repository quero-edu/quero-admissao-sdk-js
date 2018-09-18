const _ = require('lodash'),
	Joi = require('joi'),
	Quero = require('../index');

describe('SDK', function () {
	it('Load client', function () {
		this.quero = Quero({
			environment: 'development',
			api_token: process.env.QUERO_API_TOKEN
		});
	});

	it('Find all admissions', function () {
		return this.quero
			.findAdmissions()
			.then(admissions => _.filter(Joi.attempt(
				admissions,
				Joi.object()
					.required()
					.keys({
						has_more: Joi.boolean().required(),
						items: Joi.array().required().min(1).items(Joi.object().keys({
							student: Joi.object().keys({
								id: Joi.number(),
								cpf: Joi.string()
							}).unknown()
						}).unknown())
					})
					.unknown()
			).items), admission => admission.status == 'enrolled')
			.then(admissions => this.admission = admissions[0]);
	});

	it('Get admission by ID', function () {
		return this.quero
			.getAdmission(this.admission.id);
	});

	it('Get student by ID', function () {
		return this.quero
			.getStudent(this.admission.student.id);
	});

	it('Find students by CPF', function () {
		return this.quero
			.findStudents(this.admission.student.cpf);
	});

	it('Find admission documents', function () {
		return this.quero
			.findAdmissionDocuments(this.admission.id)
			.then(documents => Joi.attempt(
				documents,
				Joi.object()
					.required()
					.keys({
						has_more: Joi.boolean().required(),
						items: Joi.array().required().min(1).items(Joi.object().keys({
							id: Joi.number()
						}).unknown())
					})
					.unknown()
			))
			.then(documents => this.document = documents.items[0]);
	});
});
