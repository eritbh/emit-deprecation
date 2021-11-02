/**
 * Creates a function for emitting deprecation warnings.
 * @param libraryName A project name to ensure deprecation codes are unique
 * @param warnings An object containing all warning codes and their messages
 * @returns A function that can be called to emit deprecation warnings
 */
export default <T extends string>(libraryName: string, warnings: {[code in T]: string}) => {
	// An array that keeps track of which warning codes have already been used
	const emittedCodes: T[] = [];

	/**
	 * Emits a deprecation warning for the given code, unless a warning for that
	 * code has already been emitted.
	 * @param code The code of the warning to emit
	 */
	return (code: T) => {
		// If this isn't a registered code, throw
		if (!(code in warnings)) {
			throw new Error(`"${code}" is not a deprecation`);
		}
		// If we've already emitted this code, don't emit it again
		if (emittedCodes.includes(code)) {
			return;
		}
		// Emit a DeprecationWarning with the given code and message
		process.emitWarning(warnings[code], 'DeprecationWarning', `${libraryName}:${code}`);
		// Record this code so we don't emit the warning a second time
		emittedCodes.push(code);
	};
};
