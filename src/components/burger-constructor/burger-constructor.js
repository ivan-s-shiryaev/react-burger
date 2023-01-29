import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import {
    useDrop,
} from "react-dnd";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    SHOW_MODAL,
    HIDE_MODAL,
    addOrderItem,
    getOrderStatus,
} from '../../services/actions';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderItem from '../order-item/order-item';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {

    const {
        menu: {
            items,
        },
        order: {
            total,
            items: {
                locked,
                unlocked,
            },
            status,
        },
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: 'menu',
        drop(item) {
            dispatch(addOrderItem(item));
        },
    });

    const handleOrderCheckoutClick = React.useCallback(
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            dispatch(getOrderStatus({ locked, unlocked }));

            dispatch({
                type: SHOW_MODAL,
                payload: 'order',
            });

        }
        , [
            dispatch,
            locked,
            unlocked,
        ]
    );

    const handleOrderCheckoutModalClose = React.useCallback(
        () => {
            dispatch({ type: HIDE_MODAL });
        }
        , [ dispatch ]
    );

    return (
        <aside
            ref={dropRef}
            className={`${burgerConstructorStyles.wrapper}`}
        >
            {
                locked.length > 0 ? (
                    <ul
                        className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.head} mt-4`}
                    >
                        {
                            locked.map((value, index) => {
                                const item = items.find(({ _id }) => _id === value.id);
                                return item !== undefined && (
                                    <OrderItem
                                        {...item}
                                        locked={true}
                                        index={index}
                                        mode={'top'}
                                        key={`order_item__locked_top__${value.uuid}`}
                                    />
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            {
                unlocked.length > 0 ? (
                    <ul
                        className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.scroll}`}
                    >
                        {
                            unlocked.map((value, index) => {
                                const item = items.find(({ _id }) => _id === value.id);
                                return item !== undefined && (
                                    <OrderItem
                                        {...item}
                                        locked={false}
                                        index={index}
                                        mode={'stream'}
                                        key={`order_item__unlocked_middle__${value.uuid}`}
                                    />
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            {
                locked.length > 0 ? (
                    <ul
                        className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.tail} mt-4`}
                    >
                        {
                            locked.map((value, index) => {
                                const item = items.find(({ _id }) => _id === value.id);
                                return item !== undefined && (
                                    <OrderItem
                                        {...item}
                                        locked={true}
                                        index={index}
                                        mode={'bottom'}
                                        key={`order_item__locked_bottom__${value.uuid}`}
                                    />
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            <div
                className={`${burgerConstructorStyles.result}`}
            >
                <span
                    className={`${burgerConstructorStyles.total} text text_type_digits-medium mr-10`}
                >
                    {
                        total.locked + total.unlocked
                    }
                    <CurrencyIcon
                        type="primary"
                    />
                </span>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOrderCheckoutClick}
                >
                    Оформить заказ
                </Button>
            </div>
            {
                props.modal === 'order'
                && status.number !== null
                && (
                    <Modal
                        handleClose={handleOrderCheckoutModalClose}
                    >
                        <OrderDetails
                            number={status.number}
                            name={status.name}
                        />
                    </Modal>
                )
            }
        </aside>
    );

};

export default BurgerConstructor;