var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/lunch');
var APP_DIR = path.resolve(__dirname, 'lunch/client/app');

var config = {
 	entry: {
		app: APP_DIR + '/app.jsx'
 	},
 	output: {
		path: BUILD_DIR,
		filename: '[name].js'
 	},
	module : {
		loaders : [
			{
			test : /\.jsx?/,
			include : APP_DIR,
			loader : 'babel'
			}
		]
	}
};

module.exports = config;
