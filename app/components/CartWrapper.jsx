"use client";
import React, { useEffect } from "react";
import { formatAddress } from "../lib/common_utils";
import { CartItemCard } from "./CartItemCard";
import ShippingAddress from "./ShippingAddress";
import styles from "./css/CartWrapper.module.css";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";

const CartWrapper = ({ addresses, cartItems, cartId, accessToken }) => {
  const router = useRouter();
  const defaultAddress = addresses
    .filter((it) => it.isDefault === true)
    .map((it) => it.id);
  const defaultValue = addresses
    .filter((it) => it.isDefault === true)
    .map((it) => formatAddress(it));
  const [selectedAddress, setSelectedAddress] = React.useState(defaultAddress);


  const refreshPage = () => {
    router.refresh();
  }
  useEffect(() => {
    localStorage.setItem("shippingAddress", selectedAddress);
  }, [selectedAddress]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.shippingBlock}>
        <div style={{ marginBottom: "5px" }}>
          <strong>Shipping Address</strong>
        </div>
        <div>
          {" "}
          <ShippingAddress
            selectedValue={selectedAddress}
            setSelectedValue={setSelectedAddress}
            addresses={addresses}
            defaultValue={defaultValue}
          />
        </div>
      </div>
      <div className={styles.refresh}>
        <IconButton onClick={refreshPage}>
          <RefreshOutlinedIcon/>
        </IconButton>
      </div>
      <div className={styles.itemsContainer}>
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            cartId={cartId}
            provider={item.provider}
            itemId={item.id}
            simNumber={item.simCardNumber || ""}
            price={item.price}
            validity={item.validityPeriod}
            description={item.productDescription}
            accessToken={accessToken}
          />
        ))}
      </div>
    </div>
  );
};

export default CartWrapper;
