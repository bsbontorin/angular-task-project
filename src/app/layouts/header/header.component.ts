import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiLinkComponent } from 'app/components/ui-link/ui-link.component';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'header-layout',
  imports: [UiLinkComponent],
  template: `
    <header class="header">
      <div class="header__logo">Task Project</div>
      <div class="header__buttons">
        <ui-link [link]="githubLink" [buttonTarget]="'_blank'" [buttonText]="'Github'" />
        <ui-link [link]="linkedinLink" [buttonTarget]="'_blank'" [buttonText]="'Linkedin'" />
      </div>
    </header>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .red {
        background: red;
      }

      .header {
        @include flexbox(row, space-between, center);
        padding: 1rem 2rem;
        border-bottom: 0.063rem solid var(--white);

        &__logo {
          font-size: 1.5rem;
          font-weight: bold;
        }

        &__buttons {
          @include flexbox(row, center, center);
          gap: 10px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // * VARIABLES
  public githubLink = environment.githubLink;
  public linkedinLink = environment.linkedinLink;
}
