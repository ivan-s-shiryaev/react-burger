export const getIngredientCategoryTitle = (name) => {

    let result = 'Прочее';

    switch (name) {
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