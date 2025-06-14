import styles from './Header.module.scss'
import TaskTabs from './TaskTabs/TaskTabs'
import UserInfo from './UserInfo/UserInfo'
import WeekCalendar from './WeekCalendar/WeekCalendar'
import React from "react"



export default function Header({isFullHeader}) {
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <UserInfo />
                    {isFullHeader && <TaskTabs />}
                </div>
                <div className={styles.headerRight}>
                    {isFullHeader && <WeekCalendar />}
                </div>
            </div>
        </header>
    )
}