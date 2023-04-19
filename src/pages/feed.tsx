import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "../hooks/redux";

import { BASE_URL_WS_FEED } from "../constants";
import {
  START_ORDER_FEED,
  DISCONNECT_ORDER_FEED,
} from "../services/actions/order";
import { TOrderDataState } from "../utils";
import OrderPanel from "../components/order-panel/order-panel";
import OrderStatus from "../components/order-status/order-status";
import styles from "./feed.module.css";

type TState = {
  orderData: TOrderDataState;
};

export function FeedPage() {
  const dispatch = useDispatch();

  const { items, total, totalToday, success, error } = useSelector(
    (state: TState): TOrderDataState => state.orderData
  );

  useEffect(() => {
    dispatch({ type: START_ORDER_FEED, payload: BASE_URL_WS_FEED });
    return () => {
      dispatch({ type: DISCONNECT_ORDER_FEED });
    };
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
      <Fragment>
        <article className={styles.container}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h1>
          {!success && <p className="text text_type_main-small">Загрузка...</p>}
          {success && !error ? (
            <OrderPanel data={items} modal=""></OrderPanel>
          ) : null}
        </article>
        <aside className={styles.container}>
          {success && !error ? (
            <OrderStatus
              data={items}
              total={total}
              today={totalToday}
              modal=""
            />
          ) : null}
        </aside>
      </Fragment>
    </main>
  );
}
