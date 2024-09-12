import React from "react";
import styles from "./css/PricePlan.module.css";

const PricePlanCard = ({ tiername, limit, ttl, price, description, onAddToCart }) => {
  const ttlInDays = Math.floor(ttl / (1000 * 60 * 60 * 24)); // Convert millis to days
  const ttlInSeconds = ttl / 1000;

  // Format the price in Indonesian Rupiah (IDR)
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.tiername}>{tiername}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.limit}>Request up to {limit} per {ttlInDays} day</p>
        <p>good for small businessess</p>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>{formattedPrice}</p>
        <button className={styles.addButton} onClick={onAddToCart}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PricePlanCard;
