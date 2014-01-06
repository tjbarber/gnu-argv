The documentation is pretty poor right now, and I'm going to fix it up quite a bit when we're ready for prime-time. ;)

Examples:

```argv.config([
	{
		reference: 'ssh',
		options: 'o',
		longOptions: '--option',
		arguments:true
 	},
 	{
 		reference: 'ssh',
 		options: 'o',
 		longOptions: '--option',
 		arguments:true
 	},
 	{
 		reference: 'ssh',
 		options: 'o',
 		longOptions: '--option',
 		arguments:true
 	},
 	{
 		reference: 'ssh',
 		options: 'o',
 		longOptions: '--option',
 		arguments:true
 	}
 ]);```

sets options by passing argv.config an array of objects.

```argv.set('ssh', {
 	options: 'o',
 	longOptions: '--option',
 	arguments: true
});```

sets a single option, good if you only want to set up one or two options.

```arvg.isSet('open');```

returns true or false


```argv.get('open');```

returns arguments to the option if they exist in the form of an array, otherwise returns undefined.

