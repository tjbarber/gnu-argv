"use strict";
var _ = require('underscore');

var argv = {},
	config = {
		argv = process.argv
	};

// system functions

var parseARGV = function parseARGV() {

};

// exposed methods

var multipleSet = function config(options) {
	_.each(options, function(el, index){
		set(el.reference, el);
	});
};

var set = function set(reference, options) {
	return isSet(reference);
};

var isSet = function(reference) {
	return (argv[reference] ? true : false);
};

var get = function(reference) {
	return argv[reference].arguments;
};

module.exports.config = config;
module.exports.multipleSet = multipleSet;
module.exports.set 	  = set;
module.exports.isSet  = isSet;
module.exports.get 	  = get;