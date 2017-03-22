export function delegate(container, selector, event, handler) {
    container.addEventListener(event, function (e) {
        if (e.target.matches(selector)) {
            handler.apply(e.target, arguments);
        }
    });
}

export function getFormData(form) {
    return [].reduce.call(
        form.querySelectorAll('input, textarea, select'),
        (result, formElement) => {
            if (formElement.multiple && formElement.options.length > 0) {
                let values = [];
                for (let i = 0; i < formElement.options.length; i++) {
                    let option = formElement.options[i];
                    if(option.selected) {
                        values.push(option.value);
                    }
                }
                result[formElement.name] = values;
            } else {
                result[formElement.name] = formElement.value;
            }
            return result;
        }, {}
    );
}

export function leadZero(num) {
    return num < 10 ? '0' + num : num;
}

export function getTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    date.setHours(date.getHours(), date.getMinutes() + date.getTimezoneOffset());
    return leadZero(date.getHours()) + ":" + leadZero(date.getMinutes());
}

export function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return [leadZero(day), leadZero(month), year].join('.');
}