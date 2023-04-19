import OrderInfo from "../components/order-info/order-info";
import styles from "./order.module.css";

export function OrderPage() {
  return (
    <main className={styles.wrapper}>
      <OrderInfo page={true} />
    </main>
  );
}
