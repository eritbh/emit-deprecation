# emit-deprecation

A type-safe helper for emitting deprecation warnings in Node projects.

## Installation

    npm install emit-deprecation

## Usage

Usually, you'll want to create your deprecation emitter in its own file, then import it from other files to use it, like so:

```ts
// deprecations.js
import createDeprecationEmitter from 'emit-deprecation';

const emitDeprecation = createDeprecationEmitter('mathfuncs', {
	ADD_THREE: 'add(a, b, c) is deprecated. Use add(a, add(b, c)) instead.',
	POW_DEFAULT: 'Calling pow() without an explicit base is deprecated.',
});

export default emitDeprecation;
```

```js
// yourLibCode.js
import emitDeprecation from './deprecations.js';

export function add (a, b, c) {
	if (c === undefined) {
		emitDeprecation('ADD_THREE'); //
	}
}
```

## Background

This helper allows you to specify all your deprecation codes and messages in one place, getting out a function which you can use to emit deprecation warnings from your main code. It makes use of [process.emitWarning]() and the special `DeprecationWarning` warning type, meaning users can use Node's `--*-warnings` and `--*-deprecation` CLI flags to control the behavior of your deprecation warnings. It also makes sure that no warning code is emitted more than once to follow documented best practices.

## License

MIT &copy; eritbh
