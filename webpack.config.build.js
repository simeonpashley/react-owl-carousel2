var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var config = {
	devtool: 'source-map',
	entry:  {
		app: './index.jsx'
	},
	resolve: {
		extensions: ["", ".jsx", ".js"],
	},
	output: {
		path: path.join(__dirname, "public"),
		filename: "js/[name].min.js",
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel'],
				exclude: path.join(__dirname, 'node_modules'),
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader',
				],
			},
		],

		noParse: [],
	},
	postcss: function () {
		return [autoprefixer];
	},
};

module.exports = config;
