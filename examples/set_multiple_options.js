var argv = require('../src/argv.js');

argv.set([
	{
		reference: 'open',
		options: ['o', 'f'],
		arguments: true
	},
	{
		reference: 'close',
		options: 'c'
	}
]);

console.log(argv.isSet('open'));
console.log(argv.isSet('close'));