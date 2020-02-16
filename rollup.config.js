import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		resolve({extensions: ['.ts', '.mjs', '.js', '.json', '.node']}), // tells Rollup how to find date-fns in node_modules
		typescript({target: "es6"}),
		commonjs(), // converts date-fns to ES modules
		!production && livereload('public'),
		production && terser() // minify, but only in production
	]
};
