'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local mean properties
 */
var validateLocalStrategyMean = function(property) {
	var result = true;
	if(property.length !== 9)
		return false;
	for(var i = 0; i < 9; i++)
	{
		if(property[i] > 1 || property[i] < 5) //Figure a way to pull from high/low score
			return false;
	}
	return true;
};

/**
* A Validation function for local date properties
*/
var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};

//Contents of schema will pull majority of content from outside data source, not from user
var teachingEvaluation = new Schema({
	_id: {
		type: Schema.ObjectId,
		unique: true,
		required: true
	},
	teacher: {			//multiple evaluations per teacher possible. Use this field to match with user.username
		type: String,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	required: {
		type: Boolean,
		default: false
	},
	year: {
		type: Number,
		required: true,
		validate: [validateLocalStrategyDate, 
					'Date must be less than or equal to the current year and greator than or equal to 1980']
	},
	semester: {
		type: String,
		enum: ['spring', 'fall', 'summer'],
		required: true
	},
	enrolled: {
		type: Number,
		required: true,
	},
	highScore: {
		type: Number,
		default: 5,
	},
	lowScore: {
		type: Number,
		default: 1,
	},
	responses: {
		type: Number,
		required: true,
	},
	teacherMean: {	
		type: [Number],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (9)']
	},
	departmentMean: {
		type: [Number],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (9)']
	},
	collegeMean: {
		type: [Number],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (9)']
	}
	
	
	
	
	
}, {collection:'TeachingEvaluation'});

mongoose.model('TeachingEvaluation', teachingEvaluation);