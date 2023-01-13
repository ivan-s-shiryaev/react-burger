import React from 'react';
// import PropTypes from 'prop-types';
import {
    Counter,
    CurrencyIcon,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import {
    getIngredientCategoryTitle,
} from '../../utils';

const BurgerIngredients = props => {

    const [modal, setModal] = React.useState(false);

    const handleModalShow = event => {

        event.preventDefault();
        event.stopPropagation();
        setModal(true);

    };

    const handleModalHide = event => {

        setModal(false);

    };

    return (
        <React.Fragment>
            <div style={{ display: 'flex' }}>
                {
                    Object.keys(props.data).map((name, id) => (
                            <Tab value={name} active={id === 0} key={name}>{getIngredientCategoryTitle(name)}</Tab>
                        )
                    )
                }
            </div>
            <div className={burgerIngredientsStyles.container}>
                {
                    Object.keys(props.data).map(name => {
                            return (
                                <React.Fragment key={name}>
                                    <h2 className="text text_type_main-medium">{getIngredientCategoryTitle(name)}</h2>
                                    <ul>
                                    {
                                        props.data[name].map(item => {
                                                return (
                                                    <li key={item._id}>
                                                        <a href="/" onClick={handleModalShow}>
                                                            {item.count > 0 ? (<Counter count={item.count} size="default" />) : null }
                                                            <div>
                                                                <img src={item.image_large} alt={item.name} />
                                                                <span className="text text_type_digits-default">
                                                                    {item.price}
                                                                    <CurrencyIcon type="primary" />
                                                                </span>
                                                            </div>
                                                            <h3 className="text text_type_main-small">{item.name}</h3>
                                                        </a>
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
            {modal && (
                <Modal header="Детали ингредиента" close={handleModalHide}>
                    !!!
                </Modal>
            )}
        </React.Fragment>
    );

}

//TODO: PropTypes
// BurgerIngredients.propTypes = {
//     getData: PropTypes.func.isRequired,
//     addIngredient: PropTypes.func.isRequired,
// };

export default BurgerIngredients;