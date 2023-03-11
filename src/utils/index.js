export const validateName = (argument) => {

    const result = !!argument.length;

    return result;

};

export const validateEmail = (argument) => {

    const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(argument);

    return result;

};

export const validatePassword = (argument) => {

    const result = argument.length >= 6;

    return result;

};

export const checkResponse = (argument) => {

    let result = false;

    if (argument['ok']) {
        result = true;
    } else {
        throw new Error(`HTTP status code: ${argument.status}`);
    }

    return result;

};

export function getCookie(name) {
    
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;

}

export function setCookie(name, value, props) {

    props = props || {};
    let exp = props.expires;

    if (typeof exp == 'number' && exp) {

        const d = new Date();

        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;

    }

    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (const propName in props) {

        updatedCookie += '; ' + propName;

        const propValue = props[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }

    }

    document.cookie = updatedCookie;

}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
} 

export const getMenuCategoryTitle = (argument) => {

    let result = '';

    switch (argument) {
        case 'bun':
            result = 'Булки';
            break;
        case 'main':
            result = 'Начинки';
            break;
        case 'sauce':
            result = 'Соусы';
            break;
        default:
            result = argument;
            break;
    }

    return result;

};