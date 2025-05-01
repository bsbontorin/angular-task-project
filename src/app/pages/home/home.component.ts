import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { UiModalComponent } from 'app/components/ui-modal/ui-modal.component';
import { UiPaginatorComponent } from 'app/components/ui-paginator/ui-paginator.component';
import PaginatorData from 'app/models/paginator-data.contract';
import TableColumn from 'app/models/table-column.contract';
import TableSort from 'app/models/table-sort.contract';
import TaskWithCallbacks from 'app/models/task-with-callbacks.contract';
import Task from 'app/models/task.contract';
import { TaskServiceService } from 'app/services/task.service';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';

import { UiButtonComponent } from './../../components/ui-button/ui-button.component';
import { TableColumns } from './enums/table-columns';
import { TaskAction } from './enums/task-action';

@Component({
  selector: 'home',
  imports: [AsyncPipe, DatePipe, UiButtonComponent, UiModalComponent, UiPaginatorComponent],
  template: `
    <section class="container">
      <h1 class="container__title">Activity table</h1>

      <div class="container__actions">
        <ui-button [buttonModifier]="'success'" [buttonText]="'Add Task'" />
      </div>

      <div class="container__table">
        <table class="table">
          <thead class="table__head">
            <tr>
              @for(column of displayedColumns; track column.key) {
              <th>
                <div class="th__text">
                  <span class="th__text__name">{{ column.value }}</span>
                  <span class="th__text__sort" (click)="sortColumn(column)">{{ sortIcon$(column) | async }}</span>
                </div>
              </th>
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
              <td [attr.colspan]="displayedColumns.length">
                @if(getPaginatorData$ | async; as paginator) {
                <ui-paginator [page]="paginator.page" [total]="paginator.total" (pageChange)="onPagePaginatorChange($event)"></ui-paginator>
                }
              </td>
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

                & .th__text {
                  @include flexbox(row, center, center);
                  gap: 0.5rem;
                  cursor: pointer;
                }

                &:last-child {
                  & .th__text {
                    &__sort {
                      display: none;
                    }
                  }
                }
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
                border-radius: 0 0 0.5rem 0.5rem;
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
  private filterDataSource$ = new BehaviorSubject<TableSort>({ column: { key: '', value: '' }, direction: 'asc' });
  private updateDataSource$ = new BehaviorSubject<boolean>(true);

  public paginatorDataSource$ = new BehaviorSubject<PaginatorData>({ page: 1, pageSize: 5, total: 5 });

  // * VARIABLES
  public readonly displayedColumns: Array<TableColumn> = Object.entries(TableColumns).map(([key, value]) => ({
    key,
    value,
  }));

  public readonly tasks$ = this.getTasks$;

  // * GETs
  private get getTasks$(): Observable<Array<TaskWithCallbacks>> {
    return this.updateDataSource$.asObservable().pipe(
      filter(Boolean),
      switchMap(() => {
        console.log('entrou :>> ');
        return this.taskService.getTasks$().pipe(
          tap((response) => {
            this.paginatorDataSource$.next({ page: 1, pageSize: 5, total: response?.length || 5 });
          }),
          switchMap((response) => {
            return this.filterDataSource$.asObservable().pipe(
              map(({ column, direction }) => {
                const mappedTasks = response.map(
                  (task): TaskWithCallbacks => ({
                    ...task,
                    updateCallback: () => this.openModal(TaskAction.UPDATE, task),
                    deleteCallback: () => this.openModal(TaskAction.DELETE, task),
                  }),
                );

                if (!direction) {
                  return mappedTasks;
                }

                return mappedTasks.sort((a, b) => {
                  const valueA = a[column.key as keyof Task];
                  const valueB = b[column.key as keyof Task];

                  const isNumeric = !isNaN(+valueA) && !isNaN(+valueB);

                  if (isNumeric) {
                    return direction === 'asc' ? +valueA - +valueB : +valueB - +valueA;
                  }

                  return direction === 'asc' ? String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
                });
              }),
              switchMap((mappedResponse) => {
                return this.paginatorDataSource$.asObservable().pipe(
                  map(({ page, pageSize }) => {
                    const start = (page - 1) * pageSize;
                    const end = start + pageSize;
                    return mappedResponse.slice(start, end);
                  }),
                );
              }),
            );
          }),
        );
      }),
    );
  }

  public get getPaginatorData$(): Observable<PaginatorData> {
    return this.paginatorDataSource$.asObservable();
  }

  // * METHODS
  public sortIcon$(column: TableColumn): Observable<string> {
    return this.filterDataSource$.pipe(
      map(({ column: activeColumn, direction }) => {
        if (activeColumn.key !== column.key) return '⇅';
        return direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '⇅';
      }),
    );
  }

  public sortColumn(column: TableColumn): void {
    const { column: oldColumn, direction } = this.filterDataSource$.getValue();
    const nextDirection = column.key !== oldColumn.key ? 'asc' : direction === null ? 'asc' : direction === 'asc' ? 'desc' : null;
    this.filterDataSource$.next({ column, direction: nextDirection });
  }

  public onPagePaginatorChange(event: any): void {
    const oldValue = this.paginatorDataSource$.getValue();
    this.paginatorDataSource$.next({ ...oldValue, page: event });
  }

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
