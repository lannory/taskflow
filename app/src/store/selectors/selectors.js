import { createSelector } from '@reduxjs/toolkit';
import { calculateProjectProgress } from '../../utils/calculateProjectProgress';
import { calculateDaysLeft } from '../../utils/calculateDaysLeft';

export const selectTasks = state => state.tasks.tasks;
export const selectProjects = state => state.projects.projectsList;

export const selectProjectsWithProgress = createSelector(
    [selectProjects, selectTasks],
    (projects, tasks) => {
        if (!projects || !tasks) return { newProj: [], timeLim: [] };

        const categorized = { newProj: [], timeLim: [] };

        projects.forEach(project => {
            const progress = calculateProjectProgress(tasks, project.id);
            const daysLeft = calculateDaysLeft(project.deadline);

            const projectWithExtras = {
                ...project,
                progress,
                daysLeft,
            };

            if (daysLeft !== null && daysLeft <= 5) {
                categorized.timeLim.push(projectWithExtras);
            } else {
                categorized.newProj.push(projectWithExtras);
            }
        });

        return categorized;
    }
);
