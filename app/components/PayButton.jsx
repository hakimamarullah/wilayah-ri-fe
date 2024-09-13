import React from "react";
import styles from "./css/PayButton.module.css";

export function PayButton({ url }) {
  return (
    <a href={url} className={styles.payButton} target="_blank" rel="noopener noreferrer">
      Pay
    </a>
  );
}
