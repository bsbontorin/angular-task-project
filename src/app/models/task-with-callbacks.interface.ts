import Task from './task.interface';

export default interface TaskWithCallbacks extends Task {
  updateCallback: () => void;
  deleteCallback: () => void;
}
