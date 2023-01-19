import React from 'react';

import {
    BASE_URL,
} from '../../constants';
import {
    checkResponse,
} from '../../utils';
import {
    makeOrderDataFake,
} from '../../utils/fake';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import withModal from '../hocs/with-modal';
import {
    OrderContext,
} from '../../services/appContext';

const WithModalBurgerIngredients = withModal(BurgerIngredients);
const WithModalBurgerConstructor = withModal(BurgerConstructor);

const App = () => {

    const [state, setState] = React.useState(
        {
            loading: true,
            ingredients: [],
            order: {
                status: {
                    number: null,
                    name: '',
                },
                data: {
                    body: [],
                    head: [],
                    tail: [],
                },
            },
        }
    );

    React.useEffect(() => {
    
        const fetchIngredients = async () => {

            try {

                const response = await fetch(`${BASE_URL}/ingredients`);

                checkResponse(response);

                const content = await response.json();

                if (content['success']) {

                    setState({
                        ...state,
                        loading: false,
                        ingredients: content.data,
                        //TODO: remove fake Order
                        order: {
                            ...state.order,
                            data: makeOrderDataFake(content.data),
                        },
                    });

                } else {
                    throw new Error('message' in content ? content.message : 'Failed to get the Ingredient data');
                }

            } catch(error) {
                console.error(error);
            }

        };

        if (state.loading) fetchIngredients();

    }, [state]);

    const _setDataConstructor = () => {

        setState({
            ...state,
            order: {
                ...state.order,
                data: makeOrderDataFake(state.ingredients),
            },
        });

    };

    const countConstructorItem = React.useCallback(
        (id) => {

            let result = 0;

            Object.keys(state.order.data).forEach((part) => {
                state.order.data[part].forEach((value) => {
                    if (value === id) ++result;
                });
            });

            return result;

        }
        , [state.order.data]
    );

    const getDataIgredient = React.useCallback(
        () => {

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

        }
        , [state.ingredients, countConstructorItem]
    );

    const getStatusConstructor = () => {

        let result = {};

        result = {
            ...result,
            ...state.order.status,
        };

        return result;
    };

    const setStatusConstructor = (argument) => {

        setState({
            ...state,
            order: {
                ...state.order,
                status: {
                    ...argument,
                },
            },
        });
        
        
    };

    const getItemConstructor = React.useCallback(
        (id) => {

            let result = null;

            const value = state.ingredients.find((item) => item._id === id);
            if (value) {
                result = {
                    _id: value._id,
                    type: value.type,
                    name: value.name,
                    price: value.price,
                    image: value.image,
                }
            } else {
                throw new Error(`Unknown Ingredient "${id}"`)
            }

            return result;

        }
        , [state.ingredients]
    );

    const getDataConstructor = React.useCallback(
        () => {

            let result = {};

            Object.keys(state.order.data).forEach((part) => {
                const list = [];
                state.order.data[part].forEach((value) => {

                    try {

                        const item = getItemConstructor(value);
                        list.push(item);

                    } catch(error) {
                        console.error(error);
                    }

                });
                result[part] = list;
            });

            return result;

        }
        , [state.order.data, getItemConstructor]
    );

    const countConstructorTotal = React.useCallback(
        () => {

            let result = 0;

            Object.keys(state.order.data).forEach((part) => {
                state.order.data[part].forEach((value) => {

                    try {

                        const item = getItemConstructor(value);
                        result += item.price

                    } catch(error) {
                        console.error(error);
                    }

                });
            });

            return result;

        }
        , [state.order.data, getItemConstructor]
    );

    /*const addConstructorItem = (id) => {

        try {

            const item = getItemConstructor(id);

            if (item.type === 'bun') {

                let bun = false;

                Object.keys(state.order.data).forEach((part) => {
                    if (!bun) {
                        bun = state.order.data[part].reduce(
                            (accumulator, value) => accumulator ? accumulator : getItemConstructor(value).type === 'bun',
                            bun
                        );
                    }
                    
                });

                if (bun) {
                    throw new Error(`Ingredient "${id}" has "bun" type and is already present in the Constructor`);
                } else {
                    setState({
                        ...state,
                        order: {
                            ...state.order,
                            data: {
                                ...state.order.data,
                                head: [item._id, ...state.order.head],
                                tail: [...state.order.tail, item._id],
                            },
                        },
                    });
                }
            } else {
                setState({
                    ...state,
                    order: {
                        ...state.order,
                        data: {
                            ...state.order,
                            body: [item._id, ...state.order.body],
                        },
                    },
                });
            }


        } catch(error) {
            console.error(error);
        }

    };*/

    const removeConstructorItem = (id) => {

        const list = [...state.order.data.body];
        const index = list.findIndex((value) => value === id);

        if (index > -1) list.splice(index, 1);

        setState({
            ...state,
            order: {
                ...state.order,
                data: {
                    ...state.order.data,
                    body: list,
                },
            },
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
                        <OrderContext.Provider value={{
                            data: getDataConstructor(),
                            _setData: _setDataConstructor,
                            getStatus: getStatusConstructor,
                            setStatus: setStatusConstructor,
                            getTotal: countConstructorTotal,
                            removeIngredient: removeConstructorItem,

                        }}>
                            <WithModalBurgerConstructor />
                        </OrderContext.Provider>
                    </aside>
                </main>
            )}
        </React.Fragment>
    );

}

export default App;