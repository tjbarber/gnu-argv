var argv = require('./argv.js');

argv.set({
	reference: 'open2',
	options: 'o',
	longOptions: 'file'
});

console.log(argv.isSet('open'));