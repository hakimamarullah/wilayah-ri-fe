"use client";
import React, { useEffect } from "react";
import { getCart } from "../lib/cart_api";
import { CartItemCard } from "./CartItemCard";

const CartItemList = ({ cartId, initialCartItems, accessToken }) => {
  const [items, setItems] = React.useState(initialCartItems);
  const [deleted, setItemDeleted] = React.useState(false);

  useEffect(() => {
    let subscribed = true;
    const fetchCart = async () => {
      try {
        const response = await getCart(accessToken);
        if (subscribed) {
          setItems(response?.data?.cartItems || []);
        }
      } catch (err) {
        console.debug({ cartItemList: err.message });
      }
    };
    fetchCart();
    return () => (subscribed = false);
  }, [deleted]);

  return (
    <>
      
    </>
  );
};

export default CartItemList;
