var argv = require('./argv.js');

argv.set({
	reference: 'open',
	options: 'o',
	arguments: true
});

console.log(argv.get('open'));
// console.log(argv.isSet('close'));
// console.log(argv.isSet('exit'));