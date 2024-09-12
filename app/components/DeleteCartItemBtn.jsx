"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReportIcon from "@mui/icons-material/Report";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import React from "react";
import { doLogout } from "../actions";
import { addItemToCart, deleteCartItemById } from "../lib/cart_api";
import styles from "./css/DeleteCartItemBtn.module.css";
import AppAlert from "./AppAlert";

const DeleteCartItemBtn = ({ cartId, itemId, accessToken }) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDuplicate, setIsError] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);

  const handleDeleteItem = async () => {
    try {
      const response = await deleteCartItemById(cartId, itemId, accessToken);
      console.log({response})
      if (response.code === 401 || response.code === 403) {
        await doLogout("/auth/signin");
      } else if (response.code === 200) {
        setIsSuccess(true);
      } else if (response.code >= 500) {
        setIsError(true);
      } else {
        setUnexpectedError(true);
      }
    } catch (err) {
      setUnexpectedError(true);
    }
  };
  return (
    <div>
      <AppAlert
        title={"Success Remove item"}
        color="success"
        message="Item has been removed"
        show={isSuccess}
        handleClose={() => setIsSuccess(false)}
        icon={<CheckCircleIcon />}
      />
      <AppAlert
        title={"Failed Remove Item"}
        color="warning"
        message="Something went wrong. Please try again later"
        show={isDuplicate}
        handleClose={() => setIsError(false)}
        icon={<ReportProblemOutlinedIcon />}
      />
      <AppAlert
        title={"Application Error"}
        color="danger"
        message="Something went wrong. Please try again later!"
        show={error}
        handleClose={() => setUnexpectedError(false)}
        icon={<ReportIcon />}
      />
      <button className={styles.deleteBtn} onClick={() => handleDeleteItem()}>
        <DeleteOutlinedIcon className={styles.iconDelete} />
      </button>
    </div>
  );
};

export default DeleteCartItemBtn;
