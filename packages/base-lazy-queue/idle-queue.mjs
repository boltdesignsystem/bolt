import { IdleQueue } from 'idlize/IdleQueue.mjs';

export const idleQueue = new IdleQueue({
  defaultMinTaskTime: 0,
  ensureTasksRun: true,
});
