export const checkResponse = (argument) => {

    let result = false;

    if (argument['ok']) {
        result = true;
    } else {
        throw new Error(`Failed to get the response from remote host. HTTP status code: ${argument.status}`);
    }

    return result;

};

export const getIngredientCategoryTitle = (argument) => {

    let result = 'Прочее';

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
            break;
    }

    return result;

};