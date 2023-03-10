import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
                payload: null,
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
                        .map((value) => (
                            <React.Fragment
                                key={`menu_category__${value}`}
                            >
                                <IngredientsCategory
                                    ref={categoryRefs.get(value) || null}
                                    id={value}
                                />
                            </React.Fragment>
                        ))
                    }
                </div>
            }
            {
                props.modal === 'menu'
                && item
                && (
                    <Modal
                        header="???????????? ??????????????????????"
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

};

export default BurgerIngredients;