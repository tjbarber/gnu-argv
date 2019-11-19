var config = {
	allowed: [],
	set: {},
	argv: process.argv.slice(2, process.argv.length),
	status: "production"
};

// system functions

function parseCurrentARGS() {	
	let allowed = true;

	config.argv.map(argument => {
		// -rfdegerwe
		if (argument[0] === '-' && argument[1] !== '-') {
			const argumentChars = argument.slice(1, argument.length);
			[...argumentChars].map(char => {
				if (config.allowed.indexOf(char) === -1) abort();
			});

			return true;
		}

		// --option

		const argumentName = argument.split('=')[0]; // for --option=foo
		if (config.allowed.indexOf(argumentName.slice(2, argumentName.length)) !== -1) return true;
		abort();
	});
}

function isOptionSet(options) {
	let isSet = false;
	if (Array.isArray(options)) {
		config.argv.map(argument => {			
			options.map(option => {
				if (checkArg(argument, option)) isSet = true;
			});
		});
	} else {
		config.argv.map(argument => {
			if (checkArg(argument, options)) isSet = true;
		});
	}

	return isSet
}

function checkArg(arg, option) {
	const splitArg = arg.split('=');
	
	// -r or --option
	if ((arg.slice(1, arg.length) === option) || (arg.slice(2, arg.length) === option)) return true;
	
	// --option=arg
	if (splitArg[0].slice(2, splitArg[0].length) === option) return true;

	// -rf
	if (arg[0] === '-' && arg[1] !== '-' && arg.length > 2) {
		let results = null;
		arg = arg.slice(1, arg.length);
		
		[...arg].map(char => {
			if (char === option) results = true
		});

		if (results) return true;
		return false;
	}
}

function parseArguments(obj) {
	let args = [];
	function searchForArguments(opt) {
		let ARGVContainsOpt = false;
		
		config.argv.map(argument => {
			const splitArgument = argument.split('=')[0];

			if (argument.slice(2, argument.length) === opt || 
				argument.slice(1, 2) === opt || 
				splitArgument.slice(2, splitArgument.length) === opt) {
					ARGVContainsOpt = true;
				}
		});
		
		if (!ARGVContainsOpt) return;

		if (opt.length === 1) {
			config.argv.map((argument, index) => {
				if (argument.slice(0 ,1) === '-' && argument.slice(1 ,2) === opt && argument.length > 2) {
					args.push(argument.slice(2, argument.length));
				} else {
					let stop = false;

					while (stop === false) {
						const nextArgument = config.argv[index + 1];

						if (nextArgument !== undefined && nextArgument[0] !== '-' && args.indexOf(nextArgument) === -1) {
							args.push(nextArgument);
						}

						stop = true
					}
				}
			});
		} else {
			config.argv.map((argument, index) => {
				const splitArgument = argument.split('=');

				if (splitArgument.slice(2, argument.length === opt)) {
					let nextIndex = index + 1;

					while (config.argv[j] && config.argv[j].slice(0, 1) !== '-') {
						const el2 = config.argv[j];
						
						if (el2 !== undefined && args.indexOf(el2) === -1) {
							args.push(el2);
						}
						
						j++;					
					}
				} else if (splitArgument[0].slice(2, splitArgument[0].length) === opt && argument.length > opt.length + 2) {
					args.push(splitArgument.slice(1, argument.length).join('='));
				}
			});
		}
	};

	if (obj.options && Array.isArray(obj.options)) {
		obj.options.map(option => {
			searchForArguments(option);
		});
	} else if (obj.options) {
		searchForArguments(obj.options);
	}
	
	if (obj.longOptions && Array.isArray(obj.longOptions)) {
		obj.longOptions.map(option => {
			searchForArguments(option);
		});
	} else if (obj.longOptions) {
		searchForArguments(obj.longOptions);
	}
	
	if (args) {
		return args;
	};
	
	return null;
}

function setFlag(obj) {
	if (!isOptionSet(obj.options) && !isOptionSet(obj.longOptions)) { return false; }

	config.set[obj.reference] = {
		arguments: (obj.arguments ? parseArguments(obj) : null)
	};

	return isSet(obj.reference);
}

function checkOption(option) {
	if (option && option.length !== 1) {
		console.log(option + " is not a valid one character alphanumeric option name.");
		return false;
	}
	return true;
}

function parseOptions(opts, longOptions) {
	// keeps undefined from being added to config.allowed
	// from a option object with no longOptions
	if (!opts) return;
	
	longOptions = (longOptions || false);
	if (Array.isArray(opts)) {
		opts.map(option => {
			if (!longOptions && !checkOption(option)) return;
			config.allowed.push(option);
		});
	} else {
		if (!longOptions && !checkOption(opts)) return;
		config.allowed.push(opts);
	}
}

function abort() {
	console.log("Invalid option passed.");
	if (config.status !== "test") process.exit(1);
}

// exposed methods

function set(obj) {
	if (Array.isArray(obj)) {
		let results = null;
		if (!obj.length) return false;
		
		obj.map(option => {
			parseOptions(option.options);
			parseOptions(option.longOptions, true);
		});
	
		parseCurrentARGS();

		// running setFlag after all the option parsing is complete
		obj.map(option => {
			results = setFlag(option);
		});

		return results
	} else {
		parseOptions(obj.options);
		parseOptions(obj.longOptions, true);
		parseCurrentARGS();
	}

	return setFlag(obj);
}

function isSet(reference) {
	return !!config.set[reference];
}

function get(reference) {
	if (isSet(reference)) return config.set[reference].arguments;
	return false;
}

module.exports = {
	config,
	set,
	isSet,
	get
}
