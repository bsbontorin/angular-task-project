import { TaskAction } from 'app/pages/home/enums/task-action';
import Task from './task.contract';

export default interface UiModalData extends Task {
  title: string;
  action: TaskAction;
}
