import React from 'react';

const SelectField = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={onChange}
    className=""
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectField;
