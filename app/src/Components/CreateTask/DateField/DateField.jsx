import React, { useState } from 'react';
import styles from './DateField.module.scss';

const DateField = ({ value, onChange, placeholder, label }) => {
  const [error, setError] = useState('');
  const [separator, setSeparator] = useState(null);

  const validateDate = (inputValue) => {
    if (!inputValue) {
      setError('');
      setSeparator(null);
      return;
    }

    const sep = separator || (inputValue.includes('.') ? '.' : inputValue.includes('/') ? '/' : null);
    if (sep && separator === null) {
      setSeparator(sep);
    }

    const otherSep = sep === '.' ? '/' : '.';
    if (inputValue.includes(otherSep)) {
      setError(`Можно использовать только один тип разделителя — '${sep}'`);
      return;
    }

    const dateRegex = new RegExp(`^(0[1-9]|[12][0-9]|3[01])\\${sep}(0[1-9]|1[0-2])\\${sep}\\d{4}$`);

    if (inputValue.length === 10 && dateRegex.test(inputValue)) {
      setError('');
    } else {
      return null
    }
  };

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (newValue.length > 10) return;

    const allowedCharsRegex = /^[0-9./]*$/;
    if (!allowedCharsRegex.test(newValue)) return;

    if (newValue.length === 1 && (newValue === '.' || newValue === '/')) return;

    if (/([./])\1/.test(newValue)) return;

    if (separator) {
      const otherSep = separator === '.' ? '/' : '.';
      if (newValue.includes(otherSep)) return;
    }

    onChange({ target: { value: newValue } });
    validateDate(newValue);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End',
      '.', '/',
    ];
    const isNumberKey = e.key >= '0' && e.key <= '9';

    if (separator) {
      const otherSep = separator === '.' ? '/' : '.';
      if (e.key === otherSep) {
        e.preventDefault();
        return;
      }
    }

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
        placeholder={placeholder}
        maxLength={10}
        className={`${styles.DateField} ${error ? styles.error : ''}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DateField;
