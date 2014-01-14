var argv = require('../src/argv.js');

argv.set({
	reference: 'open',
	// longOptions can also be an array
	options: ['o', 'f']
});

console.log(argv.isSet('open'));