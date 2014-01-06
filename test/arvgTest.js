var expect = require('chai').expect;
var argv = require('../src/argv.js');

describe("ARGV", function() {
	describe("#set()", function() {
		it("should set the option as ready to use.", function() {
			var args = ['-o', '-p'];
			argv.config.args = args; 

			var results = argv.set('open', {
				options: 'o'
			});

			expect(results).to.be.true;
		});

		it("should set the option with multiple flags", function() {
			var args = ['-f'];
			argv.config.args = args; 

			argv.set('open', {
				options: ['o', 'f', 'p'],
			});

			var results = argv.isSet('open');

			expect(results).to.be.true;
		});

		it("should set the option with as a long option", function() {
			var args = ['--file'];
			argv.config.args = args; 

			argv.set('open', {
				options: 'o',
				longOptions: 'file'
			});

			var results = argv.isSet('open');

			expect(results).to.be.true;
		});

		it("should set options not seperated by spaces", function() {
			var args = ['-rfa'];
			argv.config.args = args; 
			
			argv.set('recursive', {
				options: 'r'
			});

			argv.set('force', {
				options: 'f'
			});

			argv.set('always', {
				options: 'a'
			});

			var results1 = argv.isSet('recursive');
			var results2 = argv.isSet('force');
			var results3 = argv.isSet('always');

			expect(results1).to.be.true;
			expect(results2).to.be.true;
			expect(results3).to.be.true;
		});
	});

	describe("#isSet()", function() {
		it("should say if an option is set.", function() {
			var args = ['-o'];
			argv.config.args = args; 

			argv.set('open', {
				options: 'o'
			});

			var results = argv.isSet('open');

			expect(results).to.be.true;
		});
	});

	describe("#get()", function() {
		it("should return the arguments of a given option", function() {
			var args = ['-o', 'file.js'];
			argv.config.args = args; 

			argv.set('open', {
				options: 'o',
				arguments: true
			});

			var results = argv.get('open');

			expect(results).to.equal('file.js');
		});

		it("should return multiple arguments of a given option", function() {
			var args = ['-o', 'file.js', 'file2.js'];
			argv.config.args = args; 

			argv.set('open', {
				options: 'o',
				arguments: true
			});

			var results = argv.get('open');

			expect(results).to.equal(['file.js', 'file2.js']);
		});
	});

	describe("#config()", function() {
		it("should set multiple options as ready to use", function() {
			var args = ['-o', '-p'];
			argv.config.args = args; 

			var results = argv.configset([
				{
					reference: 'open',
					options: 'o'
				},
				{
					reference: 'pickles',
					options: 'p'
				}
			]);

			expect(results).to.be.true;
		});
	});
});