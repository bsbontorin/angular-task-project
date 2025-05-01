import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import Task from 'app/models/task.contract';
import { TaskServiceService } from 'app/services/task.service';
import { Observable } from 'rxjs';

import { UiButtonComponent } from './../../components/ui-button/ui-button.component';
import { TableColumns } from './enums/table-columns';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'home',
  imports: [AsyncPipe, DatePipe, UiButtonComponent],
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
                  <ui-button [buttonModifier]="'alert'" [buttonText]="'Edit'" />
                  <ui-button [buttonModifier]="'danger'" [buttonText]="'Delete'" />
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // * INJECTS
  private taskService = inject(TaskServiceService);

  // * VARIABLES
  public readonly displayedColumns: readonly TableColumns[] = Object.values(TableColumns) as readonly TableColumns[];

  public tasks$ = this.getTasks$;

  // * GETs
  private get getTasks$(): Observable<Array<Task>> {
    return this.taskService.getTasks$();
  }
}
