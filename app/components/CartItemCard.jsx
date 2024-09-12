import dayjs from "dayjs";
import { formatPrice, formatSimNumber } from "../lib/common_utils";
import styles from "./css/CartItemCard.module.css";
import DeleteCartItemBtn from "./DeleteCartItemBtn";

export function CartItemCard({
  cartId,
  provider,
 itemId,
  simNumber,
  price,
  validity,
  description,
  accessToken,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        {provider && <div className={styles.provider}>{provider}</div>}
        <div className={styles.simNumber}>{formatSimNumber(simNumber)}</div>
      </div>
      <div className={styles.middleSide}>
        <div className={styles.price}>{formatPrice(price)}</div>
        <div className={styles.validity}>
          <p className={styles.validityText}>
            expiry: {validity ? dayjs(validity).format("d MMM YYYY") : validity}
          </p>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.rightSide}>
        <DeleteCartItemBtn
          cartId={cartId}
          itemId={itemId}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
}
