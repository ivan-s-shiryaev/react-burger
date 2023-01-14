import React from 'react';

import {
    DATA_INGREDIENT_PROPTYPES,
} from '../../constants';
import ingredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails = (props) => {

    return (
        <React.Fragment>
            <div className={`${ingredientDetailsStyles.container} mb-4`}>
                <img src={props.image_large} alt={props.name} />
            </div>
            <div className={`${ingredientDetailsStyles.container} mb-8`}>
                <h3 className='text text_type_main-medium'>{props.name}</h3>
            </div>
            <div className={`${ingredientDetailsStyles.container} mb-15`}>
                <ul>
                    <li className='mr-5'>
                        <span className="text text_type_main-default text_color_inactive">Калории, ккал</span>
                        <span className="text text_type_digits-default text_color_inactive mt-2">{props.calories}</span>
                    </li>
                    <li className='mr-5'>
                        <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                        <span className="text text_type_digits-default text_color_inactive mt-2">{props.proteins}</span>
                    </li>
                    <li className='mr-5'>
                        <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive mt-2">{props.fat}</span>
                    </li>
                    <li>
                        <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                        <span className="text text_type_digits-default text_color_inactive mt-2">{props.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );

}

IngredientDetails.propTypes = DATA_INGREDIENT_PROPTYPES.isRequired;

export default IngredientDetails;