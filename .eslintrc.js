module.exports = {
    root: true,

    env: {
		node: true
	},

    extends: [
    	"plugin:vue/essential",
	    "eslint:recommended"
    ],

    parserOptions: {
		parser: 'babel-eslint'
	},

    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',
      'semi': 'warn',
      'no-prototype-builtins': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-unused-vars': 'warn',
      'vue/html-quotes': 'error',
      'vue/html-self-closing': 'warn',
      'vue/name-property-casing': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/attributes-order': 'warn',
      'vue/no-confusing-v-for-v-if': 'warn',
      'vue/order-in-components': 'warn',
      'vue/this-in-template': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/require-name-property': 'error',
      'vue/space-unary-ops': 'warn'
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
	],
};
