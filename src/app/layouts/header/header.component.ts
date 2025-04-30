import { Component } from '@angular/core';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'header-layout',
  imports: [],
  template: `
    <header class="header">
      <div class="header__logo">Task Project</div>
      <div class="header__buttons">
        <a href="{{ githubLink }}" class="header__button" target="_blank" rel="noopener">Github</a>
        <a href="{{ linkedinLink }}" class="header__button" target="_blank" rel="noopener">Linkedin</a>
      </div>
    </header>
  `,
  styles: `
    @use 'mixins' as *;
    @use 'variables' as *;

    .header {
      @include flexbox(row, space-between, center);
      padding: 1.5rem 3rem;
      border-bottom: 0.063rem solid var(--white);

      &__logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      &__buttons {
        @include flexbox(row, center, center);
        gap: 10px;

        & .header__button {
          color: var(--white);
          background-color: var(--sky-500);
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 0.25rem;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

          &:hover {
            background-color: var(--sky-600);
            transform: translateY(0.125rem);
            box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  `,
})
export class HeaderComponent {
  // * VARIABLES
  public githubLink = environment.githubLink;
  public linkedinLink = environment.linkedinLink;
}
