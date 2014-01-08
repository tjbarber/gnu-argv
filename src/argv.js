"use strict";
var _ = require('underscore');

var argv = {},
	config = {
		allowed: [],
		argv: process.argv
	};

// system functions

var parseCurrentARGS = function parseCurrentARGS() {
	_.each(config.argv, function(el, index) {
		// -rfdegerwe
		if (_.has(config.allowed, el.slice(0, 1))) {
			return true;
		}

		// --option

		if (!_.has(config.allowed, el.slice(0, 2))) {
			return true;
		}

		console.log("Invalid option passed.");
		process.exit(1);
	});
};

var isOptionSet = function isOptionSet(options) {
	if (_.isArray(options)) {
		_.each(config.argv, function(arg, index) {
			_.each(options, function(option, index) {
				// -r or --option
				if ((arg.slice(1, arg.length) === option) || (arg.slice(2, arg.length) === option)) {
					return true;
				}

				// -rf
			});
		});
	} else {
		_.each(config.argv, function(arg, index) {
			if ((arg.slice(1, arg.length) === options) || arg.slice(2, arg.length) === option) {
				return true;
			}
		});
	}

	return false;
};

var parseArguments = function parseARGV(options) {

	if (_.isArray(options)) {
		_.each(options, function(el, index) {


			if (!checkOption(el)) { return null; }
		});
	} else {
		if (!checkOption(options)) { return null; }
	}
};

var setFlag = function setFlag(obj) {
	if (!parseCurrentARGS(obj.options)) { return false; }

	argv[obj.reference] = {
		arguments: (obj.arguments ? parseArguments(obj.options) : null)
	};

	return isSet(obj.reference);
};

// exposed methods

var set = function set(options) {
	if (_.isArray(options)) {
		if (!options.length) { return false; }

		_.each(options, function(el, index) {
			if (_.isArray(el.options)) {
				_.each(el.options, function(el, index) {
					if (el.length !== 1) {
						console.log(el + " is not a valid one character alphanumeric option name.");
						return;
					}
					config.allowed.push(el);	
				});
			} else {
				if (el.length !== 1) {
					console.log(el + " is not a valid one character alphanumeric option name.");
					return;
				}
				config.allowed.push(el);
			}
		});

		parseCurrentARGS();

		_.each(options, function(el, index){
			if (!setFlag(el)) {
				return false;
			}
		});

		return true;

	} else {
		config.allowed.push(options.reference);
		return setFlag(options);
	}
};

var isSet = function(reference) {
	return !!argv[reference];
};

var get = function(reference) {
	return argv[reference].arguments;
};

module.exports.config = config;
module.exports.set 	  = set;
module.exports.isSet  = isSet;
module.exports.get 	  = get;