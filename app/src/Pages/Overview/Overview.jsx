import React from "react";
import TodaysTask from "../../Components/TodaysTask/TodaysTask";
import ProjectSummary from "../../Components/ProjectSummary/ProjectSummary";
import styles from "./Overview.module.scss";
import StatistickBlock from "../../Components/StatistickBlock/StatistickBlock";

export default function Overview() {
    return (
        <div className={styles.OverviewWrapper}>
            <TodaysTask />
            <ProjectSummary />
            <StatistickBlock type="total_tasks" />
        </div>
    )
}