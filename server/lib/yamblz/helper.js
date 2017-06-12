/**
 * Проверить объект на наличие обязательных полей
 * @param {Object} obj
 * @param {Array} requiredFields
 * @returns {Boolean|Error} - true если валидация прошла успешно, иначе ошибка
 */
function validateRequiredFields(obj, requiredFields) {
    for (let i = 0; i < requiredFields.length; i++) {
        if (!obj.hasOwnProperty(requiredFields[i]) || !obj[requiredFields[i]]) {
            throw new Error(`Свойство ${requiredFields[i]} не должно быть пустым`);
        }
    }
}

/**
 * Проверить число на целое положительное значение
 * @param {Number} value
 * @returns {boolean}
 */
function isPositiveInteger(value) {
    if (Number.isInteger(value) && value > 0) {
        return true;
    }
}

/**
 * Обернуть value в массив
 * @param {String|Number|Object} value
 * @returns {Array}
 */
function wrapUpInArray(value) {
    if (value && !Array.isArray(value)) {
        return [value];
    }
    return value;
}

module.exports = {validateRequiredFields, isPositiveInteger, wrapUpInArray};