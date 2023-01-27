// import PropTypes from 'prop-types';
import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    // Counter,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

// import {
//     INGREDIENT_PROPTYPES,
// } from '../../constants';
import {
    getMenuCategoryTitle,
} from '../../utils';
import {
    SET_MENU_ITEM,
    SET_MENU_CATEGORY,
    HIDE_MODAL,
    getMenuItems,
} from '../../services/actions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import burgerIngredientsStyles from './burger-ingredients.module.css';

const BurgerIngredients = (props) => {

    const {
        item,
        category,
        categories,
    } = useSelector((state) => state.menu);

    const dispatch = useDispatch();

    React.useEffect(
        ()=> {
            dispatch(getMenuItems());
        }
        , [ dispatch ]
    );

    const categoryRefs = React.useMemo(
        ()=> [...categories].reduce(
            (accumulator, value) => accumulator.set(value, React.createRef())
            , new Map()
        )
        , [ categories ]
    );

    const containerRef = React.useRef();

    const handleMenuScroll = React.useCallback(
        () => {

            const ref = categoryRefs.get(category);
            const origin = containerRef.current.getBoundingClientRect().top;
            const offset = ref === undefined
                ? Infinity
                : Math.abs(origin - ref.current.getBoundingClientRect().top)
            ;
            const current = [...categoryRefs].reduce(
                (accumulator, [key, value]) => 
                    Math.abs(origin - value.current.getBoundingClientRect().top) < offset
                        ? key 
                        : accumulator
                , category
            );

            if (current !== category) dispatch({
                type: SET_MENU_CATEGORY,
                payload: current,
            });

        }
        , [
            category,
            dispatch,
            containerRef,
            categoryRefs,
        ]
    );

    const handleMenuItemModalClose = React.useCallback(
        () => {

            dispatch({ type: HIDE_MODAL });

            dispatch({
                type: SET_MENU_ITEM,
                id: null,
            });

        }
        , [ dispatch ]
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
                    ref={containerRef}
                    onScroll={handleMenuScroll}
                    className={`${burgerIngredientsStyles.container}`}
                >
                    {
                        [...categories]
                        .map((value) => {
                                return (
                                    <div
                                        ref={categoryRefs.has(value) ? categoryRefs.get(value) : null}
                                        key={`menu_category__${value}`}
                                    >
                                        <IngredientsCategory
                                            id={value}
                                        />
                                    </div>
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
            {
                categoryRefs.get(category) !== undefined
                && categoryRefs.get(category).current !== null
                    ? categoryRefs.get(category).current.scrollIntoView({ behavior: "smooth" })
                    : null
            } 
        </React.Fragment>
    );

}

// BurgerIngredients.propTypes = {
//     data: PropTypes.objectOf(PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
// };

export default BurgerIngredients;