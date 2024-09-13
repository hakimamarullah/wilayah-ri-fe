import React from "react";
import styles from "./css/TransactionCard.module.css";
import { PayButton } from "./PayButton";
import { formatPrice } from "../lib/common_utils";

export function TransactionCard({ planName, orderId, price, paymentUrl }) {
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <div className={styles.planLabel}>Plan</div>
        <div className={styles.planName}>{planName}</div>
        <div className={styles.orderLabel}>Order ID</div>
        <div className={styles.orderId}>{orderId}</div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.price}>{formatPrice(price)}</div>
        <PayButton url={paymentUrl} />
      </div>
    </div>
  );
}
