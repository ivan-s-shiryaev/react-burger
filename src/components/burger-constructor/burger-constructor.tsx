import { FC, useCallback, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../hooks/redux";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  PWithModal,
  TAuth,
  TOrderState,
  TMenuState,
  TDnDItem,
} from "../../utils";
import { addOrderItem, getOrderStatus } from "../../services/actions/order";
import { SHOW_MODAL, HIDE_MODAL } from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import OrderItem from "../order-item/order-item";
import burgerConstructorStyles from "./burger-constructor.module.css";

type TState = { menu: TMenuState; order: TOrderState; auth: TAuth };

const BurgerConstructor: FC<PWithModal> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    menu: { items },
    order: {
      total,
      items: { locked, unlocked },
      status,
      request,
    },
    auth: {
      user: { data: user },
    },
  } = useSelector((state: TState): TState => state);

  const summary = total.locked + total.unlocked;

  const [, dropRef] = useDrop({
    accept: "menu",
    drop(item: TDnDItem) {
      dispatch(addOrderItem(item));
    },
  });

  const handleOrderCheckoutClick = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();

      user?.email
        ? (async () => {
            await dispatch(getOrderStatus({ locked, unlocked }));

            dispatch({
              type: SHOW_MODAL,
              payload: "order",
            });
          })()
        : navigate("/login");
    },
    [dispatch, navigate, user?.email, locked, unlocked]
  );

  const handleOrderCheckoutModalClose = useCallback(() => {
    dispatch({ type: HIDE_MODAL });
  }, [dispatch]);

  return (
    <aside ref={dropRef} className={`${burgerConstructorStyles.wrapper}`}>
      {locked.length > 0 ? (
        <ul
          className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.head} mt-4`}
        >
          {locked.map((value, index) => {
            const item = items.find(({ _id }) => _id === value.id);
            return (
              item !== undefined && (
                <OrderItem
                  {...item}
                  locked={true}
                  index={index}
                  mode={"top"}
                  key={`order_item__locked_top__${value.uuid}`}
                />
              )
            );
          })}
        </ul>
      ) : null}
      {unlocked.length > 0 ? (
        <ul
          className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.scroll}`}
        >
          {unlocked.map((value, index) => {
            const item = items.find(({ _id }) => _id === value.id);
            return (
              item !== undefined && (
                <OrderItem
                  {...item}
                  locked={false}
                  index={index}
                  mode={undefined}
                  key={`order_item__unlocked_middle__${value.uuid}`}
                />
              )
            );
          })}
        </ul>
      ) : null}
      {locked.length > 0 ? (
        <ul
          className={`${burgerConstructorStyles.container} ${burgerConstructorStyles.tail} mt-4`}
        >
          {locked.map((value, index) => {
            const item = items.find(({ _id }) => _id === value.id);
            return (
              item !== undefined && (
                <OrderItem
                  {...item}
                  locked={true}
                  index={index}
                  mode={"bottom"}
                  key={`order_item__locked_bottom__${value.uuid}`}
                />
              )
            );
          })}
        </ul>
      ) : null}
      <div className={`${burgerConstructorStyles.result}`}>
        <span
          className={`${burgerConstructorStyles.total} text text_type_digits-medium mr-10`}
        >
          {summary}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          onClick={handleOrderCheckoutClick}
          disabled={summary === 0 || request}
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {props.modal === "order" && status.number !== 0 && (
        <Modal handleClose={handleOrderCheckoutModalClose}>
          <OrderDetails number={status.number} name={status.name} />
        </Modal>
      )}
    </aside>
  );
};

export default BurgerConstructor;
