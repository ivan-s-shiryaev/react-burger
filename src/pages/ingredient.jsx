import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useNavigate,
    useLocation,
    useParams,
    Link,
} from 'react-router-dom';

import {
    SET_MENU_ITEM,
    getMenuItems,
} from '../services/actions/order';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import AppHeader from '../components/app-header/app-header';
import styles from './ingredient.module.css';

export function IngredientPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const modal = !!location.state?.modal;

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

            if (modal && items.length > 0) {
                dispatch({
                    type: SET_MENU_ITEM,
                    payload: id,
                });
            } else {
                (
                    async () => {

                        await dispatch(getMenuItems());

                        dispatch({
                            type: SET_MENU_ITEM,
                            payload: id,
                        });

                    }
                )();
            }

        }
        , [
            dispatch,
            modal,
            id,
            items,
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
            <AppHeader />
            {
                modal
                ? item
                    ? (
                        <Modal
                            header="Детали ингредиента"
                            handleClose={handleMenuItemModalClose}
                        >
                            <IngredientDetails />
                        </Modal>
                    )
                    : null
                : (
                    <main
                        className={styles.wrapper}
                    >
                        <article
                            className={styles.container}
                        >
                            {
                                item
                                ? (
                                    <React.Fragment>
                                        <h1
                                            className={`${styles.header} text text_type_main-large`}
                                        >
                                            Детали ингредиента
                                        </h1>
                                        <IngredientDetails />
                                    </React.Fragment>
                                )
                                : (
                                    <React.Fragment>
                                        <h1
                                            className="text text_type_main-medium"
                                        >
                                            Такого ингредиента нет...
                                        </h1>
                                        <p
                                            className="text text_type_main-default text_color_inactive mt-20"
                                        >
                                            Вернитесь в <Link to="/">конструктор</Link>
                                        </p>
                                    </React.Fragment>
                                )
                            }
                        </article>
                    </main>
                )
            }
        </React.Fragment>
    );

}