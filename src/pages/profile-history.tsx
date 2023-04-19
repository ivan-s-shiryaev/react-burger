import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../hooks/redux";

import { BASE_URL_WS_USER } from "../constants";
import { TOrderDataState, TOrderDataItems } from "../utils";
import {
  START_ORDER_USER,
  DISCONNECT_ORDER_USER,
} from "../services/actions/order";
import OrderPanel from "../components/order-panel/order-panel";
import styles from "./profile-history.module.css";

type TState = {
  orderData: TOrderDataState;
};

export function ProfileHistoryPage() {
  const dispatch = useDispatch();

  const { items, success, error } = useSelector(
    (state: TState): TOrderDataState => state.orderData
  );

  const data: TOrderDataItems | null = useMemo(() => {
    let result = null;
    if (items) {
      result = [...items];
      result.sort((a, b) => b.number - a.number);
    }
    return result;
  }, [items]);

  useEffect(() => {
    dispatch({
      type: START_ORDER_USER,
      payload: BASE_URL_WS_USER,
      auth: true,
    });
    return () => {
      dispatch({ type: DISCONNECT_ORDER_USER });
    };
  }, [dispatch]);

  return (
    <article className={`${styles.container} mt-10`}>
      {!success && <p className="text text_type_main-small">Загрузка...</p>}
      {success && !error && !!data ? (
        <OrderPanel data={data} state modal=""></OrderPanel>
      ) : null}
    </article>
  );
}
