import React from 'react';

const TextAreaField = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={4}
    className=""
  />
);

export default TextAreaField;
