import React from "react";
import { TransactionCard } from "./TransactionCard";

const transactions = [
  {
    "planName": "Free",
    "orderId": "4e2f3c1b-5b42-4d1b-b7b8-2d6d6ff5e2a1",
    "price": 100000000000,
    "paymentUrl": "https://example.com/payment/9aaf5bbd-9b6d-4f76-b7d7-2e9d6f9f9e6e"
  },
  {
    "planName": "PRO",
    "orderId": "cfb8d2a0-8b53-4c09-b6b8-1c90db6c781d",
    "price": 34000000,
    "paymentUrl": "https://example.com/payment/6fba5d7e-9f1e-4c3f-9d44-2c5d9f7a4d2b"
  },
  {
    "planName": "ENTERPRISE",
    "orderId": "e1d5a2be-5d40-4b3d-8e9d-0d5ef7db4b25",
    "price": 2345000,
    "paymentUrl": "https://example.com/payment/2b99a0c2-5c85-4d53-a60e-2a5b5c7e1d9e"
  }
]

const TransactionsList = () => {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.orderId}
          planName={transaction.planName}
          orderId={transaction.orderId}
          price={transaction.price}
          paymentUrl={transaction.paymentUrl}
        />
      ))}
    </div>
  );
};

export default TransactionsList;