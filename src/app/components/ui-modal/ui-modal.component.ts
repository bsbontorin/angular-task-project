import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import UiModalData from 'app/models/ui-modal-data.contract';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Component({
  selector: 'ui-modal',
  imports: [AsyncPipe],
  template: `
    <dialog #dialogRef class="ui-modal" (click)="handleBackdrop($event)">
      <section class="ui-modal__content" (click)="$event.stopPropagation()">
        <header class="ui-modal__header">
          <div class="ui-modal__actions">
            <button class="ui-modal__close" (click)="close()">×</button>
          </div>
          <h2 class="ui-modal__title">{{ title$ | async }}</h2>
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
            padding: 0rem 1rem 1rem 1rem;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModalComponent {
  // * VARIABLES
  private modalData = new BehaviorSubject<UiModalData | undefined>(undefined);

  public data$ = this.getData$;
  public title$ = this.getTitle$;

  // * DIRECTIVES
  @Input() modalTitle?: string = '';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogRef', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;

  // * GETs
  public get getTitle$(): Observable<string> {
    if (!this.modalData) {
      return of(`${this.modalTitle || 'Modal Title'}`);
    }
    return this.modalData.asObservable().pipe(map((data) => data?.title ?? this.modalTitle ?? ''));
  }

  // * METHODS
  public open(data?: UiModalData): void {
    this.modalData.next(data);

    this.dialogRef.nativeElement.showModal();
  }

  public close(): void {
    this.dialogRef.nativeElement.close();
    this.closed.emit();
  }

  public handleBackdrop(event: MouseEvent): void {
    event.stopPropagation();
  }

  public get getData$(): Observable<UiModalData | undefined> {
    return this.modalData.asObservable();
  }
}
