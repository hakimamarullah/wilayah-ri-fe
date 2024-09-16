"use client";
import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import AppAlert from './AppAlert';
import ReportIcon from "@mui/icons-material/Report";
import { getPendingTransactions } from '../lib/payment_service';
import { TransactionCard } from './TransactionCard';

const TransactionList = ({ session }) => {
  const { user } = session ?? {};
  const { accessToken } = user ?? {};
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const fetchPendingTransactions = async () => {
      try {
        const { responseData, responseCode } = await getPendingTransactions(accessToken);
        if (responseCode !== 200) {
          throw new Error('something went wrong');
        }
        if (isSubscribed) {
          setTransactions(responseData);
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

    fetchPendingTransactions();
    return () => (isSubscribed = false);
  }, [accessToken]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999, position: "absolute", minHeight: "100vh" }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {error ? (
        <div>Failed Fetching Data</div>
      ) : transactions?.length === 0 ? (
        <div>You Have No Pending Transactions</div>
      ) : (
        transactions.map((item, index) => (
          <TransactionCard
            key={index}
            planName={item.tierName}
            orderId={item.trxId}
            amount={item.amount}
            paymentUrl={item.paymentUrl}
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
    </div>
  );
};

export default TransactionList;
