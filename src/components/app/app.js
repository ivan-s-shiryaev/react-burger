import React from 'react';
import PropTypes from 'prop-types';

import {
    DATA_INGREDIENT_PROPTYPES,
} from '../../constants';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import appStyles from './app.module.css';

class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            order: {
                locked_not: ['60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9bc'],
                locked_top: ['60666c42cc7b410027a1a9b1'],
                locked_bottom: ['60666c42cc7b410027a1a9b1'],
            },
        }

    }

    getDataIgredients = () => {

        let result = this.props.ingredients.reduce(
            (accumulator, value) => {
                if (!Array.isArray(accumulator[value.type])) accumulator[value.type] = [];
                accumulator[value.type].push({
                    _id: value._id,
                    name: value.name,
                    price: value.price,
                    image_large: value.image_large,
                    count: this.countConstructorItem(value._id),
                });
                return accumulator;
            },
            {}
        );

        return result;

    };

    getDataConstructor = () => {

        let result = {};

        Object.keys(this.state.order).forEach(name => {
            const list = [];
            this.state.order[name].forEach(id => {
                const item = this.props.ingredients.find(value => value._id === id);
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

    countConstructorItem = (id) => {

        let result = 0;

        Object.keys(this.state.order).forEach(name => {
            this.state.order[name].forEach(item => {
                if (item === id) ++result;
            });
        });

        return result;

    };

    countConstructorTotal = () => {

        let result = 0;

        Object.keys(this.state.order).forEach(name => {
            this.state.order[name].forEach(id => {
                const item = this.props.ingredients.find(value => value._id === id);
                if (item) result += item.price;
            });
        });

        return result;

    };

    addConstructorItem = (id) => {

        this.setState(prevState => {

            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    locked_not: [
                        id,
                        ...prevState.order.locked_not,
                    ],
                },
            };

        });

    };

    removeConstructorItem = (id) => {

        this.setState(prevState => {

            const list = [...prevState.order.locked_not];
            const index = list.findIndex(value => value === id);

            if (index > -1) list.splice(index, 1);

            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    locked_not: list,
                },
            };

        });

    };


    render() {

        return (
            <React.Fragment>
                <AppHeader />
                <main className={appStyles.home}>
                    <article>
                        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                        <BurgerIngredients getData={this.getDataIgredients} addIngredient={this.addConstructorItem} />
                    </article>
                    <aside>
                        <BurgerConstructor getData={this.getDataConstructor} removeIngredient={this.removeConstructorItem} getTotal={this.countConstructorTotal} />
                    </aside>
                </main>
            </React.Fragment>
        );

    }

}

App.propTypes = {
    ingredients: PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired,
};

export default App;