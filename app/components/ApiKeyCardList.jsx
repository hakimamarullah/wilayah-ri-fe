"use client"
import React from 'react';
import ApiKeyCard from './ApiKeyCard';


const apiKeys = [
  {
    planName: "Basic Plan",
    apiKey: "abcd1234efgh5678ijkl9012mnop3456",
    expiryDate: "2024-09-30"
  },
  {
    planName: "Standard Plan",
    apiKey: "ijkl5678mnop9012abcd3456efgh1234",
    expiryDate: "2024-10-15"
  },
  {
    planName: "Premium Plan",
    apiKey: "mnop9012abcd1234efgh5678ijkl3456",
    expiryDate: "2024-12-31"
  }
];

const ApiKeyList = () => {
  return (
    <div>
      {apiKeys.map((keyData, index) => (
        <ApiKeyCard
          key={index}
          planName={keyData.planName}
          apiKey={keyData.apiKey}
          expiryDate={keyData.expiryDate}
        />
      ))}
    </div>
  );
};

export default ApiKeyList;
