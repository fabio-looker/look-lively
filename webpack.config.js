const path = require('path')

module.exports = {
	//mode: 'development',
	entry: {
		index: './src/index.js',
		},
	devServer: {
		https: true,
		headers: { "Access-Control-Allow-Origin": "*" }
		//hot: false, //Enable pre-7.2: The injected script doesn't really handle null-origin sandboxing very well
		//inline: false, // ^ See above
		},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: '[name].chunk.js',
		publicPath: 'https://localhost:8080/dist/',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['css-loader'],
				},
			],
		}
	}