const pgPromise = require('pg-promise');
const promise = require('bluebird');
const config = require('config');

const createDb = (dbUrl) => {
	const initOptions = {
		promiseLib: promise,
		error(error) {
			return {
				...error,
				DB_ERROR: true
			}
		}
	}

	const pgp = pgPromise(initOptions);
	const db = pgp(dbUrl);
	return db;
}

module.exports = createDb(config.get("DATABASE_URL"))