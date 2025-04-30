import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  styles: ``,
})
export class HomeComponent {
  // * INJECTS
  private taskService = inject(TaskServiceService);

  // * VARIABLES
  public tasks$ = this.getTasks$;

  // * GETs
  private get getTasks$(): Observable<Array<Task>> {
    return this.taskService.getTasks$();
  }
}
