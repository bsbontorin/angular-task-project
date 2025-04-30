import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <section class="layout">
      <header-layout />
      <main class="layout__main">
        <router-outlet />
      </main>
      <footer-layout />
    </section>
  `,
})
export class AppComponent {}
