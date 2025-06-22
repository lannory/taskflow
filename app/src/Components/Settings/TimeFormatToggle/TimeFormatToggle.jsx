import React, {useState} from 'react';
import TimeFormatButton from '../TimeFormatButton/TimeFormatButton';
// import styles from './TimeFormatToggle.module.scss';


const TimeFormatToggle = () => {
  const [timeFormat, setTimeFormat] = useState('24h');

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <TimeFormatButton
        label="24 Hours"
        active={timeFormat === '24h'}
        onClick={() => setTimeFormat('24h')}
      />
      <TimeFormatButton
        label="12 Hours"
        active={timeFormat === '12h'}
        onClick={() => setTimeFormat('12h')}
      />
    </div>
  );
};

export default TimeFormatToggle;

// const TimeFormatToggle = ({ value, onChange }) => {
//   return (
//     <div className={styles.field}>
//       <label>Timezone</label>
//       <div className={styles.toggleGroup}>
//         <button
//           type="button"
//           className={value === '24h' ? styles.activeToggle : styles.toggle}
//           onClick={() => onChange('24h')}
//         >
//           24 Hours
//         </button>
//         <button
//           type="button"
//           className={value === '12h' ? styles.activeToggle : styles.toggle}
//           onClick={() => onChange('12h')}
//         >
//           12 Hours
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TimeFormatToggle;