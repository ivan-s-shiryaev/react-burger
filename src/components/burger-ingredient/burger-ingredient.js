import React from 'react';
import {
    Link,
} from 'react-router-dom';
import {
    useDrag
} from "react-dnd";
import {
    v4 as uuidv4,
} from 'uuid';
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    INGREDIENT_PROPTYPES,
} from '../../constants';
import burgerIngredientStyles from './burger-ingredient.module.css';

const BurgerIngredient = (props) => {

    const {
        _id: id,
        type,
        name,
        price,
        count,
        image_large,
    } = props;

    const [{ isDragging }, dragRef] = useDrag({
        type: 'menu',
        item: {
            id,
            type,
            price,
            uuid: uuidv4(),
        },
        collect(monitor) {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });

    return (
        
        <li
            ref={dragRef}
            className={`${burgerIngredientStyles.container} ${isDragging ? burgerIngredientStyles.dragging : ''}`}
        >
            <Link
                to={`/ingredients/${id}`}
                state={{ modal: true }}
            >
                {
                    count > 0 && (
                        <Counter
                            count={count}
                            size="default"
                        />
                    )
                }
                <div>
                    <img
                        src={image_large}
                        alt={name}
                    />
                    <span
                        className="text text_type_digits-default"
                    >
                        {price}
                        <CurrencyIcon
                            type="primary"
                        />
                    </span>
                </div>
                <h3
                    className="text text_type_main-small"
                >
                    {name}
                </h3>
            </Link>
        </li>
    );

;}

BurgerIngredient.propTypes = INGREDIENT_PROPTYPES;

export default BurgerIngredient;