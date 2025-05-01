import { TaskAction } from 'app/pages/home/enums/task-action';
import Task from './task.interface';

export default interface FormSubmit {
  task: Partial<Task>;
  action: TaskAction;
}
