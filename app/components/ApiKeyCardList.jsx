"use client";
import React, { useEffect, useState } from 'react';
import ApiKeyCard from './ApiKeyCard';
import { getActivePlans } from '../lib/api_key_manager';
import { Backdrop, CircularProgress } from '@mui/material';
import AppAlert from './AppAlert';
import ReportIcon from "@mui/icons-material/Report";

const ApiKeyList = ({ session }) => {
  const { user } = session ?? {};
  const { accessToken } = user ?? {};
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const fetchApiKeys = async () => {
      try {
        const { responseData } = await getActivePlans(accessToken);
        if (isSubscribed) {
          setApiKeys(responseData);
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

    fetchApiKeys();
    return () => (isSubscribed = false);
  }, [accessToken]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999, position: "absolute" }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {error ? (
        <div>Failed Fetching Data</div>
      ) : apiKeys?.length === 0 ? (
        <div>You Have No Active Plans</div>
      ) : (
        apiKeys.map((keyData, index) => (
          <ApiKeyCard
            key={index}
            planName={keyData.planName}
            apiKey={keyData.apiKey}
            expiryDate={keyData.expiryDate}
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

export default ApiKeyList;
