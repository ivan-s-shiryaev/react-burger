import React from 'react';
import {
    Counter,
    CurrencyIcon,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {

    getCategoryTitle = (name) => {

        let result = 'Прочее';

        switch (name) {
            case 'bun':
                result = 'Булки';
                break;
            case 'main':
                result = 'Начинки';
                break;
            case 'sauce':
                result = 'Соусы';
                break;
            default:
                break;
        }

        return result;

    };

    render() {

        const data = this.props.getData();

        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    {
                        Object.keys(data).map((name, id) => (
                                <Tab value={name} active={id === 0} key={name}>{this.getCategoryTitle(name)}</Tab>
                            )
                        )
                    }
                </div>
                <div className={burgerIngredientsStyles.container}>
                    {
                        Object.keys(data).map(name => {
                                return (
                                    <React.Fragment key={name}>
                                        <h2 className="text text_type_main-medium">{this.getCategoryTitle(name)}</h2>
                                        <ul>
                                        {
                                            data[name].map(item => {
                                                    return (
                                                        <li onClick={() => this.props.addIngredient(item._id)} key={item._id}>
                                                            {item.count > 0 ? (<Counter count={item.count} size="default" />) : null }
                                                            <div>
                                                                <img src={item.image_large} alt={item.name} />
                                                                <span className="text text_type_digits-default">
                                                                    {item.price}
                                                                    <CurrencyIcon type="primary" />
                                                                </span>
                                                            </div>
                                                            <h3 className="text text_type_main-small">{item.name}</h3>
                                                        </li>
                                                    )
                                                }
                                            )
                                        }
                                        </ul>
                                    </React.Fragment>
                                )
                            }
                        )
                    }
                </div>
            </React.Fragment>
        );

    }

}

export default BurgerIngredients;