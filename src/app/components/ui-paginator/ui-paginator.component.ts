import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-paginator',
  imports: [],
  template: `
    <section class="ui-paginator">
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button class="ui-paginator__button" (click)="previousPage()" [disabled]="page === 1">◀</button>
      <button class="ui-paginator__button" (click)="nextPage()" [disabled]="page === totalPages">▶</button>
    </section>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .ui-paginator {
        @include flexbox(row, flex-end, center);
        gap: 0.5rem;
        width: 100%;

        &__button {
          cursor: pointer;
          border: 1px solid var(--black);
          width: 1.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 50%;

          &:disabled {
            cursor: not-allowed;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPaginatorComponent {
  // * DIRECTIVES
  @Input() page = 1;
  @Input() total = 0;
  @Input() pageSize = 5;

  @Output() pageChange = new EventEmitter<number>();

  // * GETs
  public get totalPages(): number {
    return Math.ceil(this.total / this.pageSize) || 1;
  }

  // * METHODS
  public nextPage(): void {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  public previousPage(): void {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }
}
