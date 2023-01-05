import React from 'react';
import {
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
//import burgerIngredientsStyles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <Tab value="1" active={true}>Булки</Tab>
                    <Tab value="2">Соусы</Tab>
                    <Tab value="3">Начинки</Tab>
                </div>
            </React.Fragment>
        );

    }

}

export default BurgerIngredients;