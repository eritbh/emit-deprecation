import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json';

export default [
	{
		preserveModules: true,
		input: [
			'src/index.ts',
		],
		output: [
			{
				dir: 'dist',
				format: 'es',
				entryFileNames: '[name].mjs',
				sourcemap: true,
			},
			{
				dir: 'dist',
				format: 'cjs',
				entryFileNames: '[name].cjs',
				sourcemap: true,
			},
		],
		plugins: [
			// Build Typescript files to Javascript so they can be processed
			typescript({
				tsconfig: './tsconfig.json',
				rootDir: 'src',
			}),
		],
		external: [
			// Dependencies from npm
			...Object.keys(packageJson.dependencies || {}),
			...Object.keys(packageJson.optionalDependencies || {}),
			// If node built-in modules are used in the project, add them here
		],
	},
];
