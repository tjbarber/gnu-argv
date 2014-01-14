var argv = require('../src/argv.js');

argv.set({
	reference: 'open',
	longOptions: 'open'
});

console.log(argv.isSet('open'));