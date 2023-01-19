import React from 'react';
import PropTypes from 'prop-types';
import {
    Counter,
    CurrencyIcon,
    Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    INGREDIENT_PROPTYPES,
} from '../../constants';
import {
    getIngredientCategoryTitle,
} from '../../utils';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = (props) => {

    const data = props.data;
    const typeRef = {
        bun: React.useRef(null),
        main: React.useRef(null),
        sauce: React.useRef(null),
    };
    const [type, setType] = React.useState('bun');
    const [ingredient, setIngredient] = React.useState(null);

    const handleTabClick = (argument) => {

        if (argument in typeRef) {
            setType(argument);
        }

    };

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
            <nav className={`${burgerIngredientsStyles.menu}`}>
                {
                    Object.keys(data).map((value) => (
                            
                            <Tab value={value} active={value === type} onClick={handleTabClick} key={value}>{getIngredientCategoryTitle(value)}</Tab>
                        )
                    )
                }
            </nav>
            <div className={`${burgerIngredientsStyles.container}`}>
                {
                    Object.keys(data).map((value) => {
                            return (
                                <React.Fragment key={value}>
                                    <h2 ref={value in typeRef ? typeRef[value] : null} className="text text_type_main-medium">{getIngredientCategoryTitle(value)}</h2>
                                    <ul>
                                    {
                                        data[value].map(item => {
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
            {
                props.modal && ingredient && (
                    <Modal header="Детали ингредиента" handleClose={handleModalClose}>
                        <IngredientDetails {...ingredient} />
                    </Modal>
                )
            }
            {
                type in typeRef && typeRef[type].current !== null ? typeRef[type].current.scrollIntoView({ behavior: "smooth" }) : null
            }
        </React.Fragment>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.objectOf(PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired).isRequired,
};

export default BurgerIngredients;