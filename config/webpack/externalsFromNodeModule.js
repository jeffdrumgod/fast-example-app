import Path from 'path';
import ConfigPackage from '../../package.json';

const externalsFromNodeModule = (Config) => {
	return [
		{
			name: 'babel-polyfill',
			fileName: 'babel-polyfill.js',
			from: {
				production: Path.join(Config.node_modules, 'babel-polyfill', 'dist', 'polyfill.min.js'),
				development: Path.join(Config.node_modules, 'babel-polyfill', 'dist', 'polyfill.js'),
			},
			version: ConfigPackage.dependencies['babel-polyfill'],
			external: true,
			externalOptions: {
				root: 'babel-polyfill',
				commonjs2: 'babel-polyfill',
				commonjs: 'babel-polyfill',
				amd: 'babel-polyfill',
			}
		},
		{
			name: '_',
			fileName: 'lodash.js',
			from: {
				production: Path.join(Config.node_modules, 'lodash', 'lodash.min.js'),
				development: Path.join(Config.node_modules, 'lodash', 'lodash.js'),
			},
			version: ConfigPackage.dependencies['lodash'],
			external: true,
			externalOptions: {
				root: '_',
				commonjs2: 'lodash',
				commonjs: 'lodash',
				amd: 'lodash',
			}
		},
		// {
		// 	name: 'scriptjs',
		// 	fileName: 'scriptjs.js',
		// 	from: {
		// 		production: Path.join(Config.node_modules, 'scriptjs', 'dist', 'script.min.js'),
		// 		development: Path.join(Config.node_modules, 'scriptjs', 'dist', 'script.js'),
		// 	},
		// 	version: ConfigPackage.dependencies['scriptjs'],
		// 	external: true,
		// 	externalOptions: {
		// 		root: '$scriptjs',
		// 		commonjs2: '$scriptjs',
		// 		commonjs: '$scriptjs',
		// 		amd: '$scriptjs',
		// 	}
		// },
		// {
		// 	name: 'moment',
		// 	fileName: 'moment.js',
		// 	from: {
		// 		production: Path.join(Config.node_modules, 'moment', 'min', 'moment.min.js'),
		// 		development: Path.join(Config.node_modules, 'moment', 'moment.js'),
		// 	},
		// 	version: ConfigPackage.dependencies['moment'],
		// 	external: true,
		// 	externalOptions: {
		// 		root: 'moment',
		// 		commonjs2: 'moment',
		// 		commonjs: 'moment',
		// 		amd: 'moment',
		// 	}
		// },
		{
			name: 'prop-types',
			fileName: 'prop-types.js',
			from: {
				production: Path.join(Config.node_modules, 'prop-types', 'prop-types.min.js'),
				development: Path.join(Config.node_modules, 'prop-types', 'prop-types.js'),
			},
			version: ConfigPackage.dependencies['prop-types'],
			external: true,
			externalOptions: {
				root: 'PropTypes',
				commonjs2: 'PropTypes',
				commonjs: 'PropTypes',
				amd: 'PropTypes',
			}
		},
		{
			name: 'React',
			fileName: 'react.js',
			from: {
				production: Path.join(Config.node_modules, 'react', 'dist', 'react.min.js'),
				development: Path.join(Config.node_modules, 'react', 'dist', 'react.js'),
			},
			version: ConfigPackage.dependencies.react,
			external: true,
			externalOptions: {
				root: 'React',
				commonjs2: 'React',
				commonjs: 'React',
				amd: 'React',
			}
		},
		{
			name: 'react-dom',
			fileName: 'react-dom.js',
			from: {
				production: Path.join(Config.node_modules, 'react-dom', 'dist', 'react-dom.min.js'),
				development: Path.join(Config.node_modules, 'react-dom', 'dist', 'react-dom.js'),
			},
			version: ConfigPackage.dependencies['react-dom'],
			external: true,
			externalOptions: {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
			}
		},
		{
			name: 'react-router-dom',
			fileName: 'react-router-dom.js',
			from: {
				production: Path.join(Config.node_modules, 'react-router-dom', 'umd', 'react-router-dom.min.js'),
				development: Path.join(Config.node_modules, 'react-router-dom', 'umd', 'react-router-dom.js'),
			},
			version: ConfigPackage.dependencies['react-router'],
			external: true,
			externalOptions: {
				root: 'ReactRouterDOM',
				commonjs2: 'react-router-dom',
				commonjs: 'react-router-dom',
				amd: 'react-router-dom',
			}
		},
		// {
		// 	name: 'classnames',
		// 	fileName: 'classnames.js',
		// 	from: {
		// 		production: Path.join(Config.node_modules, 'classnames', 'index.js'),
		// 		development: Path.join(Config.node_modules, 'classnames', 'index.js'),
		// 	},
		// 	version: ConfigPackage.dependencies['classnames'],
		// 	external: true,
		// 	externalOptions: {
		// 		root: 'classNames',
		// 		commonjs2: 'classnames',
		// 		commonjs: 'classnames',
		// 		amd: 'classnames',
		// 	}
		// },
		{
			name: 'redux',
			fileName: 'redux.js',
			from: {
				production: Path.join(Config.node_modules, 'redux', 'dist', 'redux.min.js'),
				development: Path.join(Config.node_modules, 'redux', 'dist', 'redux.js'),
			},
			version: ConfigPackage.dependencies['redux'],
			external: true,
			externalOptions: {
				root: 'Redux',
				commonjs2: 'redux',
				commonjs: 'redux',
				amd: 'redux',
			}
		},
		{
			name: 'react-redux',
			fileName: 'react-redux.js',
			from: {
				production: Path.join(Config.node_modules, 'react-redux', 'dist', 'react-redux.min.js'),
				development: Path.join(Config.node_modules, 'react-redux', 'dist', 'react-redux.js'),
			},
			version: ConfigPackage.dependencies['redux'],
			external: true,
			externalOptions: {
				root: 'ReactRedux',
				commonjs2: 'react-redux',
				commonjs: 'react-redux',
				amd: 'react-redux',
			}
		},
		{
			name: 'react-router-redux',
			fileName: 'react-router-redux.js',
			from: {
				production: Path.join(Config.node_modules, 'react-router-redux', 'dist', 'ReactRouterRedux.min.js'),
				development: Path.join(Config.node_modules, 'react-router-redux', 'dist', 'ReactRouterRedux.js'),
			},
			version: ConfigPackage.dependencies['react-router-redux'],
			external: true,
			externalOptions: {
				root: 'ReactRouterRedux',
				commonjs2: 'react-router-redux',
				commonjs: 'react-router-redux',
				amd: 'react-router-redux',
			}
		},
		{
			name: 'redux-form',
			fileName: 'redux-form.js',
			from: {
				production: Path.join(Config.node_modules, 'redux-form', 'dist', 'redux-form.min.js'),
				development: Path.join(Config.node_modules, 'redux-form', 'dist', 'redux-form.js'),
			},
			version: ConfigPackage.dependencies['redux-form'],
			external: true,
			externalOptions: {
				root: 'ReduxForm',
				commonjs2: 'redux-form',
				commonjs: 'redux-form',
				amd: 'redux-form',
			}
		},
		{
			name: 'redux-saga',
			fileName: 'redux-saga.js',
			from: {
				production: Path.join(Config.node_modules, 'redux-saga', 'dist', 'redux-saga.min.js'),
				development: Path.join(Config.node_modules, 'redux-saga', 'dist', 'redux-saga.js'),
			},
			version: ConfigPackage.dependencies['redux-saga'],
			external: true,
			externalOptions: {
				root: 'ReduxSaga',
				commonjs2: 'redux-saga',
				commonjs: 'redux-saga',
				amd: 'redux-saga',
			}
		},
		{
			name: 'axios',
			fileName: 'axios.js',
			from: {
				production: Path.join(Config.node_modules, 'axios', 'dist', 'axios.min.js'),
				development: Path.join(Config.node_modules, 'axios', 'dist', 'axios.js'),
			},
			version: ConfigPackage.dependencies['axios'],
			external: true,
			externalOptions: {
				root: 'axios',
				commonjs2: 'axios',
				commonjs: 'axios',
				amd: 'axios',
			}
		},
		{
			name: 'history',
			fileName: 'history.js',
			from: {
				production: Path.join(Config.node_modules, 'history', 'umd', 'history.min.js'),
				development: Path.join(Config.node_modules, 'history', 'umd', 'history.js'),
			},
			version: ConfigPackage.dependencies['history'],
			external: true,
			externalOptions: {
				root: 'History',
				commonjs2: 'history',
				commonjs: 'history',
				amd: 'history',
			}
		},
		// {
		// 	name: 'cssloader',
		// 	fileName: 'cssloader.js',
		// 	from: {
		// 		production: Path.join(Config.node_modules, 'cssloader', 'umd', 'cssloader.min.js'),
		// 		development: Path.join(Config.node_modules, 'cssloader', 'umd', 'cssloader.js'),
		// 	},
		// 	version: ConfigPackage.dependencies['cssloader'],
		// 	external: true,
		// 	externalOptions: {
		// 		root: 'cssloader',
		// 		commonjs2: 'cssloader',
		// 		commonjs: 'cssloader',
		// 		amd: 'cssloader',
		// 	}
		// },
	];
};

export default externalsFromNodeModule;
