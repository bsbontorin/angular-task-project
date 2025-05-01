import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPaginatorComponent } from './ui-paginator.component';

describe('UiPaginatorComponent', () => {
  let component: UiPaginatorComponent;
  let fixture: ComponentFixture<UiPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
