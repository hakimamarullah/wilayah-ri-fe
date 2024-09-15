"use client";
import React from "react";
import styles from "./css/PayButton.module.css";
import { purchaseApiKey } from "../lib/payment_service";

export function PayButton({
  name = "Pay",
  url,
  userToken,
  tierId,
  setError,
  setSuccess,
  setLoading,
}) {
  const handleClick = async (event) => {
    if (url) {
      // Open the URL in a new tab if provided
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    // Prevent default button behavior and call the createPayment function
    event.preventDefault();
    try {
      setLoading(true);
      const { responseCode } = await purchaseApiKey({ tierId }, userToken);
      if (responseCode !== 200) {
        setError(true);
        return;
      }
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={styles.payButton} onClick={handleClick}>
      {name}
    </button>
  );
}
