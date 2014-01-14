var argv = require('./argv.js');

var args = ['-o', 'file.js'];
argv.config.set = {};
argv.config.argv = args;
console.log(argv.config.argv);

argv.set({
	reference: 'open',
	options: 'o',
	arguments: true
});

console.log(argv.get('open'));
// console.log(argv.isSet('close'));
// console.log(argv.isSet('exit'));