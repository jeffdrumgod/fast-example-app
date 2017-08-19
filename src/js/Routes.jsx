import Modules from 'Modules/index.js';
import View404 from './views/404';

const { Redirect } = ReactRouterDOM;
const cleanUrl = (url = '') => url.replace(/\/\//g, '/');

const Routes = (appConfig) => {
	const moduleUrlReg = `${appConfig.baseURL}/:module?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?/:param6?`
		.replace(/^\/\//, '/');

	const routes = [
		{
			path: `${appConfig.baseURL}`,
			key: 'home',
			exact: true,
			render: (props) => {
				if (!appConfig.baseDashboard) {
					return (
						<View404 {...props}>
							Defina uma URL base para <code>baseDashboard</code>
						</View404>
					);
				} else if (appConfig.baseDashboard === '/') {
					if ({}.hasOwnProperty.call(Modules, 'dashboard')) {
						const Module = Modules.dashboard;
						return (
							<Module {...{
								appConfig,
								...props
							}} />
						);
					}

					return (
						<View404 {...props}>
							Não existe módulo com nome <code>dashboard</code>.
							Crie ou altere o valor de configuração para <code>baseDashboard</code>
						</View404>
					);
				}

				const dashs = appConfig.baseDashboard.match(/\//g).length;
				if (dashs > 0) {
					// redirect to `appConfig.baseDashboard`, valid page
					return (
						<Redirect {...{
							to: cleanUrl(`${appConfig.baseURL}${appConfig.baseDashboard}`)
						}} />
					);
				}

				return (
					<View404 {...props}>
						Por favor, verifique suas configurações para <code>baseDashboard</code>
					</View404>
				);
			},
		},
		{
			path: moduleUrlReg,
			key: 'dynamic',
			exact: true,
			render: (props) => {
				const params = (((props || {}).match || {}).params || {});
				const module = _.get(appConfig, `validRoutes.${params.module}`, false);

				// if module not in config
				if (!module) {
					console.error('👾  Module not present in app_config.validRoutes');
					return (
						<View404 {...props} />
					);
				}

				if (!{}.hasOwnProperty.call(Modules, module.component)) {
					console.error('👾  Module.component not exist in Modules app');
					return (
						<View404 {...props} />
					);
				}

				const Module = Modules[module.component];
				return (
					<Module {...{
						appConfig,
						...props
					}} />
				);
			},
		},
	];

	return routes;
};

export default Routes;
