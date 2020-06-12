import { createSelector } from 'reselect';

const selectTask = state => state.task;

export const selectAllTasks = createSelector([selectTask], task =>
    task ? task.tasks : null
);
