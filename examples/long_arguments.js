var argv = require('../src/argv.js');

argv.set({
	reference: 'open',
	longOptions: ['open', 'file'],
	arguments: true
});

console.log(argv.isSet('open'));
console.log(argv.get('open'));