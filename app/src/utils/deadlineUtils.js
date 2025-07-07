import { calculateDaysLeft } from '../utils/calculateDaysLeft';

export function getDeadlineLabel(deadline, t) {
    const daysLeft = calculateDaysLeft(deadline);
  
    if (daysLeft > 0) {
      return `${daysLeft} ${t('projects.deadline.days')} ${t('projects.deadline.left')}`;
    }
  
    if (daysLeft === 0) {
      return t('projects.deadline.today');
    }
  
    return t('projects.deadline.overdue');
}