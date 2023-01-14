import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    DATA_CONSTRUCTOR_PROPTYPES,
} from '../../constants';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'

const BurgerConstructor = (props) => {

    const total = props.getTotal();

    const handleCheckoutClick = (event) => {

        event.preventDefault();
        event.stopPropagation();

        props.handleModalShow();

    };

    const handleModalClose = () => {

        props.handleModalHide();

    };

    return (
        <React.Fragment>
            {
                props.data['locked_top'].length > 0 ? (
                    <ul className={burgerConstructorStyles.container + " mb-4"} style={{ marginTop: 0 }}>
                        {
                            props.data['locked_top'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={[value._id, index].join('_')}>
                                        <ConstructorElement
                                            isLocked={true}
                                            type={index === 0 ? 'top' : undefined}
                                            text={[value.name, '(верх)'].join(' ')}
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
                props.data['locked_not'].length > 0 ? (
                    <ul className={[burgerConstructorStyles.container, burgerConstructorStyles.scroll].join(' ')}>
                        {
                            props.data['locked_not'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={[value._id, index].join('_')}>
                                        <ConstructorElement
                                            isLocked={false}
                                            text={value.name}
                                            price={value.price}
                                            thumbnail={value.image}
                                            handleClose= {() => props.removeIngredient(value._id)}
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
                props.data['locked_bottom'].length > 0 ? (
                    <ul className={burgerConstructorStyles.container + " mt-4"} style={{ marginBottom: 0 }}>
                        {
                            props.data['locked_bottom'].map((value, index) => {
                                return (
                                    <li className="mb-4" key={[value._id, index].join('_')}>
                                        <ConstructorElement 
                                            isLocked={true}
                                            type={index === props.data['locked_bottom'].length - 1 ? 'bottom' : undefined}
                                            text={[value.name, '(низ)'].join(' ')}
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
            {props.modal && total > 0 && (
                <Modal handleClose={handleModalClose}>
                    <OrderDetails {...{ _id: '034536', total }} />
                </Modal>
            )}
        </React.Fragment>
    );

}

BurgerConstructor.propTypes = {
    data: PropTypes.shape({
        locked_not: PropTypes.arrayOf(DATA_CONSTRUCTOR_PROPTYPES.isRequired).isRequired,
        locked_top: PropTypes.arrayOf(DATA_CONSTRUCTOR_PROPTYPES.isRequired).isRequired,
        locked_bottom: PropTypes.arrayOf(DATA_CONSTRUCTOR_PROPTYPES.isRequired).isRequired,
    }).isRequired,
    getTotal: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;