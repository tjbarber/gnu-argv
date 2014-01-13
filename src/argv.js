"use strict";

var config = {
		allowed: [],
		set: {},
		argv: process.argv.slice(2, process.argv.length),
		status: "production"
};

// system functions

var parseCurrentARGS = function parseCurrentARGS() {
	var allowed = true;
	for (var i = 0, len = config.argv.length; i < len; i++) {
		var el = config.argv[i];
		// -rfdegerwe
		if (el[0] === '-' && el[1] !== '-') {
			el = el.slice(1, el.length);
			for (var j = 0, len2 = el.length; j < len2; j++) {
				var el2 = el[j];
				if (config.allowed.indexOf(el2) === -1) {
					allowed = false;
				}
			}
			if (allowed) {
				return true;
			}
			return false;
		}
		
		// --option
		if (config.allowed.indexOf(el.slice(2, el.length)) !== -1) {
			return true;
		}
		
		console.log("Invalid option passed.");
		if (config.status !== "test") {
			process.exit(1);
		}
	}
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
			
			for (var i = 0, len = arg.length; i < len; i++) {
				if (arg[i] === option) {
					results = true;
				}
			}

			if (results) {
				return true;
			}
			return false;
		}
	};

	var isSet = false;
	if (Array.isArray(options)) {
		for (var i = 0, len = config.argv.length; i < len; i++) {
			var arg = config.argv[i];
			
			for (var j = 0, len2 = options.length; j < len2; j++) {
				if (checkArg(arg, options[j])) {
					isSet = true;
				}
			}
		}
	} else {
		for (var i = 0, len = config.argv.length; i < len; i++) {
			if (checkArg(config.argv[i], options)) {
				isSet = true;
			}
		}
	}

	if (isSet) {
		return true;
	}

	return false;
};

var parseArguments = function parseARGV(options) {

};

var setFlag = function setFlag(obj) {
	if (!isOptionSet(obj.options) && !isOptionSet(obj.longOptions)) { return false; }

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
	// keeps undefined from being added to config.allowed
	// from a option object with no longOptions
	if (!opts) { return };
	
	longOptions = (longOptions || false);
	if (Array.isArray(opts)) {
		for (var i = 0, len = opts.length; i < len; i++) {
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

var isSet = function isSet(reference) {
	return !!config.set[reference];
};

var get = function get(reference) {
	return config.set[reference].arguments;
};

module.exports.config = config;
module.exports.set 	  = set;
module.exports.isSet  = isSet;
module.exports.get 	  = get;