import styles from './BigButton.module.scss';
import React from "react"


export default function BigButton({ text, style }) {
  let colorClass = '';

  if (style === 'purple') {
    colorClass = styles.purpleButton;
  } else if (style === 'red') {
    colorClass = styles.redButton;
  }

  const className = `${styles.BigButton} ${colorClass}`;

  return (
    <button className={className}>{text}</button>
  );
}
