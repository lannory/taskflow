import React from "react";
import TodaysTask from "../../Components/TodaysTask/TodaysTask";
import ProjectSummary from "../../Components/ProjectSummary/ProjectSummary";
import styles from "./Overview.module.scss";

export default function Overview() {
    return (
        <div className={styles.OverviewWrapper}>
            <TodaysTask />
            <ProjectSummary />
        </div>
    )
}