var argv = require('./argv.js');

argv.set({
	reference: 'open',
	longOptions: 'open',
	arguments: true
});

console.log(argv.get('open'));
// console.log(argv.isSet('close'));
// console.log(argv.isSet('exit'));