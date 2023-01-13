import React from 'react';
// import PropTypes from 'prop-types';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = props => {

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
                    {props.getTotal()}
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </React.Fragment>
    );

}

// BurgerConstructor.propTypes = {
//     getData: PropTypes.func.isRequired,
//     getTotal: PropTypes.func.isRequired,
//     removeIngredient: PropTypes.func.isRequired,
// };

export default BurgerConstructor;