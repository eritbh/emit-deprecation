import test from 'ava';
import createDeprecationEmitter from './index';

test('createDeprecationEmitter', t => {
	// Mock out process.emitWarning with a function that just records call args
	const emitWarningCallHistory: any[][] = [];
	process.emitWarning = (...args) => {
		emitWarningCallHistory.push(args);
	};

	// Create a deprecation emitter
	const emitDeprecation = createDeprecationEmitter('foolib', {
		FOO: 'some message',
		BAR: 'a second message',
	});

	// Emit a single warning
	emitDeprecation('FOO');
	// process.emitWarning should have been called once with the correct args
	t.is(emitWarningCallHistory.length, 1);
	t.deepEqual(emitWarningCallHistory[0], [
		'some message',
		'DeprecationWarning',
		'foolib:FOO',
	]);

	// Emit the same warning again
	emitDeprecation('FOO');
	// process.emitWarning should NOT have been called a second time
	t.is(emitWarningCallHistory.length, 1);

	// Emit a different warning
	emitDeprecation('BAR');
	// process.emitWarning should have been called a second time with args
	t.is(emitWarningCallHistory.length, 2);
	t.deepEqual(emitWarningCallHistory[1], [
		'a second message',
		'DeprecationWarning',
		'foolib:BAR',
	]);

	// Emit a deprecation which doesn't exist; this should throw
	t.throws(() => {
		// explicit conversion to any because this is also against typings, but
		// still want to test it for JS consumers
		emitDeprecation('DOES_NOT_EXIST' as any);
	});
});
