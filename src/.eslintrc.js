module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'single'
		],
		'semi': [
			'never'
		],
		"rules": {
			"no-unused-vars": [{ "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
		}
	}
}
