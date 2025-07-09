export function calculateProjectProgress(tasks, projectId) {
    const projectTasks = tasks.filter(task => task.projectId === projectId);

    if (projectTasks.length === 0) return 0;

    const doneStatuses = ['Approved'];
    const completedCount = projectTasks.filter(task => doneStatuses.includes(task.status)).length;

    return Math.round((completedCount / projectTasks.length) * 100);
}