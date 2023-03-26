import { FC, Fragment } from "react";

import orderDetailsStyles from "./order-details.module.css";
import tickOrderCheckout from "../../images/tick-order-checkout.svg";

type TProps = {
  number: number;
  name: string | null;
};

const OrderDetails: FC<TProps> = (props) => {
  return (
    <Fragment>
      <div className={`${orderDetailsStyles.container} mt-30 mb-8`}>
        <h3 className="text text_type_digits-large">{props.number}</h3>
      </div>
      <p
        className={`${orderDetailsStyles.container} mb-15 text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <div className={`${orderDetailsStyles.container} mb-4`}>
        <figure>
          <img src={tickOrderCheckout} alt="" />
        </figure>
      </div>
      <p
        className={`${orderDetailsStyles.container} mb-15 text text_type_main-default`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.container} mb-30 text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </Fragment>
  );
};

export default OrderDetails;
