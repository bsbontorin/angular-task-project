import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-modal',
  imports: [],
  template: `
    <dialog #dialogRef class="ui-modal" (click)="handleBackdrop($event)">
      <section class="ui-modal__content" (click)="$event.stopPropagation()">
        <header class="ui-modal__header">
          <div class="ui-modal__actions">
            <button class="ui-modal__close" (click)="close()">×</button>
          </div>
          <h2 class="ui-modal__title">{{ title }}</h2>
        </header>

        <main class="ui-modal__main">
          <ng-content />
        </main>
      </section>
    </dialog>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .ui-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        border: none;
        padding: 0rem;
        max-width: 500px;
        background: var(--slate-200);
        border-radius: 0.5rem;

        &::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }

        &__content {
          @include flexbox(column, center, center);

          & .ui-modal__header {
            @include flexbox(column, center, center);
            width: 100%;
            padding: 1rem;

            & .ui-modal__actions {
              @include flexbox(row, flex-end, center);
              width: 100%;

              & .ui-modal__close {
                border: none;
                cursor: pointer;
                padding: 0rem;
                font-size: 2rem;
                background: transparent;
                line-height: 0rem;
                margin: 0rem -0.5rem -0.5rem 0rem;
              }
            }

            & .ui-modal__title {
              margin: 0rem;
              font-size: 1.2rem;
            }
          }

          & .ui-modal__main {
            @include flexbox(column, center, center);
            width: 100%;
            padding: 1rem;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModalComponent {
  // * DIRECTIVES
  @Input({ required: true }) title: string = 'Modal Title';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogRef', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;

  // * METHODS
  public open(): void {
    this.dialogRef.nativeElement.showModal();
  }

  public close(): void {
    this.dialogRef.nativeElement.close();
    this.closed.emit();
  }

  public handleBackdrop(event: MouseEvent): void {
    event.stopPropagation();
  }
}
