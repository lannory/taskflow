import { createSelector } from '@reduxjs/toolkit';
import { calculateProjectProgress } from '../../utils/calculateProjectProgress';
import { calculateDaysLeft } from '../../utils/calculateDaysLeft';

export const selectTasks = state => state.tasks.tasks;
export const selectProjects = state => state.projects.projectsList;

export const selectProjectsEnriched = createSelector(
  [selectProjects, selectTasks],
  (projects, tasks) => {
    if (!projects || !tasks) return { list: [], categories: { newProj: [], timeLim: [] } };

    const list = projects.map(project => {
      const progress = calculateProjectProgress(tasks, project.id);
      const daysLeft = calculateDaysLeft(project.deadline);
      return { ...project, progress, daysLeft };
    });

    const categories = {
      newProj: list.filter(p => p.daysLeft === null || p.daysLeft > 7),
      timeLim: list.filter(p => p.daysLeft !== null && p.daysLeft <= 7),
    };

    return { list, categories };
  }
);
