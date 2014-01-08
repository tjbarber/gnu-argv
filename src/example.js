var argv = require('./argv.js');

argv.set([
	{
		reference: 'open',
		options: ['o', 'f', 'd']
	},
	{
		reference: 'close',
		options: 'c',
	},
	{
		reference: 'exit',
		options: 'e',
	}
]);

console.log(argv.isSet('open'));
console.log(argv.isSet('close'));
console.log(argv.isSet('exit'));