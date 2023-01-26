import PropTypes from 'prop-types';
import React, {
    useEffect,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useDrag,
} from "react-dnd";
import {
    Counter,
    CurrencyIcon,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

// import {
//     INGREDIENT_PROPTYPES,
// } from '../../constants';
import {
    getMenuCategoryTitle,
} from '../../utils';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {
    SET_MENU_ITEM,
    HIDE_MODAL,
    getMenuItems,
} from '../../services/actions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientsCategory from '../ingredients-category/ingredients-category';

const BurgerIngredients = (props) => {

    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(getMenuItems());
    }, [dispatch]);

    const {
        item,
        category,
        categories,
    } = useSelector((state) => state.menu);

    const handleMenuItemModalClose = React.useCallback(
        () => {

            dispatch({ type: HIDE_MODAL });

            dispatch({
                type: SET_MENU_ITEM,
                id: null,
            });

        }, [dispatch]
    );

    return (
        <React.Fragment>
            <nav
                className={`${burgerIngredientsStyles.menu}`}
            >
                {
                    [...categories]
                    .map((value) => {
                        return (
                            <Tab
                                value={value}
                                active={value === category}
                                key={`menu_tab__${value}`}
                            >
                                {getMenuCategoryTitle(value)}
                            </Tab>
                        );
                    })
                }
            </nav>
            {
                <div
                    className={`${burgerIngredientsStyles.container}`}
                >
                    {
                        [...categories]
                        .map((value) => {
                                return (
                                    <IngredientsCategory
                                        id={value}
                                        key={`menu_category__${value}`}
                                    />
                                // <React.Fragment
                                //     key={`panel__${value_category}`}
                                // >
                                //     <h2
                                //         className="text text_type_main-medium"
                                //     >
                                //         {getMenuCategoryTitle(value_category)}
                                //     </h2>
                                //     <ul>
                                //         {
                                //             items
                                //             .filter((value_item) => value_item.type === value_category)
                                //             .map((value_item) => {
                                //                 return (
                                //                     <li
                                //                         key={`menu_item__${value_item._id}`}
                                //                     >
                                //                         <a
                                //                             href="/"
                                //                             onClick={handleMenuItemClick(value_item._id)}
                                //                         >
                                //                             <div>
                                //                                 <img
                                //                                     src={value_item.image_large}
                                //                                     alt={value_item.name}
                                //                                 />
                                //                                 <span
                                //                                     className="text text_type_digits-default"
                                //                                 >
                                //                                     {value_item.price}
                                //                                     <CurrencyIcon
                                //                                         type="primary"
                                //                                     />
                                //                                 </span>
                                //                             </div>
                                //                             <h3
                                //                                 className="text text_type_main-small"
                                //                             >
                                //                                 {value_item.name}
                                //                             </h3>
                                //                         </a>
                                //                     </li>
                                //                 );
                                //             })
                                                
                                //         }
                                //     </ul>
                                // </React.Fragment>
                            );
                        })
                    }
                </div>
            }
            {
                props.modal
                && item
                && (
                    <Modal
                        header="Детали ингредиента"
                        handleClose={handleMenuItemModalClose}
                    >
                        <IngredientDetails />
                    </Modal>
                )
            }
            
        </React.Fragment>
    );

}

// BurgerIngredients.propTypes = {
//     data: PropTypes.objectOf(PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
// };

export default BurgerIngredients;