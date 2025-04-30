import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Task from 'app/models/task.contract';
import { environment } from 'app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  // * INJECTS
  http = inject(HttpClient);

  // * METHODS
  public getTasks$(): Observable<Array<Task>> {
    const url = `${environment.baseUrlApi}/tasks`;
    return this.http.get<Array<Task>>(url);
  }
}
