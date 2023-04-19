import { useMemo, FC, Fragment } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { TOrderEntry, PWithModal } from "../../utils";
import styles from "./order-status.module.css";

type TProps = PWithModal & {
  data: Array<TOrderEntry>;
  total: number;
  today: number;
};

const OrderStatus: FC<TProps> = (props) => {
  const { data, total, today } = props;
  const location = useLocation();
  const maxGroups = 2;
  const maxItems = 10;

  const doneItems = useMemo(
    () =>
      data
        .filter((value: TOrderEntry) => value.status === "done")
        .map((value: TOrderEntry) => value.number)
        .slice(0, maxGroups * maxItems)
        .reduce<Array<Array<number>>>(
          (accumulator, value, index, list) => {
            const i = Math.floor(index / maxItems);
            const k = index % maxItems;
            if (accumulator[i] === undefined) {
              accumulator[i] = [];
            }
            accumulator[i][k] = value;
            return accumulator;
          },
          [[]]
        ),
    [data]
  );

  const pendingItems = useMemo(
    () =>
      data
        .filter((value: TOrderEntry) => value.status === "pending")
        .map((value: TOrderEntry) => value.number)
        .slice(0, maxGroups * maxItems)
        .reduce<Array<Array<number>>>(
          (accumulator, value, index, list) => {
            const i = Math.floor(index / maxItems);
            const k = index % maxItems;
            if (accumulator[i] === undefined) {
              accumulator[i] = [];
            }
            accumulator[i][k] = value;
            return accumulator;
          },
          [[]]
        ),
    [data]
  );

  return total > 0 && today > 0 ? (
    <Fragment>
      <div className={`${styles.board}`}>
        <div className={`${styles.section} mr-4`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles.group}`}>
            {doneItems.map((list, i) => {
              return (
                <ul
                  className={`${styles.list} ${styles.done}`}
                  key={`doneGroup-${i}`}
                >
                  {list.map((item, k) => {
                    return (
                      <li
                        className="text text_type_digits-default mb-2"
                        key={`doneItem-${i + k}`}
                      >
                        <Link
                          to={`${location.pathname}/${item}`}
                          state={{
                            background: {
                              ...location,
                              state: {
                                ...location.state,
                                id: item,
                              },
                            },
                          }}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
        <div className={`${styles.section} ml-5`}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles.group}`}>
            {pendingItems.map((list, i) => {
              return (
                <ul className={`${styles.list}`} key={`pendingGroup-${i}`}>
                  {list.map((item, k) => {
                    return (
                      <li
                        className="text text_type_digits-default mb-2"
                        key={`pendingItem-${i + k}`}
                      >
                        <Link
                          to={`${location.pathname}/${item}`}
                          state={{
                            background: {
                              ...location,
                              state: {
                                ...location.state,
                                id: item,
                              },
                            },
                          }}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium mt-15">
        Выполнено за всё время:
      </p>
      <p className={`${styles.digits} text text_type_digits-large`}>{total}</p>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <p className={`${styles.digits} text text_type_digits-large`}>{today}</p>
    </Fragment>
  ) : null;
};

export default OrderStatus;
