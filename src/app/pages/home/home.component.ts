import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { UiModalComponent } from 'app/components/ui-modal/ui-modal.component';
import TaskWithCallbacks from 'app/models/task-with-callbacks.contract';
import Task from 'app/models/task.contract';
import { TaskServiceService } from 'app/services/task.service';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';

import { UiButtonComponent } from './../../components/ui-button/ui-button.component';
import { TableColumns } from './enums/table-columns';
import { TaskAction } from './enums/task-action';

@Component({
  selector: 'home',
  imports: [AsyncPipe, DatePipe, UiButtonComponent, UiModalComponent],
  template: `
    <section class="container">
      <h1 class="container__title">Activity table</h1>

      <div class="container__actions">
        <ui-button [buttonModifier]="'success'" [buttonText]="'Add Task'" />
        <span>sort</span>
      </div>

      <div class="container__table">
        <table class="table">
          <thead class="table__head">
            <tr>
              @for(column of displayedColumns; track column) {
              <th>{{ column }}</th>
              }
            </tr>
          </thead>
          <tbody class="table__body">
            @for(task of tasks$ | async; track task.id) {
            <tr>
              <td>{{ task.id }}</td>
              <td>{{ task.date | date : 'dd/MM/yyyy' }}</td>
              <td>{{ task.name }}</td>
              <td>{{ task.effort }}</td>
              <td>{{ task.status }}</td>
              <td>{{ task.description }}</td>
              <td>{{ task.responsible }}</td>
              <td>
                <div class="table__actions">
                  <ui-button [buttonModifier]="'alert'" [buttonText]="'Edit'" (callback)="task.updateCallback()" />
                  <ui-button [buttonModifier]="'danger'" [buttonText]="'Delete'" (callback)="task.deleteCallback()" />
                </div>
              </td>
            </tr>
            }
          </tbody>
          <tfoot class="table__foot">
            <tr>
              <td [attr.colspan]="displayedColumns.length">paginator here</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <!-- custom modal to delete tasks -->
    <ui-modal #modal>
      <div class="delete-modal__container">
        @if(modal.data$ | async; as data) {
        <p>{{ data?.name }}</p>

        <div class="delete-modal__actions">
          <ui-button [buttonModifier]="'danger'" [buttonText]="'Delete'" (callback)="closeModal(data.action, data.id)" />
          <ui-button [buttonModifier]="'secondary'" [buttonText]="'Cancel'" (callback)="closeModal()" />
        </div>
        }
      </div>
    </ui-modal>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .container {
        @include flexbox(column, flex-start, center);
        background-color: var(--gray-700);
        flex: 1;
        margin: 1rem 2rem;
        padding: 0rem 2rem 2rem 2rem;
        border-radius: 0.5rem;

        &__title {
          @include gradient-text(#ad61ea, #15d0ea);
          margin: 1rem auto;
          font-size: 1.5rem;
        }

        &__actions {
          @include flexbox(row, flex-end, center);
          gap: 1rem;
          width: 85%;
        }

        & .container__table {
          @include flexbox(column, center, flex-start);
          overflow-x: auto;
          width: 85%;

          & .table {
            width: 100%;
            font-size: 0.875rem;
            margin-top: 1rem;
            border-collapse: collapse;

            &__head {
              & th {
                padding: 1rem;
                background-color: var(--neutral-800);
              }

              & th:first-child {
                border-radius: 0.5rem 0 0 0;
              }

              & th:last-child {
                border-radius: 0 0.5rem 0 0;
              }
            }

            &__body {
              & td {
                min-width: 10rem;
                max-width: 15rem;
                padding: 0.5rem 0.5rem;
                text-align: center;

                & .table__actions {
                  @include flexbox(row, center, center);
                  gap: 0.5rem;
                }
              }
            }

            &__foot {
              & td {
                padding: 1rem;
                border-top: 2px solid var(--gray-600);
                text-align: right;
                background-color: var(--gray-800);
              }
            }

            & tr:nth-child(odd) {
              background-color: var(--gray-800);
            }

            & tr:nth-child(even) {
              background-color: var(--neutral-800);
            }
          }
        }
      }

      .delete-modal__container {
        @include flexbox(column, flex-start, center);

        & .delete-modal__actions {
          @include flexbox(row, center center);
          gap: 1rem;
          margin-top: 1rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // * INJECTS
  private taskService = inject(TaskServiceService);

  // * DIRECTIVES
  @ViewChild('modal') modal!: UiModalComponent;

  // * OBSERVABLES
  private updateDataSource$ = new BehaviorSubject<boolean>(true);

  // * VARIABLES
  public readonly displayedColumns: readonly TableColumns[] = Object.values(TableColumns) as readonly TableColumns[];
  public readonly tasks$ = this.getTasks$;

  // * GETs
  private get getTasks$(): Observable<Array<TaskWithCallbacks>> {
    return this.updateDataSource$.asObservable().pipe(
      filter(Boolean),
      switchMap(() => {
        console.log('entrou :>> ');
        return this.taskService.getTasks$().pipe(
          map((response: Array<Task>) => {
            return response.map(
              (task): TaskWithCallbacks => ({
                ...task,
                updateCallback: () => this.openModal(TaskAction.UPDATE, task),
                deleteCallback: () => this.openModal(TaskAction.DELETE, task),
              }),
            );
          }),
        );
      }),
    );
  }

  // * METHODS
  public openModal(action: TaskAction, task: Task): void {
    const titles = {
      [TaskAction.CREATE]: 'Create task',
      [TaskAction.UPDATE]: 'Update task',
      [TaskAction.DELETE]: 'Do you really want to delete this task?',
    };

    this.modal.open({ ...task, action, title: titles[action] });
  }

  public closeModal(action?: TaskAction, taskId?: string): void {
    const messages = {
      [TaskAction.CREATE]: 'Task created successfully!',
      [TaskAction.UPDATE]: 'Task updated successfully!',
      [TaskAction.DELETE]: 'Task deleted successfully!',
    };

    let observable = of();

    if (action === TaskAction.DELETE && taskId) {
      observable = this.taskService.deleteTask$(taskId);
    }

    observable
      .pipe(
        take(1),
        tap((response) => {
          alert(messages[action!]);
          console.log('response :>> ', response);
          this.updateDataSource$.next(true);
        }),
      )
      .subscribe();

    this.modal.close();
  }
}
