"use client";
import { Button, Divider } from "@mui/material";
import React from "react";
import { formatAddress } from "../lib/common_utils";
import SimpleDialog from "./AppDialog";
import styles from "./css/ShippingAddress.module.css";

const ShippingAddress = ({
  defaultValue,
  addresses,
  selectedValue,
  setSelectedValue,
}) => {
  const items = addresses.map((item) => ({
    id: item.id,
    value: formatAddress(item).toLowerCase(),
  }));
  const map = new Map(items.map((item) => [item.id, item.value]));

 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.addressSection}>
        <div className={styles.addressDetails}>
          <p>{map.get(selectedValue) || defaultValue}</p>
        </div>
        <div className={styles.changeBtn}>
          <Button variant="text" onClick={handleClickOpen}>
            Change
          </Button>
        </div>
      </div>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        items={items}
        title={"Choose Shipping Address"}
      />
    </div>
  );
};

export default ShippingAddress;
