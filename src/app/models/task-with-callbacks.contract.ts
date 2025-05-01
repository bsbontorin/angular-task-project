import Task from './task.contract';

export default interface TaskWithCallbacks extends Task {
  updateCallback: () => void;
  deleteCallback: () => void;
}
