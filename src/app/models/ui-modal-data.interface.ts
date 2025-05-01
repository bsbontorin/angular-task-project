import { TaskAction } from 'app/pages/home/enums/task-action';
import Task from './task.interface';

export default interface UiModalData {
  task?: Task
  title: string;
  action: TaskAction;
}
