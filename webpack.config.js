const path = require('path')

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
		},
	devServer: {
		https: true,
		hot: false, //The injected script doesn't really handle null-origin sandboxing very well
		inline: false, // ^ See above
		},
	output: {
		//path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/',
		}
	}