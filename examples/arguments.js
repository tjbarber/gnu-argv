var argv = require('../src/argv.js');

argv.set({
	reference: 'open',
	options: ['o', 'f'],
	arguments: true
});

console.log(argv.isSet('open'));
console.log(argv.get('open'));