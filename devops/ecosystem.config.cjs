module.exports = {
	apps: [
		{
			name: 'srm:4173',
			script: 'devops/index.cjs',
			instances: 1,
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: 'production'
			}
		}
	]
}
