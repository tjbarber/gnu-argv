var argv = require('./argv.js');

argv.set({
	reference: 'open',
	options: 'o'
});

console.log(argv.isSet('open'));