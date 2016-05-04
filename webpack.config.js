var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/lunch');
var APP_DIR = path.resolve(__dirname, 'lunch/client/app');

var config = {
 	entry: {
 		add_restaurant: APP_DIR + '/add_restaurant.jsx',
 		restaurant: APP_DIR + '/restaurant.jsx'
 	},
 	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js'
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
