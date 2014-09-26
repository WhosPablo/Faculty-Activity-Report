'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	TeachingAdvising = mongoose.model('TeachingAdvising');

/**
 * Globals
 */
var advising;

describe('Teaching/Advising Model Unit Tests:', function() {
	beforeEach(function(done) {
		advising = new TeachingAdvising({
			philosophy: 'My strength as a teacher is...',
			supervising: 'I supervised...'
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problem', function(done) {
			advising.save();
			done();
		});

		it('should fail to save without teaching philosophy', function(done) {
			advising.philosophy = '';

			return advising.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		TeachingAdvising.remove().exec();
		done();
	});
});
