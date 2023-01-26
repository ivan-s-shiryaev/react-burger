export const checkResponse = (argument) => {

    let result = false;

    if (argument['ok']) {
        result = true;
    } else {
        throw new Error(`Failed to get the response from remote host. HTTP status code: ${argument.status}`);
    }

    return result;

};

export const makeMakeItem = (argument) => {

    const result = {
        _id: argument._id,
        type: argument.type,
        name: argument.name,
        price: argument.price,
        image: argument.image,
        image_large: argument.image_large,
        calories: argument.calories,
        proteins: argument.proteins,
        fat: argument.fat,
        carbohydrates: argument.carbohydrates,
        // count: countConstructorItem(argument._id),
    };

    return result;

};

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