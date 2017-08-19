import _ from 'lodash';
import Config from '../config.js';
import ConfigPackage from '../../package.json';
import Webpack  from 'webpack';
import Path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
// import I18nPlugin from 'i18n-webpack-plugin';

// let dev = Object.keys(Config.languages).map(language => ({
let prd = {
	entry: Config.entryFiles,
	output: _.merge(
		Config.output
	),
	resolve: Config.resolve,
	devtool : 'source-map',
	module: {
		rules: Config.rules
	},
	externals: Config.externals,
	plugins: [
		new Webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(Config.environment),
				app_config: JSON.stringify(Config.app_config),
				ConfigPackage: {
					name: JSON.stringify(ConfigPackage.name),
					version: JSON.stringify(ConfigPackage.version)
				},
			}
		}),
	// 	// new I18nPlugin(
	// 	// 	Config.languages[language]
	// 	// ),
		new Webpack.optimize.UglifyJsPlugin(
			_.merge(
				{},
				Config.ExtraOptions.UglifyJsPlugin,
				{
					exclude		: ['index.html', 'index.js'],
					ie8			: false,
					debug       : false,
					compress    : { warnings: false },
					output      : { comments: false },
				}
			)
		),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: cssnano,
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
		new HTMLWebpackPlugin(
			_.merge(
				{},
				Config.ExtraOptions.HTMLWebpackPlugin,
				Config.ExtraOptions.jsonDev,
				{
					environment: Config.environment,
					cache: false,
				}
			)
		),
		new HTMLWebpackPlugin(
			_.merge(
				{},
				Config.ExtraOptions.HTMLWebpackPlugin2,
				Config.ExtraOptions.jsonDev,
				{
					environment: Config.environment,
					cache: false,
				}
			)
		),
		new CopyWebpackPlugin(
			_.reduce(
				Config.ExtraOptions.CopyWebpackPlugin,
				(that, e, i) => {

					if (!!e.from && _.isPlainObject(e.from)) {
						e.from = e.from[Config.environment];
					}

					if (!!e.to && _.isPlainObject(e.to)) {
						e.to = e.to[Config.environment];
					}

					that.push(e);
					return that;
				},
				[]
			)
		),
		...Config.plugins,
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: `${ConfigPackage.name}-BundleAnalyzerReport.html`,
			openAnalyzer: false,
		}),
	]
};
// }));

export default prd;
