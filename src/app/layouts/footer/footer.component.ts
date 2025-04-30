import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer-layout',
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer__content">
        <span class="footer__text">© 2025 Todos os direitos reservados - Desenvolvido por bsbontorin</span>
      </div>
    </footer>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .footer {
        color: var(--white);
        background-color: var(--gray-700);
        margin: auto 2rem;
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        text-align: center;
        border-radius: 0.5rem;
        margin-bottom: 1rem;

        &__content {
          @include flexbox(column, center, center);
          flex-wrap: wrap;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
