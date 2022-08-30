module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
		'vue/setup-compiler-macros': true
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/typescript/recommended"
	],
	parserOptions: {
		ecmaVersion: 2022
	},
	rules: {
		"no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"vue/no-v-html": "off",
		"vue/no-deprecated-slot-attribute": 'off',
		"@typescript-eslint/no-explicit-any": 'off',
		'vue/script-setup-uses-vars': 'error',
		"vue/html-indent": ["warn", "tab", {
			"attribute": 1,
			"baseIndent": 1
		}],
		"semi": ["error", "always"],
		"no-mixed-spaces-and-tabs": ["off"]
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
};
