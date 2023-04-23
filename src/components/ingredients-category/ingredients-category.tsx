import { forwardRef, useMemo, Fragment } from "react";
import { useSelector } from "../../hooks/redux";

import { TMenuState, getMenuCategoryTitle } from "../../utils";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import ingredientsCategoryStyles from "./ingredients-category.module.css";

type TState = {
  menu: TMenuState;
};
type TProps = {
  id: string;
};

const IngredientsCategory = forwardRef<HTMLHeadingElement, TProps>(
  (props, ref) => {
    const { id } = props;

    const { menu } = useSelector((state: TState): TState => state);

    const items = useMemo(
      () => menu.items.filter((value) => value.type === id),
      [id, menu.items]
    );

    return (
      <Fragment>
        <h2 ref={ref} className="text text_type_main-medium">
          {getMenuCategoryTitle(id)}
        </h2>
        <ul className={`${ingredientsCategoryStyles.container}`}>
          {items.map((value) => {
            return (
              <BurgerIngredient {...value} key={`menu_item__${value._id}`} />
            );
          })}
        </ul>
      </Fragment>
    );
  }
);

export default IngredientsCategory;
