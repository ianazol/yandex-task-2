/**
 * Проверить объект на наличие обязательных полей
 * @param {Object} obj
 * @param {Array} requiredFields
 * @returns {Boolean|Error} - true если валидация прошла успешно, иначе ошибка
 */
function validateRequiredFields(obj, requiredFields) {
    for (let i = 0; i < requiredFields.length; i++) {
        if (!obj.hasOwnProperty(requiredFields[i]) || !obj[requiredFields[i]]) {
            return new Error(`Свойство ${requiredFields[i]} не должно быть пустым`);
        }
    }
    return true;
}

module.exports = {validateRequiredFields};