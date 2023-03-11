import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useNavigate,
    useLocation,
} from 'react-router-dom';
import {
    DndProvider,
} from 'react-dnd';
import {
    HTML5Backend,
} from 'react-dnd-html5-backend';

import {
    SET_MENU_ITEM,
} from '../services/actions/order';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';
import withModal from '../components/hocs/with-modal';
import styles from './home.module.css';

const WithModalBurgerConstructor = withModal(BurgerConstructor);

export function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;
    const {
        item,
        items,
    } = useSelector((state) => state.menu);

    React.useEffect(
        ()=> {

            dispatch({
                type: SET_MENU_ITEM,
                payload: null,
            });

            if (items.length > 0) {
                dispatch({
                    type: SET_MENU_ITEM,
                    payload: id,
                });
            }

        }
        , [
            dispatch,
            items.length,
            id,
        ]
    );

    const handleMenuItemModalClose = React.useCallback(
        () => {

            dispatch({
                type: SET_MENU_ITEM,
                payload: null,
            });

            navigate('/', {replace: true});

        }
        , [
            dispatch,
            navigate,
        ]
    );

    return (
        <React.Fragment>
            <DndProvider
                backend={HTML5Backend}
            >
                <main
                    className={styles.home}
                >
                    {
                        item
                        ? (
                            <Modal
                                header="Детали ингредиента"
                                handleClose={handleMenuItemModalClose}
                            >
                                <IngredientDetails />
                            </Modal>
                        )
                        : null
                    }
                    <article>
                        <h1
                            className="text text_type_main-large mt-10 mb-5"
                        >
                            Соберите бургер
                        </h1>
                        <BurgerIngredients />
                    </article>
                    <WithModalBurgerConstructor />
                </main>
                </DndProvider>
        </React.Fragment>
    );
}