import React from 'react';

import {
    DATA_INGREDIENT_URL,
} from '../../constants';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import withModal from '../hocs/with-modal';

const WithModalBurgerIngredients = withModal(BurgerIngredients);
const WithModalBurgerConstructor = withModal(BurgerConstructor);

const App = () => {

    const [state, setState] = React.useState(
        {
            loading: true,
            ingredients: [],
            order: {
                locked_not: ['60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733d1'],
                locked_top: ['60d3b41abdacab0026a733c6'],
                locked_bottom: ['60d3b41abdacab0026a733c6'],
            },
        }
    );

    React.useEffect(() => {
    
        const fetchIngredients = async () => {

            try {

                const response = await fetch(DATA_INGREDIENT_URL);
                const content = await response.json();

                setState({ ...state, loading: false, ingredients: content.data });

            } catch(error) {
                console.error(error);
            }

        };

        if (state.loading) fetchIngredients();

    }, [state]);

    const getDataIgredient = () => {

        let result = state.ingredients.reduce(
            (accumulator, value) => {
                if (!Array.isArray(accumulator[value.type])) accumulator[value.type] = [];
                accumulator[value.type].push({
                    _id: value._id,
                    type: value.type,
                    name: value.name,
                    price: value.price,
                    image_large: value.image_large,
                    calories: value.calories,
                    proteins: value.proteins,
                    fat: value.fat,
                    carbohydrates: value.carbohydrates,
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


        Object.keys(state.order).forEach(name => {
            const list = [];
            state.order[name].forEach(id => {
                const item = state.ingredients.find(value => value._id === id);
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

        Object.keys(state.order).forEach(name => {
            state.order[name].forEach(item => {
                
                if (item === id) ++result;
            });
        });

        return result;

    };

    const countConstructorTotal = () => {

        let result = 0;

        Object.keys(state.order).forEach(name => {
            state.order[name].forEach((id) => {
                const item = state.ingredients.find((value) => value._id === id);
                if (item) result += item.price;
            });
        });

        return result;

    };

    // const addConstructorItem = (id) => {

    //     setOrder({
    //         ...order,
    //         locked_not: [
    //             id,
    //             ...order.locked_not,
    //         ],
    //     });

    // };

    const removeConstructorItem = (id) => {

        const list = [...state.order.locked_not];
        const index = list.findIndex((value) => value === id);

        if (index > -1) list.splice(index, 1);

        setState({
            ...state,
            order: {
                ...state.order,
                locked_not: list,
            }
        });

    };


    return (
        <React.Fragment>
            <AppHeader />
            {state.loading ? null : (
                <main className={appStyles.home}>
                    <article>
                        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                        <WithModalBurgerIngredients data={getDataIgredient()} />
                    </article>
                    <aside>
                        <WithModalBurgerConstructor data={getDataConstructor()} removeIngredient={removeConstructorItem} getTotal={countConstructorTotal} />
                    </aside>
                </main>
            )}
        </React.Fragment>
    );

}

export default App;