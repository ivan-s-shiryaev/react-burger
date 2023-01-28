// import PropTypes from 'prop-types';
import React from 'react';
import {
    useDispatch,
} from 'react-redux';
import {
    useDrag
} from "react-dnd";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

// import {
//     INGREDIENT_PROPTYPES,
// } from '../../constants';
import {
    SET_MENU_ITEM,
    SHOW_MODAL,
} from '../../services/actions';
import burgerIngredientStyles from './burger-ingredient.module.css';

const BurgerIngredient = (props) => {

    const {
        _id: id,
        type,
        name,
        price,
        count,
        image_large,
    } = props;

    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'menu',
        item: {
            id,
            type,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    const handleMenuItemClick = React.useCallback(
        (id) => (event) => {

            event.preventDefault();
            event.stopPropagation();

            dispatch({ type: SHOW_MODAL });

            dispatch({
                type: SET_MENU_ITEM,
                payload: id,
            });
    
        }
        , [ dispatch ]
    );

    return (
        
        <li
            ref={dragRef}
            className={`${burgerIngredientStyles.container} ${isDragging ? burgerIngredientStyles.dragging : ''}`}
            draggable
        >
            <a
                href="/"
                onClick={handleMenuItemClick(id)}
            >
                {
                    count > 0 && (
                        <Counter
                            count={count}
                            size="default"
                        />
                    )
                }
                <div>
                    <img
                        src={image_large}
                        alt={name}
                    />
                    <span
                        className="text text_type_digits-default"
                    >
                        {price}
                        <CurrencyIcon
                            type="primary"
                        />
                    </span>
                </div>
                <h3
                    className="text text_type_main-small"
                >
                    {name}
                </h3>
            </a>
        </li>
    );

}

// BurgerIngredients.propTypes = {
//     data: PropTypes.objectOf(PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
// };

export default BurgerIngredient;