import React from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    DATA_ORDER_URL,
} from '../../constants';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
    OrderContext,
} from '../../services/appContext';

const BurgerConstructor = (props) => {

    const order = React.useContext(OrderContext);
    const status = order.getStatus();
    const data = order.data;
    const total = order.getTotal();

    const handleCheckoutClick = async (event) => {

        event.preventDefault();
        event.stopPropagation();

        try {

            const body = JSON.stringify({
                ingredients: Object.keys(data).reduce(
                    (accumulator, value) => accumulator.concat(data[value].map((item) => item['_id']))
                    , []
                ),
            });
            const response = await fetch(DATA_ORDER_URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body,
            });
            
            const content = await response.json();

            if (content['success']) {

                order.setStatus({
                    ...status,
                    number: content.order.number,
                    name: content.name,
                });

                props.handleModalShow();

            } else {
                throw new Error('message' in content ? content.message : 'Failed to proceed the Order');
            }
            

        } catch(error) {   
            console.error(error);
        }

    };

    const handleModalClose = () => {

        props.handleModalHide();

        order._setData();

    };

    return (
        <React.Fragment>
            {
                data['head'].length > 0 ? (
                    <ul className={burgerConstructorStyles.container + " mb-4"} style={{ marginTop: 0 }}>
                        {
                            data['head'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={`${value._id}_${index}`}>
                                        <ConstructorElement
                                            isLocked={true}
                                            type={index === 0 ? 'top' : undefined}
                                            text={`${value.name} (верх)`}
                                            price={value.price}
                                            thumbnail={value.image}
                                            />
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            {
                data['body'].length > 0 ? (
                    <ul className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.scroll}`}>
                        {
                            data['body'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={`${value._id}_${index}`}>
                                        <ConstructorElement
                                            isLocked={false}
                                            text={value.name}
                                            price={value.price}
                                            thumbnail={value.image}
                                            handleClose= {() => order.removeIngredient(value._id)}
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
                data['tail'].length > 0 ? (
                    <ul className={burgerConstructorStyles.container + " mt-4"} style={{ marginBottom: 0 }}>
                        {
                            data['tail'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={`${value._id}_${index}`}>
                                        <ConstructorElement 
                                            isLocked={true}
                                            type={index === data['tail'].length - 1 ? 'bottom' : undefined}
                                            text={`${value.name} (низ)`}
                                            price={value.price}
                                            thumbnail={value.image}
                                            />
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : null
            }
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: '40px 16px 52px 0',
            }}>
                <span className={burgerConstructorStyles.total + " text text_type_digits-medium mr-10"}>
                    {total}
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleCheckoutClick}>Оформить заказ</Button>
            </div>
            {props.modal && !!status.number && (
                <Modal handleClose={handleModalClose}>
                    <OrderDetails {...{ ...status, total }} />
                </Modal>
            )}
        </React.Fragment>
    );

}

export default BurgerConstructor;