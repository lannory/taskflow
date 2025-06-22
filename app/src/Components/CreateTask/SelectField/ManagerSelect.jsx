import React, { useState, useRef, useEffect } from 'react';
import styles from './ManagerSelect.module.scss';

const managers = [
  { name: 'Anna', avatar: '/avatars/anna.jpg' },
  { name: 'John', avatar: '/avatars/john.jpg' },
  { name: 'Kira', avatar: '/avatars/kira.jpg' },
];

const ManagerSelect = ({ value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = managers.find((m) => m.name === value);

  const handleSelect = (manager) => {
    onChange(manager.name);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <div className={styles.selected} onClick={() => setOpen(!open)}>
        {selected ? (
          <>
            <img src={selected.avatar} alt={selected.name} className={styles.avatar} />
            <span>{selected.name}</span>
          </>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          {managers.map((manager) => (
            <div
              key={manager.name}
              className={styles.option}
              onClick={() => handleSelect(manager)}
            >
              <img src={manager.avatar} alt={manager.name} className={styles.avatar} />
              <span>{manager.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerSelect;
