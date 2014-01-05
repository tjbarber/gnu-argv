"use strict";

var _ = require('underscore');

// Examples

this.set('open', {
	optionsFlag: 'o',
	longOptionFlag: '--open',
	arguments: true
})

// returns true or false
this.isSet('open');


this.get('open');

// returns arguments to the option if they exist, otherwise returns null

