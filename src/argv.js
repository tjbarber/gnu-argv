"use strict";
var _ = require('underscore');

var config = {
		allowed: [],
		set: {},
		argv: process.argv.slice(2, process.argv.length),
		status: "production"
};

// system functions

var parseCurrentARGS = function parseCurrentARGS() {
	var allowed = true;
	_.each(config.argv, function(el, index) {
		// -rfdegerwe
		if (el[0] === '-' && el[1] !== '-') {
			el = el.slice(1, el.length);
			_.each(el, function(el2, index2) {
				if (!_.contains(config.allowed, el2)) {
					allowed = false;
				}
			});
			if (allowed) {
				return true;
			}
			return false;
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
	var checkArg = function checkArg(arg, option) {
		// -r or --option
		if ((arg.slice(1, arg.length) === option) || (arg.slice(2, arg.length) === option)) {
			return true;
		}

		// -rf
		if (arg[0] === '-' && arg[1] !== '-' && arg.length > 2) {
			var results = null;
			arg = arg.slice(1, arg.length);
			_.each(arg, function(el, index) {
				if (el === option) {
					results = true;
				}
			});

			if (results) {
				return true;
			}
			return false;
		}
	};

	var isSet = false;
	if (_.isArray(options)) {
		_.each(config.argv, function(arg, index) {
			_.each(options, function(option, index) {
				if (checkArg(arg, option)) {
					isSet = true;
				};
			});
		});
	} else {
		_.each(config.argv, function(arg, index) {
			if (checkArg(arg, options)) {
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
	if (!isOptionSet(obj.options)) { return false; }

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

var parseOptions = function parseOptions(opts, longOptions) {
	longOptions = (longOptions || false);
	if (Array.isArray(opts)) {
		for (var i = 0, len = opts.length; i < len, i++) {
			if (!longOptions && !checkOption(opts[i])) {
				return;
			}
			config.allowed.push(opts[i]);
		}
	} else {
		if (!longOptions && !checkOption(opts)) {
			return;
		}
		config.allowed.push(opts);
	}
};

// exposed methods

var set = function set(obj) {
	if (Array.isArray(obj)) {
		var results = null;
		if (!obj.length) { return false; }
		
		for (var i = 0, len = obj.length; i < len; i++) {
			parseOptions(obj[i].options);
			parseOptions(obj[i].longOptions, true);
		}

		parseCurrentARGS();

		// running setFlag after all the option parsing is complete
		for (var i = 0, len = obj.length; i < len; i++) {
			results = setFlag(obj[i]);
		}

		if (results) {
			return true;
		}
		return false;

	} else {
		parseOptions(obj.options);
		parseOptions(obj.longOptions, true);
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