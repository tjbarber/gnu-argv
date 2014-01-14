var argv = require('../src/argv.js');

argv.set({
	reference: 'open',
	options: 'o'
});

console.log(argv.isSet('open'));