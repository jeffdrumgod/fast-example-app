import _ from 'lodash';
import * as fs from 'fs';
import ConfigPackage from '../package.json';
import Path from 'path';
import Webpack  from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import languages from './languages.js';

import webpackExternalsFromNodeModule from './webpack/externalsFromNodeModule.js';
import webpackRules from './webpack/rules.js';
import webpackProvidePlugin from './webpack/providePlugin.js';
import automodules from './webpack/automodules.js';

let Config = {};


Config.root    					= Path.resolve(__dirname, '..');
Config.node_modules    			= Path.resolve(Config.root, 'node_modules');
Config.bundlePath    			= Path.join(Config.root, 'dist');
Config.srcPath       			= Path.join(Config.root, 'src');
Config.srcThemePath = Path.join(Config.root, 'themes');
Config.ModulesFileIndex   		= Path.join(Config.srcPath, 'modules', 'index.js');
Config.bundleVendorsPathName    = 'vendors';
Config.srcPathsJs      			= {
	Templates: Path.join(Config.srcPath, 'templates'),
	Modules: Path.join(Config.srcPath, 'modules'),
};

Config.environment = '';
switch (process.env.npm_lifecycle_event) {
	case 'start':
		Config.environment = 'development';
		break;
	case 'build':
		Config.environment = 'production';
		break;
}

Config.entryFiles = {
	'Index': Path.resolve(Path.join(Config.srcPath, 'js', 'Index.jsx'))
};


const automodulesConfig = automodules(Config);
fs.writeFileSync(Config.ModulesFileIndex, automodulesConfig, 'utf8');

Config.outPutFilesHtml = [
	['Index.js']
];

Config.output = {
	filename   	: '[name].js',
	path       	: Config.bundlePath,
	library		: ['FastExampleApp', 'react', '[name]'],
};

Config.resolve = {
	modules: [
		'node_modules',
		Config.srcPathsJs.Templates
	],
	extensions : ['.css', '.scss', '.js', '.jsx', '.rt'],
	alias: {
		src: Config.srcPath,
		Modules: Config.srcPathsJs.Modules,
		Templates: Config.srcPathsJs.Templates,
		Redux: Path.join(Config.srcPath, 'js', 'redux'),
	}
};

Config.externalsFromNodeModule = webpackExternalsFromNodeModule(Config);
Config.rules = webpackRules(Config);

Config.ExtraOptions = {
	ProvidePlugin: webpackProvidePlugin,
	CopyWebpackPlugin: [
		{
			from: Path.join(Config.srcPath, 'json'),
			to: Path.join(Config.bundlePath, 'json')
		},
	],
	UglifyJsPlugin: {
		cacheFolder : Config.bundlePath,
		debug       : true,
		compress    : { warnings: false },
		output      : { comments: false },
		sourceMap   : true
	},
	HTMLWebpackPlugin: {
		filename: 'index.js',
		template: Path.join(Config.srcPath, 'index.js.ejs'),
		outPutFiles: Config.outPutFilesHtml,
		inject: false,
		scripts: []
	},
	HTMLWebpackPlugin2: {
		title: 'Fast Example App',
		filename: 'index.html',
		template: Path.join(Config.srcPath, 'index.html.ejs'),
		inject: false,
		scripts: []
	},
};

Config.externals = {};

_.forEach(
	Config.externalsFromNodeModule,
	(item) => {
		Config.ExtraOptions.CopyWebpackPlugin.push(
			{
				from: item.from,
				to: Path.join(Config.bundlePath, Config.bundleVendorsPathName, item.name, item.version, item.fileName)
			}
		);

		Config.ExtraOptions.HTMLWebpackPlugin.scripts.push(
			{
				src: [Config.bundleVendorsPathName, item.name, item.version, item.fileName].join('/')
			}
		);
		Config.ExtraOptions.HTMLWebpackPlugin2.scripts.push(
			{
				src: [Config.bundleVendorsPathName, item.name, item.version, item.fileName].join('/')
			}
		);

		if (item.external) {
			Config.externals[item.name] = item.externalOptions;
		}

		if (item.external) {
			Config.externals[item.name] = item.externalOptions;
		}
	}
);


Config.plugins = [
	new CaseSensitivePathsPlugin(),
	new ExtractTextPlugin({
		filename: '[name].css',
		allChunks: true
	}),
	new Webpack.ProvidePlugin(
		Config.ExtraOptions.ProvidePlugin
	)
];


Config.languages = languages;

export default Config;
