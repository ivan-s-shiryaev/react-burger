import React, {
    useState
} from 'react';
import PropTypes from 'prop-types';

import {
    DATA_INGREDIENT_PROPTYPES,
} from '../../constants';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import appStyles from './app.module.css';

const App = props => {

    const [order, setOrder] = useState({
        locked_not: ['60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9bc'],
        locked_top: ['60666c42cc7b410027a1a9b1'],
        locked_bottom: ['60666c42cc7b410027a1a9b1'],
    });

    const getDataIgredients = () => {

        let result = props.ingredients.reduce(
            (accumulator, value) => {
                if (!Array.isArray(accumulator[value.type])) accumulator[value.type] = [];
                accumulator[value.type].push({
                    _id: value._id,
                    name: value.name,
                    price: value.price,
                    image_large: value.image_large,
                    count: countConstructorItem(value._id),
                });
                return accumulator;
            },
            {}
        );

        return result;

    };

    const getDataConstructor = () => {

        let result = {};

        Object.keys(order).forEach(name => {
            const list = [];
            order[name].forEach(id => {
                const item = props.ingredients.find(value => value._id === id);
                if (item) list.push({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                });
            });
            result[name] = list;
        });

        return result;

    };

    const countConstructorItem = (id) => {

        let result = 0;

        Object.keys(order).forEach(name => {
            order[name].forEach(item => {
                if (item === id) ++result;
            });
        });

        return result;

    };

    const countConstructorTotal = () => {

        let result = 0;

        Object.keys(order).forEach(name => {
            order[name].forEach(id => {
                const item = props.ingredients.find(value => value._id === id);
                if (item) result += item.price;
            });
        });

        return result;

    };

    const addConstructorItem = (id) => {

        setOrder({
            ...order,
            locked_not: [
                id,
                ...order.locked_not,
            ],
        });

    };

    const removeConstructorItem = (id) => {

        const list = [...order.locked_not];
        const index = list.findIndex(value => value === id);

        if (index > -1) list.splice(index, 1);

        setOrder({
            ...order,
            locked_not: list,
        });

    };


    return (
        <React.Fragment>
            <AppHeader />
            <main className={appStyles.home}>
                <article>
                    <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                    <BurgerIngredients getData={getDataIgredients} addIngredient={addConstructorItem} />
                </article>
                <aside>
                    <BurgerConstructor getData={getDataConstructor} removeIngredient={removeConstructorItem} getTotal={countConstructorTotal} />
                </aside>
            </main>
        </React.Fragment>
    );

}

App.propTypes = {
    ingredients: PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired,
};

export default App;