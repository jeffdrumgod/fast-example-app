import * as fs from 'fs';
import _ from 'lodash';
import Path from 'path';


const automodules = (Config = {}) => {
	/*====================================================
	=            prepare all existent modules            =
	====================================================*/
	const modules = {};

	fs.readdirSync(Config.srcPathsJs.Modules).forEach(name => {
		const PathModule = Path.resolve(Config.srcPathsJs.Modules, name);
		if (fs.lstatSync(PathModule).isDirectory()) {
			modules[name] = `./${name}`;
		}
	});


	/*=====  End of prepare all existent modules  ======*/

	let ContentModulesFileExport = '	moduleBase,\n	ready,\n';
	let ContentModulesFileImport = '';
	let ContentModulesFile = `const moduleBase = true;\nconst ready = true;`;

	if (!_.isEmpty(modules)) {
		for (let module in modules) {
			if ({}.hasOwnProperty.call(modules, module)) {
				ContentModulesFileImport +=  `import ${_.camelCase(module)} from '${modules[module]}';\n`;
				ContentModulesFileExport +=  `	${_.camelCase(module)},\n`;
			}
		}
	}

	ContentModulesFile = `${ContentModulesFileImport}\n${ContentModulesFile}\nexport default {\n${ContentModulesFileExport}};\n`;

	return ContentModulesFile;
}

export default automodules;
