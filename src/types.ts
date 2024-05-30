import { DateTime, DateOnly, Str, Email } from "@cloudflare/itty-router-openapi";

export const Task = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};

export const NewRespondentBasicData = {
	firstName: String,
  	lastName: String,
    email: Email,
  	dateOfBirth: DateOnly,
  	country: String,
  	city: String,
	county: String,
	postalCode: String,
	gender: String,
	agreeOnTerms: Boolean	
};

export const RespondentBasicData = {
	id: String,
	firstName: String,
  	lastName: String,
    email: Email,
  	dateOfBirth: DateOnly,
  	country: String,
  	city: String,
	county: String,
	postalCode: String,
	gender: String,
	agreeOnTerms: Boolean	
};