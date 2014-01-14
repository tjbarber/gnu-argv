var argv = require('./argv.js');

argv.set({
	reference: 'open',
	longOptions: 'open'
});

console.log(argv.isSet('open'));