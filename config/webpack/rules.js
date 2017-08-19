import Path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ConfigPackage from '../../package.json';

const rules = (Config) => {
	return [
		{
			enforce: 'pre',
			test: /\.(rt)$/,
			exclude: /node_modules/,
			loader: 'react-templates-loader',
			options: {
				targetVersion: '15.0.1',
				modules: 'amd',
			}
		},
		{
			enforce: 'pre',
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				configFile: Path.join(Config.root, '.eslintrc'),
				cache: false,
			}
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		},
		{
			test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
			exclude: /node_modules/,
			use: 'url-loader?limit=100000'
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
			  fallback: 'style-loader',
			  //resolve-url-loader may be chained before sass-loader if necessary
			  use: ['css-loader', 'sass-loader']
			})
		}
	];
};

export default rules;
