import React from 'react'
import styles from "./css/ProductCard.module.css"
import AddToCartBtn from './AddToCartBtn'
import dayjs from 'dayjs'
import { formatPrice, formatSimNumber } from '../lib/common_utils'

export function ProductCard({ provider, productId, simNumber, price, validity, description, accessToken }){
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        {provider &&  <div className={styles.provider}>{provider}</div>}
        <div className={styles.simNumber}>{formatSimNumber(simNumber)}</div>
      </div>
      <div className={styles.middleSide}>
        <div className={styles.price}>
          {formatPrice(price)}
        </div>
        <div className={styles.validity}>
          <p className={styles.validityText}>expiry: {validity ? dayjs(validity).format("d MMM YYYY") : "lifetime" }</p>
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
      <div className={styles.rightSide}>
        <AddToCartBtn productId={productId} accessToken={accessToken}/>
      </div>
    </div>
  )
}
