var expect = require('chai').expect;
var argv = require('../src/argv.js');
argv.config.status = "test";

describe("ARGV", function() {
	describe("#set()", function() {
		it("should set the option as ready to use", function() {
			var args = ['-o'];
			argv.config.set = {};
			argv.config.argv = args; 

			var results = argv.set({
				reference: 'open',
				options: 'o'
			});

			expect(results).to.be.true;
		});

		it("should set the option with multiple flags", function() {
			var args = ['-f'];
			argv.config.set = {};
			argv.config.args = args; 

			argv.set({
				reference: 'open',
				options: ['o', 'f', 'p'],
			});

			var results = argv.isSet('open');

			expect(results).to.be.true;
		});

		it("should set the option with as a long option", function() {
			var args = ['--file'];
			argv.config.set = {};
			argv.config.argv = args; 

			console.log(argv.set({
				reference: 'open',
				options: 'o',
				longOptions: 'file'
			}));

			var results = argv.isSet('open');
			expect(results).to.be.true;
		});

		it("should set options not seperated by spaces", function() {
			var args = ['-rfa'];
			argv.config.set = {};
			argv.config.argv = args; 
			
			argv.set([
				{
					reference: 'recursive', 
					options: 'r'
				},
				{
					reference: 'force',
					options: 'f'
				},
				{
					reference: 'always',
					options: 'a'
				}
			]);

			var results1 = argv.isSet('recursive');
			var results2 = argv.isSet('force');
			var results3 = argv.isSet('always');

			expect(results1).to.be.true;
			expect(results2).to.be.true;
			expect(results3).to.be.true;
		});
	});

	describe("#isSet()", function() {
		it("should say if an option is set", function() {
			var args = ['-o'];
			argv.config.set = {};
			argv.config.argv = args; 

			argv.set({
				reference: 'open',
				options: 'o'
			});

			var results = argv.isSet('open');

			expect(results).to.be.true;
		});
	});

	describe("#get()", function() {
		it("should return the arguments of a given option", function() {
			var args = ['-o', 'file.js'];
			argv.config.set = {};
			argv.config.argv = args; 

			argv.set({
				reference: 'open',
				options: 'o',
				arguments: true
			});

			var results = argv.get('open');

			expect(results).to.have.members(['file.js']);
		});

		it("should return multiple arguments of a given option", function() {
			var args = ['-o', 'file.js', 'file2.js'];
			argv.config.set = {};
			argv.config.argv = args; 

			argv.set({
				reference: 'open', 
				options: 'o',
				arguments: true
			});

			var results = argv.get('open');

			expect(results).to.have.members(['file.js', 'file2.js']);
		});
	});
});