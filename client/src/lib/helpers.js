import React from 'react';

export const addItem = (list, item) => [...list, item];

export const removeItem = (list, id) => {
    const removeIndex = list.findIndex(item => item._id === id);
    return [
        ...list.slice(0, removeIndex),
        ...list.slice(removeIndex + 1)
    ];
};

export const updateItem = (list, updated) => {
    const updatedIndex = list.findIndex(item => item._id === updated._id);
    return [
        ...list.slice(0, updatedIndex),
        updated,
        ...list.slice(updatedIndex + 1)
    ];
};

export const leadZero = (num) => {
    return num < 10 ? '0' + num : num;
};

export const getTime = (date) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    date.setHours(date.getHours(), date.getMinutes() + date.getTimezoneOffset());
    return leadZero(date.getHours()) + ":" + leadZero(date.getMinutes());
};

export const formatDate = (date) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return [leadZero(day), leadZero(month), year].join('.');
};

export const getFormData = (fields) => {
    let data = {};
    fields.forEach((field) => {
        if (field.multiple && field.options.length > 0) {
            let selectedOptions = [];
            for (let i = 0; i < field.options.length; i++) {
                let option = field.options[i];
                if (option.selected) {
                    selectedOptions.push(option.value);
                }
            }
            data[field.name] = selectedOptions;
        } else {
            data[field.name] = field.value;
        }
    });
    return data;
};

export const createOptionList = (list) => {
    return list.map(item => <option key={item._id} value={item._id}>{item.name}</option>);
};

export const validate = (obj) => {
    if (obj.date && !Date.parse(obj.date)) {
        return Promise.reject(new Error('Некорректно введена дата, формат: YYYY-MM-DD'));
    }
    if ((obj.start && !Date.parse(obj.start)) || (obj.finish && !Date.parse(obj.finish))) {
        return Promise.reject(new Error('Некорректно введено время, формат: HH:mm'));
    }

    return Promise.resolve(obj);
};