import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { TMenu } from "../utils";
import { SET_MENU_ITEM } from "../services/actions/order";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";

type TState = {
  menu: TMenu;
};

export function IngredientPage() {
  const dispatch = useDispatch();
  const {
    item,
    items,
    itemsRequest: request,
  } = useSelector((state: TState): TMenu => state.menu);
  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: SET_MENU_ITEM,
      payload: null,
    });

    if (items.length > 0) {
      dispatch({
        type: SET_MENU_ITEM,
        payload: id,
      });
    }
  }, [dispatch, items.length, id]);

  return (
    <Fragment>
      {items.length === 0 || request ? null : (
        <main className={styles.wrapper}>
          <article className={styles.container}>
            {item ? (
              <Fragment>
                <h1 className={`${styles.header} text text_type_main-large`}>
                  Детали ингредиента
                </h1>
                <IngredientDetails />
              </Fragment>
            ) : (
              <Fragment>
                <h1 className="text text_type_main-medium">
                  Такого ингредиента нет...
                </h1>
                <p className="text text_type_main-default text_color_inactive mt-20">
                  Вернитесь в <Link to="/">конструктор</Link>
                </p>
              </Fragment>
            )}
          </article>
        </main>
      )}
    </Fragment>
  );
}
