import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './css/ApiKeyCard.module.css';
import { formatDate } from '../lib/common_utils';

const ApiKeyCard = ({ planName, apiKey, expiryDate }) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert('API key copied to clipboard!');
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <div className={styles.planName}>{planName}</div>
        <div className={styles.expiryDate}>Expiry: {formatDate(expiryDate)}</div>
      </div>
      <div className={styles.middleSide}>
        <div className={styles.apiKeyContainer}>
          <input
            type="text"
            value={isKeyVisible ? apiKey : '•••••••••••••••••••'}
            readOnly
            className={styles.apiKey}
          />
          <div className={styles.iconContainer}>
            {isKeyVisible ? (
              <VisibilityOff className={styles.icon} onClick={toggleKeyVisibility} />
            ) : (
              <Visibility className={styles.icon} onClick={toggleKeyVisibility} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.copyButton} onClick={copyToClipboard}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default ApiKeyCard;
