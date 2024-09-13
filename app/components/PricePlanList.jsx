// components/PricePlanList.js
"use client"
import React from "react";
import PricePlanCard from "./PricePlanCard"; // Adjust path if necessary
import styles from "./css/PricePlanList.module.css";

const PricePlanList = ({ plans, onAddToCart }) => {
  return (
    <div className={styles.container}>
      {plans.map((plan, index) => (
        <PricePlanCard
          key={index}
          tiername={plan.tiername}
          limit={plan.limit}
          ttl={plan.ttl}
          price={plan.price}
          description={plan.description}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default PricePlanList;
