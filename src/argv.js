"use strict";
var _ = require('underscore');

var config = {
		allowed: [],
		set: {},
		argv: process.argv.slice(2, process.argv.length)
	};

// system functions

var parseCurrentARGS = function parseCurrentARGS() {
	_.each(config.argv, function(el, index) {
		// -rfdegerwe
		if (_.contains(config.allowed, el.slice(1, el.length))) {
			return true;
		}

		// --option

		if (_.contains(config.allowed, el.slice(2, el.length))) {
			return true;
		}
		console.log("Invalid option passed.");
		if (config.status !== "test") {
			process.exit(1);
		}
	});
};

var isOptionSet = function isOptionSet(options) {
	var isSet = false;
	if (_.isArray(options)) {
		_.each(config.argv, function(arg, index) {
			_.each(options, function(option, index) {
				// -r or --option
				if ((arg.slice(1, arg.length) === option) || (arg.slice(2, arg.length) === option)) {
					isSet = true;
				}

				// -rf
			});
		});
	} else {
		_.each(config.argv, function(arg, index) {
			if ((arg.slice(1, arg.length) === options) || arg.slice(2, arg.length) === options) {
				isSet = true;
			}
		});
	}

	if (isSet) {
		return true;
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
	if (!isOptionSet(obj.options)) { 
		return false; 
	}

	config.set[obj.reference] = {
		arguments: (obj.arguments ? parseArguments(obj.options) : null)
	};

	return isSet(obj.reference);
};

var checkOption = function checkOption(option) {
	if (option && option.length !== 1) {
		console.log(option + " is not a valid one character alphanumeric option name.");
		return false;
	}
	return true;
};

var parseOptions = function parseOptions(opts) {
	if (_.isArray(opts)) {
		_.each(opts, function(el, index) {
			if (!checkOption(el)) {
				return;
			}
			config.allowed.push(el);
		});
	} else {
		if (!checkOption(opts)) {
			return;
		}

		config.allowed.push(opts);
	}
};

// exposed methods

var set = function set(obj) {
	if (_.isArray(obj)) {
		if (!obj.length) { return false; }

		_.each(obj, function(el, index) {
			parseOptions(el.options);
			parseOptions(el.longOptions);
		});

		parseCurrentARGS();

	} else {
		parseOptions(obj.options);
		parseOptions(obj.longOptions);
		parseCurrentARGS();
	}

	return setFlag(obj);
};

var isSet = function(reference) {
	return !!config.set[reference];
};

var get = function(reference) {
	return config.set[reference].arguments;
};

module.exports.config = config;
module.exports.set 	  = set;
module.exports.isSet  = isSet;
module.exports.get 	  = get;