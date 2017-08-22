/* eslint-disable no-alert */
import initDB from '../json/init_db.json';

if (!window.localStorage) {
	alert(
		'🤔  Este projeto exemplo está construído com utilização delocalStorage' +
		'e seu browser não possui este suporte.' +
		'Por favor, atualize seu navegaor ou utilize um browser como Google Chrome ou Firefox'
	);
}

class fakeApi {
	static hasStorageAvailable(type) {
		try {
			const storage = window[type];
			const x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return e instanceof DOMException &&
				(
					// everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
				);
		}
	}

	constructor(...props) {
		console.log('asdasd');
		if (!fakeApi.hasStorageAvailable('localStorage')) {
			alert('Seu navegador não possui armazenamento local para poder utilizar esta aplicação demonstrativa');
			return false;
		}


		this.name = props.name || 'vehicles';
		this.DO = window.localStorage; // Data Object
		this.DoDefaultLimit = props.limit || 5;
		this.DOId = props.name || 'placa';
		this.defaultFields = {
			combustivel: ['Null', 'String'],
			imagem: ['Null', 'String'],
			marca: ['String'],
			placa: ['String'],
			modelo: ['String'],
			valor: ['Null', 'SafeInteger'],
		};
		this.get().catch(() => {
			this.initDO();
		});
	}

	get(filters = {}, page = 0, limit = this.DoDefaultLimit) {
		return new Promise((resolve, reject) => {
			const objectData = (
				JSON.parse(
					this.DO.getItem(this.name)
				)
			);

			if (!objectData) {
				reject('Não foi possível obter os dados dos veículos');
			} else if (filters.id) {
				if ({}.hasOwnProperty.call(objectData.items, filters.id)) {
					resolve({
						pagination: {
							page: 0,
							limit,
							length: 1
						},
						items: [objectData.items[filters.id]]
					});
				}
			} else {
				const itemsKeys = Object.keys(objectData.items).slice(page * limit, limit);
				resolve({
					pagination: {
						page,
						limit,
						length: itemsKeys.length
					},
					items: _.reduce(
						itemsKeys,
						(stack, key) => {
							/* eslint-disable no-param-reassign */
							stack[key] = objectData.items[key];
							/* eslint-enable */
							return stack;
						},
						{}
					)
				});
			}
		});
	}

	updateDO(data) {
		try {
			this.DO.setItem(this.name, JSON.stringify(data));
		} catch (e) {
			console.log(e);
			return false;
		}

		return true;
	}

	insert(itemData) {
		try {
			// verificar se os tipos são validos
			const hasErros = this.validateRequiredFields(itemData);
			if (hasErros.length) {
				throw new Error(hasErros.pop());
			}
			// verificar se item já existe;
			const dataObject = _.keyBy(itemData, this.DOId);
			const exist = this.findById(itemData[this.DOId]);
			if (exist.pagination.length) {
				throw new Error(`Não é possível inserir um item. Campo ${this.DOId} já existe com o valor informado.`);
			}
			const items = JSON.parse(
				this.DO.getItem(this.name) || '{}'
			);
			_.merge(items, dataObject);
			this.updateDO(items);
		} catch (e) {
			console.log(e);
			return false;
		}

		return true;
	}

	updateItemById(id, data) {
		let dataUpdate = _.assign({}, data);
		dataUpdate[this.DOId] = id;

		// verificar se os tipos são validos
		const hasErros = this.validateRequiredFields(dataUpdate);
		if (hasErros.length) {
			throw hasErros;
		}

		dataUpdate = _.keyBy(dataUpdate, this.DOId);

		const items = JSON.pase(
			this.DO.getItem(this.name) || '{}'
		);
		_.merge(items, dataUpdate);
		this.updateDO(items);

		return true;
	}

	findById(id) {
		return this.get({ id });
	}

	getAll() {
		return JSON.parse(
			this.DO.getItem(this.name) || '{}'
		);
	}

	initDO() {
		try {
			initDB.items = _.keyBy(initDB.items, this.DOId);
			this.updateDO(initDB);
		} catch (e) {
			console.log(e);
			return false;
		}

		return true;
	}

	validateRequiredFields(itemData) {
		const errors = [];
		const keys = Object.keys(this.defaultFields);
		for (let y = 0, k = keys.length; y < k; y = 1 + y) {
			const prop = keys[y];
			const rules = this.defaultFields[prop];
			let isValid = false;

			if ({}.hasOwnProperty.call(itemData, prop)) {
				// se existe o campo

				// se ao menos 1 dos itens for valido
				for (let i = 0, l = rules.length; i < l; i = 1 + i) {
					if (_[`id${rules[i]}`](itemData[prop])) {
						isValid = true;
						break;
					}
				}

				// se nenhum item era válido
				if (!isValid) {
					errors.push(`A propriedade ${prop} recebeu um valor diferente do tipo esperado: ${rules.join(', ')}`);
				}
			} else {
				// se não existe o campo

				// se ao menos 1 passar em um dos itens de validação
				for (let i = 0, l = rules.length; i < l; i = 1 + i) {
					if (_[`id${rules[i]}`](itemData[prop])) {
						isValid = true;
						break;
					}
				}

				// se nenhum item era válido
				if (!isValid) {
					errors.push(`A propriedade ${prop} recebeu um valor diferente do tipo esperado: ${rules.join(', ')}`);
				}
			}
		}

		return errors;
	}
}

export default fakeApi;
/* eslint-enable */
