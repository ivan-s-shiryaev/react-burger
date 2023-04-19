import { FC, useMemo } from "react";
import { useSelector } from "../../hooks/redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TMenuState, TOrderEntry, TIngredient } from "../../utils";
import styles from "./order-entry.module.css";

type TProps = {
  data: TOrderEntry;
  state: boolean;
};
type TState = { menu: TMenuState };

const OrderEntry: FC<TProps> = (props) => {
  const location = useLocation();
  const maxData = 6;
  const {
    data: { number, createdAt, name, status, ingredients },
    state,
  } = props;
  const { items } = useSelector((state: TState): TMenuState => state.menu);

  const info = useMemo(() => {
    const ingredientItems = ingredients.reduce<Array<TIngredient>>(
      (accumulator, id) => {
        const item = items.find((value) => value._id === id);
        if (item) {
          accumulator.push(item);
        }
        return accumulator;
      },
      []
    );

    const state =
      status === "done"
        ? "Выполнен"
        : status === "created"
        ? "Создан"
        : "Готовится";

    const data = ingredientItems.slice(0, maxData);

    const total = ingredientItems.reduce(
      (accumulator, item) => item.price + accumulator,
      0
    );

    return { state, data, total };
  }, [status, ingredients, items]);

  return (
    <Link
      to={`${location.pathname}/${number}`}
      state={{
        background: {
          ...location,
          state: {
            ...location.state,
            id: number,
          },
        },
      }}
      className={`${styles.container} mb-4 p-6`}
    >
      <div className={`${styles.header} mb-6`}>
        <p className="text text_type_digits-default">&#35;{number}</p>
        <FormattedDate
          date={new Date(createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <div className={`${styles.caption} mb-6`}>
        <h3 className={`${styles.title} text text_type_main-medium`}>{name}</h3>
        {state && (
          <p
            className={`${styles.state} ${
              status === "done" ? styles.done : null
            } mt-2 text text_type_main-default`}
          >
            {info.state}
          </p>
        )}
      </div>
      <div className={`${styles.info}`}>
        <ul className={`${styles.data}`}>
          {info.data.map((item, index) => {
            const hideData = ingredients.length - maxData;
            return (
              <li
                style={{
                  left: index * 48 + "px",
                  zIndex: info.data.length - index,
                }}
                key={index}
              >
                <img
                  src={item.image_mobile}
                  alt={item.name}
                  style={{
                    opacity:
                      maxData === index + 1 && hideData > 0 ? "0.6" : "1",
                  }}
                />
                {hideData > 0 && index === maxData - 1 && (
                  <span className={`text text_type_main-default`}>
                    +{hideData}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <div className={`${styles.total} ml-6`}>
          <span className="mr-2 text text_type_digits-default">
            {info.total}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderEntry;
