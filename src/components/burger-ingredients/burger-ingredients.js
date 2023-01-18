import React from 'react';
import PropTypes from 'prop-types';
import {
    Counter,
    CurrencyIcon,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    DATA_INGREDIENT_PROPTYPES,
} from '../../constants';
import {
    getIngredientCategoryTitle,
} from '../../utils';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = (props) => {

    const [ingredient, setIngredient] = React.useState(null);

    const handleIngredientClick = React.useCallback(
        (item) => (event) => {

            event.preventDefault();
            event.stopPropagation();

            setIngredient(item);
            props.handleModalShow();
    
        }
        , [props]
    );

    const handleModalClose = React.useCallback(
        () => {

            setIngredient(null);
            props.handleModalHide();

        }, [props]
    );

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
                                                        <a href="/" onClick={handleIngredientClick(item)}>
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
            {props.modal && ingredient && (
                <Modal header="Детали ингредиента" handleClose={handleModalClose}>
                    <IngredientDetails {...ingredient} />
                </Modal>
            )}
        </React.Fragment>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.objectOf(PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
};

export default BurgerIngredients;