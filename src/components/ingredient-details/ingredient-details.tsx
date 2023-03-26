import { Fragment } from "react";

import { TMenu } from "../../utils";
import { useSelector } from "react-redux";
import ingredientDetailsStyles from "./ingredient-details.module.css";

type TState = {
  menu: TMenu;
};

const IngredientDetails = () => {
  const { item } = useSelector((state: TState): TMenu => state.menu);

  return item ? (
    <Fragment>
      <div className={`${ingredientDetailsStyles.container} mb-4`}>
        <img src={item.image_large} alt={item.name} />
      </div>
      <div className={`${ingredientDetailsStyles.container} mb-8`}>
        <h3 className="text text_type_main-medium">{item.name}</h3>
      </div>
      <div className={`${ingredientDetailsStyles.container} mb-15`}>
        <ul>
          <li className="mr-5">
            <span className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {item.calories}
            </span>
          </li>
          <li className="mr-5">
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {item.proteins}
            </span>
          </li>
          <li className="mr-5">
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {item.fat}
            </span>
          </li>
          <li>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_digits-default text_color_inactive mt-2">
              {item.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  ) : null;
};

export default IngredientDetails;
