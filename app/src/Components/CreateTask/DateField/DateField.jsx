import React, { useState } from 'react';
import styles from './DateField.module.scss';

const isValidDate = (val) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(val)) {
    return 'Введите корректную дату в формате DD/MM/YYYY';
  }

  const [d, m, y] = val.split('/');
  const date = new Date(`${y}-${m}-${d}`);
  const valid = date.getDate() === +d && (date.getMonth() + 1) === +m && date.getFullYear() === +y;

  if (!valid) {
    return 'Несуществующая дата';
  }
  if (+y > 2025) {
    return 'Год не может быть больше 2025';
  }
  return '';
};

export const formatDate = (input) => {
  const digitsOnly = input.replace(/\D/g, '').slice(0, 8);
  let day = digitsOnly.slice(0, 2);
  let month = digitsOnly.slice(2, 4);
  let year = digitsOnly.slice(4, 8);

  if (month.length === 2 && +month > 12) {
    month = '12';
  }

  if (year.length === 4 && +year > 2025) {
    year = '2025';
  }

  let formatted = '';
  if (day) formatted += day;
  if (month) formatted += '/' + month;
  if (year) formatted += '/' + year;

  return formatted;
};

const DateField = ({ value, onChange, placeholder, label }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const raw = e.target.value;
    const formatted = formatDate(raw);
    onChange({ target: { value: formatted } });
    setError(isValidDate(formatted));
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'
    ];
    const isNumberKey = e.key >= '0' && e.key <= '9';
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.DateFieldContainer}>
      <label className={styles.DateFieldLabel}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'ДД/ММ/ГГГГ'}
        maxLength={10}
        className={`${styles.DateField} ${error ? styles.error : ''}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DateField;