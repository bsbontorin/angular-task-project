import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-link',
  imports: [],
  template: `
    <a [href]="link" class="ui-link" [class]="buttonModifier" [target]="buttonTarget" rel="noopener" (click)="handleClick($event)">
      {{ buttonText }}
    </a>
  `,
  styles: [
    `
      .ui-link {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

        &:hover {
          box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
        }

        &.primary {
          color: var(--white);
          background-color: var(--sky-500);

          &:hover {
            background-color: var(--sky-600);
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLinkComponent {
  // * DIRECTIVES
  @Input({ required: true }) link!: string;
  @Input() buttonText?: string;
  @Input() buttonTarget: '_blank' | '_parent' | '_self' | '_top' | '_self' = '_top';
  @Input() buttonModifier = 'primary';
  @Output() callback?: () => void;

  public handleClick(event: MouseEvent): void {
    this.callback && event.preventDefault();
    this.callback?.();
  }
}
