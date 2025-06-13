import React from 'react';

const DateField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className=""
  />
);

export default DateField;
