import { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TIngredient } from "../../utils";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient: FC<TIngredient> = (props) => {
  const location = useLocation();

  const { _id: id, type, name, price, count, image_large } = props;

  const [{ isDragging }, dragRef] = useDrag({
    type: "menu",
    item: {
      id,
      type,
      price,
      uuid: uuidv4(),
    },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  return (
    <li
      ref={dragRef}
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
    >
      <Link
        className={`${styles.link}`}
        to={`/ingredients/${id}`}
        state={{
          background: {
            ...location,
            state: {
              ...location.state,
              id,
            },
          },
        }}
        replace
      >
        {count > 0 && <Counter count={count} size="default" />}
        <div>
          <img src={image_large} alt={name} />
          <span className="text text_type_digits-default">
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <h3 className="text text_type_main-small">{name}</h3>
      </Link>
    </li>
  );
};

export default BurgerIngredient;
