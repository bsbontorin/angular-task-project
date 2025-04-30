import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import Task from 'app/models/task.contract';
import { TaskServiceService } from 'app/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  imports: [AsyncPipe],
  template: `
    @for(task of (tasks$ | async); track task.id) {
    <p>{{ task?.name }}</p>
    }

    <p>home works!</p>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // * INJECTS
  private taskService = inject(TaskServiceService);

  // * VARIABLES
  public tasks$ = this.taskService.getTasks$();

  // * GETs
  private getTasks$(): Observable<Array<Task>> {
    return this.taskService.getTasks$();
  }
}
