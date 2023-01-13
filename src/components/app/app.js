import React from 'react';
// import PropTypes from 'prop-types';

import {
    DATA_INGREDIENT_URL,
    // DATA_INGREDIENT_PROPTYPES,
} from '../../constants';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import appStyles from './app.module.css';

const App = props => {

    const [ingredients, setIngredients] = React.useState([]);
    const [order, setOrder] = React.useState({
        locked_not: ['60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733d1'],
        locked_top: ['60d3b41abdacab0026a733c6'],
        locked_bottom: ['60d3b41abdacab0026a733c6'],
    });

    React.useEffect(() => {
        //TODO: try .. catch
        (async () => {
            const response = await fetch(DATA_INGREDIENT_URL);
            const content = await response.json();
            setIngredients(content.data);
        })();
    }, []);

    const getDataIgredient = () => {

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
                const item = ingredients.find(value => value._id === id);
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
                    <BurgerIngredients data={getDataIgredient()} addIngredient={addConstructorItem} />
                </article>
                <aside>
                    <BurgerConstructor data={getDataConstructor()} removeIngredient={removeConstructorItem} getTotal={countConstructorTotal} />
                </aside>
            </main>
        </React.Fragment>
    );

}

//TODO: PropTypes
// App.propTypes = {
//     ingredients: PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired,
// };

export default App;