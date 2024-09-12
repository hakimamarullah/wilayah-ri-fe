"use client";
import { Button } from "@mui/material";
import { formatPrice } from "../lib/common_utils";
import styles from "./css/CartCheckout.module.css";
import { checkout } from "../lib/order_api";

const CartCheckout = ({ total, accessToken }) => {
  const handleCheckout = async () => {
    const addressId = localStorage.getItem("shippingAddress");
    const response = await checkout(addressId, accessToken);
  };
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.title}>Total Payment</div>
        <div className={styles.price}>{formatPrice(total)}</div>
      </div>
      <div className={styles.checkoutBtn}>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleCheckout}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default CartCheckout;
