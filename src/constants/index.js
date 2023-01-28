import PropTypes from 'prop-types';

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENT_PROPTYPES = {
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};
export const MODAL_PROPTYPES = {
    modal: PropTypes.string.isRequired,
};