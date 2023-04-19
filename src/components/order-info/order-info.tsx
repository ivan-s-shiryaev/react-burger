import { useEffect, useMemo, FC, Fragment } from "react";
import { useParams } from "react-router";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ORDER_STATUS } from "../../constants";
import { useDispatch, useSelector } from "../../hooks/redux";
import { getOrderEntry } from "../../services/actions/order";
import { TOrderDataState, TIngredient, TMenuState } from "../../utils";
import styles from "./order-info.module.css";

type TProps = {
  page?: boolean;
};
type TState = { orderData: TOrderDataState; menu: TMenuState };
type TIngredientQty = TIngredient & {
  qty: number;
};

const OrderInfo: FC<TProps> = (props) => {
  const { page } = props;
  const { id: number } = useParams();
  const dispatch = useDispatch();
  const {
    item: { entry, request, error },
  } = useSelector((state: TState): TOrderDataState => state.orderData);
  const { items } = useSelector((state: TState): TMenuState => state.menu);

  const info = useMemo(() => {
    const ingredientItems =
      entry === null
        ? []
        : entry.ingredients.reduce<Array<TIngredient>>((accumulator, id) => {
            const item = items.find((value) => value._id === id);
            if (item) {
              accumulator.push(item);
            }
            return accumulator;
          }, []);

    const state =
      entry?.status === "done"
        ? ORDER_STATUS.done
        : entry?.status === "created"
        ? ORDER_STATUS.created
        : ORDER_STATUS.pending;

    const total = ingredientItems.reduce(
      (accumulator, item) => item.price + accumulator,
      0
    );

    const data = ingredientItems.reduce<Array<TIngredientQty>>(
      (accumulator, item, i) => {
        const index = accumulator.findIndex((value) => value._id === item._id);
        if (index === -1) {
          accumulator.push({ ...item, qty: 1 });
        } else {
          accumulator[index].qty += 1;
        }
        return accumulator;
      },
      []
    );

    return { state, data, total };
  }, [entry, items]);

  useEffect(() => {
    (async () => {
      await dispatch(getOrderEntry(number));
    })();
  }, [dispatch, number]);

  return (
    <Fragment>
      {request && (
        <p className="text text_type_main-small mt-10">Загрузка...</p>
      )}
      {!request && !error && entry ? (
        <div className={`${styles.container} m-10`}>
          <div
            className={`${styles.header} mb-10`}
            style={{
              justifyContent: page ? "center" : "flex-start",
            }}
          >
            <p className="text text_type_digits-default">&#35;{entry.number}</p>
          </div>
          <div className={`${styles.caption} mb-15`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {entry.name}
            </h3>
            <p
              className={`${styles.state} ${
                entry.status === "done" ? styles.done : null
              } mt-2 text text_type_main-default`}
            >
              {info.state}
            </p>
          </div>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={`${styles.info}`}>
            {info.data.map((item, index) => {
              return (
                <li className={`mb-4`} key={`ingredient-${index}`}>
                  <div className={`${styles.item}`}>
                    <div className={`${styles.avatar}`}>
                      <img src={item.image_mobile} alt={item.name} />
                    </div>
                    <p className="text text_type_main-default ml-4">
                      {item.name}
                    </p>
                  </div>
                  <div className={`${styles.total} ml-4`}>
                    <span className="mr-2 text text_type_digits-default">
                      {item.qty} x {item.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={`${styles.footer}`}>
            <FormattedDate
              date={new Date(entry.createdAt)}
              className="text text_type_main-default text_color_inactive"
            />
            <div className={`${styles.total}`}>
              <span className="mr-2 text text_type_digits-default">
                {info.total}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default OrderInfo;
