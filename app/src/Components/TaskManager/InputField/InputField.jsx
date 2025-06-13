import React from 'react';

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className=""
    />
  </div>
);

export default InputField;
