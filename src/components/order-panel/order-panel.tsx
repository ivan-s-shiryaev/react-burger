import { FC } from "react";

import { TOrderEntry, PWithModal } from "../../utils";
import OrderEntry from "../order-entry/order-entry";
import styles from "./order-panel.module.css";

type TProps = PWithModal & {
  data: Array<TOrderEntry>;
  state?: boolean;
};

const OrderPanel: FC<TProps> = (props) => {
  const { data, state } = props;
  return (
    <div className={`${styles.container}`}>
      {data.map((value, index) => (
        <OrderEntry data={value} state={!!state} key={index}></OrderEntry>
      ))}
    </div>
  );
};

export default OrderPanel;
