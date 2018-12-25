const { developers } = require('../utils/mocks/developers');

/**
 * Obtiene todos los developers de la base de datos
 * Get all developers on DB
 * @returns {List} List of developers
 */
function listDevelopers() {
  return developers;
}

/**
 * Obtiene el nombre del developer por uid
 * Get developer name by uid
 * @param {String} uid of developer.
 * @returns {String} Developer name
 */
function findDeveloper(uid) {

    const picked = developers.find((developer) => developer.uid === uid);

    if (picked) {

        return picked.name;
    }

    return false;

}


module.exports = {
    findDeveloper,
    listDevelopers
};
