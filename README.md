gnu-argv
===

gnu-argv is an implementation of GNU's Program Argument Syntax Conventions for nodejs. It allows you to create command-line applications that can easily access ARGV while also giving your users the same ARGV flexibility that you see in GNU applications (passing arguments in any order, using -ofoo or --option=foo, etc). 

API:
--

```set(opts)```: Set options that can be used by the application. opts can be either an object literal representing an option or an array of aforesaid objects. An option definition object looks like the following:

```
{
	reference: 'open',
	options: 'o',
	longOptions: '--open',
	arguments:true
}
```

```isSet(reference)```: Returns a boolean stating if a option was set in ARGV at the time of program execution.

```get(reference)``` Returns an array of the arguments passed to the option, or null if no arguments were passed.

```config.env```: Used for Mocha only. Only valid options are "production" and "test". "test" prevents gnu-argv from terminating the program in the event that an option is invalid.

```config.argv```: Internal representation of ARGV, used only for testing.

Let's discuss the contents of an option definition object.

```reference```: Required. The option's "handle" in your application. You'll be able to tell if it's set or access the option's arguments using the reference (like isSet(reference) or get(reference)).

```options```: Optional. Can be either a valid one character alphanumeric string or an array of valid one character alphanumeric strings. These can be passed through to ARGV (node myapp.js -o).

```longOptions```: Optional. Can be either string or an array of strings, but passed to ARGV with two dashes (node myapp.js --open).

```arguments```: Optional. Boolean. If true, arguments to the option can be accessed using get(reference).

You can check out a few examples in the examples directory. Have fun!

