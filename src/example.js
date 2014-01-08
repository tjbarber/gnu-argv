var argv = require('./argv.js');

argv.set({
	reference: 'open',
	options: ['o', 'f', 'd']
});

console.log(argv.isSet('open'));