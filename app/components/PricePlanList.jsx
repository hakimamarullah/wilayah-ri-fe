"use client";
import React, { useEffect, useState } from "react";
import PricePlanCard from "./PricePlanCard";
import { getAvailableTiers } from "../lib/api_key_manager";
import { Backdrop, CircularProgress } from "@mui/material";
import AppAlert from "./AppAlert";
import ReportIcon from "@mui/icons-material/Report";
import styles from "./css/PricePlanList.module.css";
import { useRouter } from "next/navigation";

const PricePlanList = ({ userToken }) => {
  const router = useRouter();
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPurchaseMsg, setShowPurchaseMsg] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState({});
  const [alert, setAlert] = useState(false);

  const handlePurchase = (e) => {
    if (e === "success") {
      setPurchaseMessage({
        title: "Purchase Success",
        message: "Your order has been created",
        color: "success",
      });
      setShowPurchaseMsg(true);

      // Use setTimeout correctly to execute router.push
      setTimeout(() => {
        router.push("/orders");
      }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
    } else {
      setPurchaseMessage({
        title: "Purchase Failed",
        message: "Please try again",
        color: "danger",
      });
      setShowPurchaseMsg(true);
    }
  };
  useEffect(() => {
    let isSubscribed = true;
    const fetchTiers = async () => {
      try {
        const { responseData, responseCode } = await getAvailableTiers();
        if (responseCode !== 200) {
          throw new Error("something went wrong");
        }
        if (isSubscribed) {
          setTiers(responseData);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(true); // Set error state to true
          setAlert(true);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchTiers();
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className={styles.container}>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999, position: "absolute" }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {error ? (
        <div>Failed Fetching Data</div>
      ) : tiers?.length === 0 ? (
        <div>No Available Tiers</div>
      ) : (
        tiers.map((item, index) => (
          <PricePlanCard
            key={index}
            tiername={item.name}
            limit={item.limit}
            ttl={item.ttl}
            price={item.price}
            description={item.description}
            userToken={userToken}
            tierId={item.id}
            setLoading={setLoading}
            setError={() => handlePurchase("error")}
            setSuccess={() => handlePurchase("success")}
          />
        ))
      )}

      {error && (
        <AppAlert
          title={"Application Error"}
          color="danger"
          message="Something went wrong. Please try again later!"
          show={alert}
          handleClose={() => setAlert(false)}
          icon={<ReportIcon />}
        />
      )}

      <AppAlert
        title={purchaseMessage.title}
        color={purchaseMessage.color}
        message={purchaseMessage.message}
        show={showPurchaseMsg}
        handleClose={() => setShowPurchaseMsg(false)}
        icon={<ReportIcon />}
      />
    </div>
  );
};

export default PricePlanList;
