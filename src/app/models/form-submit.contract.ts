import { TaskAction } from 'app/pages/home/enums/task-action';
import Task from './task.contract';

export default interface FormSubmit {
  task: Partial<Task>;
  action: TaskAction;
}
