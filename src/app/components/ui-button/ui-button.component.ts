import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  imports: [],
  template: `
    @if(link) {
    <a [href]="link" class="ui-button" [class]="buttonModifier" [target]="buttonTarget" rel="noopener" (click)="handleClick($event)">
      {{ buttonText }}
    </a>
    } @if(!link) {
    <button type="button" class="ui-button" [class]="buttonModifier" (click)="handleClick($event)">
      {{ buttonText }}
    </button>
    }
  `,
  styles: [
    `
      .ui-button {
        color: var(--white);
        all: unset;
        cursor: pointer;
        display: inline-block;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        border-radius: 0.25rem;

        &:hover {
          box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
          filter: brightness(80%);
        }

        &.alert {
          background-color: var(--yellow-500);
        }

        &.danger {
          background-color: var(--rose-500);
        }

        &.primary {
          background-color: var(--sky-500);
        }

        &.success {
          background-color: var(--green-500);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  // * DIRECTIVES
  @Input() link!: string;
  @Input() buttonText?: string;
  @Input() buttonTarget: '_blank' | '_parent' | '_self' | '_top' | '_self' = '_top';
  @Input() buttonModifier = 'primary';
  @Output() callback?: () => void;

  public handleClick(event: MouseEvent): void {
    this.callback && event.preventDefault();
    this.callback?.();
  }
}
