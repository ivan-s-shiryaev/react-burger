import PropTypes from 'prop-types';
import React from 'react';
import {
    useSelector,
} from 'react-redux';

import {
    getMenuCategoryTitle,
} from '../../utils';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsCategoryStyles from './ingredients-category.module.css';

const IngredientsCategory = React.forwardRef((props, ref) => {

    const {
        id,
    } = props;

    const {
        menu,
    } = useSelector((state) => state);

    const items = React.useMemo(
        () => menu.items.filter((value) => value.type === id)
        , [id, menu.items]
    );

    return (
        <React.Fragment>
            <h2
                ref={ref}
                className="text text_type_main-medium"
            >
                {getMenuCategoryTitle(id)}
            </h2>
            <ul
                className={`${ingredientsCategoryStyles.container}`}
            >
                {
                    items
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

});

IngredientsCategory.propTypes = {
    id: PropTypes.string.isRequired,
};

export default IngredientsCategory;