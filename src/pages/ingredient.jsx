import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useParams,
    Link,
} from 'react-router-dom';

import {
    SET_MENU_ITEM,
} from '../services/actions/order';
// import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';

export function IngredientPage() {

    const dispatch = useDispatch();
    const {
        item,
        items,
        itemsRequest: request,
    } = useSelector((state) => state.menu);
    const { id } = useParams();

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

    // const handleMenuItemModalClose = React.useCallback(
    //     () => {

    //         dispatch({
    //             type: SET_MENU_ITEM,
    //             payload: null,
    //         });

    //         navigate('/', {replace: true});

    //     }
    //     , [
    //         dispatch,
    //         navigate,
    //     ]
    // );

    return (
        <React.Fragment>
                {/* // modal
                // ? item
                //     ? (
                //         <Modal
                //             header="Детали ингредиента"
                //             handleClose={handleMenuItemModalClose}
                //         >
                //             <IngredientDetails />
                //         </Modal>
                //     )
                //     : null
                // : ( */}
            {
                items.length === 0
                || request
                ? null
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
                {/* // ) */}
        </React.Fragment>
    );

}