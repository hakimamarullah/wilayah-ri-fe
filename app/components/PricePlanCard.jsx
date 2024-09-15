// components/PricePlanCard.js
"use client"
import React, { useState } from "react";
import styles from "./css/PricePlanCard.module.css";
import { PayButton } from "./PayButton";
import { formatPrice } from "../lib/common_utils";

const PricePlanCard = ({ tierId, tiername, limit, ttl, price, description, userToken, setSuccess, setLoading, setError }) => {
  const ttlInDays = Math.floor(ttl / (1000 * 60 * 60 * 24)); // Convert millis to days

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.tiername}>{tiername}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.limit}>Request up to {limit} per {ttlInDays} day(s)</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>{formatPrice(price)}</p>
        <PayButton name="Buy" tierId={tierId} userToken={userToken} setError={setError} setSuccess={setSuccess} setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default PricePlanCard;
