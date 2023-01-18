import PropTypes from 'prop-types';

export const DATA_INGREDIENT_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const DATA_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
export const DATA_INGREDIENT_PROPTYPES = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
});
export const DATA_CONSTRUCTOR_PROPTYPES = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
});