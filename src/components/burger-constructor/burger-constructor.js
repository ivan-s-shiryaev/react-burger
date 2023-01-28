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
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    INCREASE_MENU_ITEM,
    DECREASE_MENU_ITEM,
    ADD_ORDER_ITEM,
    REMOVE_ORDER_ITEM,
} from '../../services/actions';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
    OrderContext,
} from '../../services/appContext';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {

    const order = React.useContext(OrderContext);
    const status = order.getStatus();
    const total = order.getTotal();

    const {
        menu: {
            items,
        },
        order: {
            items: {
                locked,
                unlocked,
            },
        },
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: 'menu',
        drop(item) {

            dispatch({
                type: ADD_ORDER_ITEM,
                payload: item,
            });
            dispatch({
                type: INCREASE_MENU_ITEM,
                payload: item,
            });

        },
    });

    const handleOrderItemTrashClick = React.useCallback(
        (index) => (event) => {

            event.preventDefault();
            event.stopPropagation();

            dispatch({
                type: REMOVE_ORDER_ITEM,
                payload: index
            });
            dispatch({
                type: DECREASE_MENU_ITEM,
                payload: unlocked[index],
            });


        }
        , [
            dispatch,
            unlocked,
        ]
    );

    const handleOrderCheckoutClick = React.useCallback(
        () => {

            console.log('CHECKOUT!');

        }
        , []
    );

    // const handleCheckoutClick = async (event) => {

    //     event.preventDefault();
    //     event.stopPropagation();

    //     try {

    //         const body = JSON.stringify({
    //             ingredients: Object.keys(data).reduce(
    //                 (accumulator, value) => accumulator.concat(data[value].map((item) => item['_id']))
    //                 , []
    //             ),
    //         });
    //         const response = await fetch(`${BASE_URL}/orders`, {
    //             method: 'POST',
    //             headers: { 'Content-Type':'application/json' },
    //             body,
    //         });

    //         checkResponse(response);

    //         const content = await response.json();

    //         if (content['success']) {

    //             order.setStatus({
    //                 ...status,
    //                 number: content.order.number,
    //                 name: content.name,
    //             });

    //             props.handleModalShow();

    //         } else {
    //             throw new Error('message' in content ? content.message : 'Failed to proceed the Order');
    //         }
            

    //     } catch(error) {   
    //         console.error(error);
    //     }

    // };

    const handleModalClose = () => {

        props.handleModalHide();

        // order._setData();

    };

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
                                const item = items.find(({ _id }) => _id === value);
                                return item !== undefined && (
                                    <li
                                        className="mb-4"
                                        key={`order_item__locked_top__${index}_${item._id}`}
                                    >
                                        <ConstructorElement
                                            isLocked={true}
                                            type={index === 0 ? 'top' : null}
                                            text={`${item.name} (верх)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </li>
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
                                const item = items.find(({ _id }) => _id === value);
                                return item !== undefined && (
                                    <li
                                        className="mb-4"
                                        key={`order_item__unlocked_middle__${index}_${item._id}`}
                                    >
                                        <ConstructorElement
                                            isLocked={false}
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                            handleClose= {handleOrderItemTrashClick(index)}
                                            />
                                        <span><DragIcon type="primary" /></span>
                                    </li>
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
                                const item = items.find(({ _id }) => _id === value);
                                return item !== undefined && (
                                    <li
                                        className="mb-4"
                                        key={`order_item__locked_bottom__${index}_${item._id}`}
                                    >
                                        <ConstructorElement 
                                            isLocked={true}
                                            type={index === locked.length - 1 ? 'bottom' : null}
                                            text={`${item.name} (низ)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            <div className={`${burgerConstructorStyles.result}`}>
                <span className={burgerConstructorStyles.total + " text text_type_digits-medium mr-10"}>
                    {total}
                    <CurrencyIcon type="primary" />
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
            {props.modal && !!status.number && (
                <Modal handleClose={handleModalClose}>
                    <OrderDetails {...{ ...status, total }} />
                </Modal>
            )}
        </aside>
    );

}

export default BurgerConstructor;