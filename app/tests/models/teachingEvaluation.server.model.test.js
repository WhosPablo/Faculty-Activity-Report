'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	TeachingEvaluation = mongoose.model('TeachingEvaluation');

/**
 * Globals
 */

var evaluation01, evaluation02;

describe('Teaching Evaluation Model Unit Tests:', function() {
	beforeEach(function(done) {
	
		evaluation01 = new TeachingEvaluation({
			sub: [{
				course: 'testCourse 101',
				year: '2014',
				semester: 'spring',
				enrolled: '100',
				responses: '30',
				teacherMean: [1.0,2.0,3.0,4.0,5.0,1.1,2.2,3.3,4.4],
				departmentMean: [1.0,2.0,3.0,4.0,5.0,1.1,2.2,3.3,4.4],
				collegeMean: [1.0,2.0,3.0,4.0,5.0,1.1,2.2,3.3,4.4]
			}]
		});

		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problem', function(done) {
			evaluation01.save();
			done();
		});
		
		it('should not fail to save an existing activity again', function(done) {
			evaluation01.save();
			done();
		});

		it('should fail to save a year that is beyond the present year', function(done) {
			evaluation01.sub[0].year = 3515;
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save a year that is below 1980', function(done) {
			evaluation01.sub[0].year = 1975;
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not fail to save a semester that is not spring, fall, summer', function(done) {
			evaluation01.sub[0].semester = 'fall';
			evaluation01.save();
			done();
		});

		it('should fail to save a semester that is not spring, fall, summer', function(done) {
			evaluation01.sub[0].semester = 'winter';
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if one of the mean scores is over highScore', function(done) {
			evaluation01.sub[0].teacherMean[3] = 10;
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if one of the mean scores is below lowScore', function(done) {
			evaluation01.sub[0].teacherMean[3] = 0.5;
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save if one of the mean scores arrays do not match number of questions (9)', function(done) {
			evaluation01.sub[0].collegeMean.push(3);
			return evaluation01.save(function(err) {
				should.exist(err);
				done();
			});
		});
	}); 

	describe('Method Misc', function() {
			it('should be able to compute an the total Mean scores to two decimal places', function(done) {
				evaluation01.sub[0].teacherMean = [1,1,1,1,1,1,1,1,1];
				evaluation01.sub[0].departmentMean = [4.45,3.35,2.25,1.15,3.75,3.75,4.5,2.10,4.99];
				var array = evaluation01.sub[0].findTotalMean();
				array.should.eql([1.00,3.37,2.89]);
				done();
		});
	});

	afterEach(function(done) {
		TeachingEvaluation.remove().exec();
		done();
	});
});