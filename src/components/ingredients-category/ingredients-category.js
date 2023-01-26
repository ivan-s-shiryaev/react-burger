import PropTypes from 'prop-types';
import React from 'react';
import {
    useSelector,
} from 'react-redux';

// import {
//     INGREDIENT_PROPTYPES,
// } from '../../constants';
import {
    getMenuCategoryTitle,
} from '../../utils';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsCategoryStyles from './ingredients-category.module.css';

const IngredientsCategory = (props) => {

    const {
        id,
    } = props;

    const {
        items,
    } = useSelector((state) => state.menu);

    return (
        <React.Fragment>
            <h2
                className="text text_type_main-medium"
            >
                {getMenuCategoryTitle(id)}
            </h2>
            <ul
                className={`${ingredientsCategoryStyles.container}`}
            >
                {
                    items
                    .filter((value) => value.type === id)
                    .map((value) => {
                        return (
                            <BurgerIngredient
                                {...value}
                                key={`menu_item__${value._id}`}
                            />
                        );
                    })
                        
                }
            </ul>
        </React.Fragment>
    );

}

// BurgerIngredients.propTypes = {
//     data: PropTypes.objectOf(PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
// };

export default IngredientsCategory;