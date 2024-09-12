"use client";
import * as React from "react";
import styles from "./css/SortSelect.module.css"

export default function SortSelect({ items, onSelect, placeHolder }) {
  return (
    <div className={styles.selectContainer}>
        <select onClick={onSelect} className={styles.select}>
           <option value="">--{placeHolder}--</option>
            {items && items.map(item => (
                <option key={item.value} value={item.value}>{item.name}</option>

            ))}
        </select>
    </div>
);
}
