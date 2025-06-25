import { startOfWeek, addDays, format, subWeeks, addWeeks } from 'date-fns';
import { useEffect, useState } from 'react';
import styles from './WeekCalendar.module.scss';
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { searchByDate } from '../../../store/Tasks/TasksSlice';
import { useNavigate } from 'react-router-dom';

export default function WeekCalendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchDate = useSelector((state) => state.tasks.searchDate);

  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });

  const handlePrevWeek = () => setCurrentDate(prev => subWeeks(prev, 1));
  const handleNextWeek = () => setCurrentDate(prev => addWeeks(prev, 1));

  const days = Array.from({ length: 7 }).map((_, index) => {
    const day = addDays(weekStart, index);
    const isActive = format(day, 'yyyy-MM-dd') === searchDate;
    return (
      <div
        key={index}
        className={`${styles.day} ${isActive ? styles.active : ''}`}
        onClick={() => {
          dispatch(searchByDate(format(day, 'yyyy-MM-dd')))
          navigate('/alltasks')

        }}
      >
        <div className={styles.dayName}>{format(day, 'EEEEE')}</div>
        <div className={styles.dayNumber}>{format(day, 'd')}</div>
      </div>
    );
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={handlePrevWeek} className={styles.navBtn}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h3>{format(currentDate, 'MMMM yyyy')}</h3>
        <button onClick={handleNextWeek} className={styles.navBtn}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className={styles.week}>{days}</div>
    </div>
  );
}
