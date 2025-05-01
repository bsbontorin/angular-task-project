import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import FormSubmit from 'app/models/form-submit.contract';
import Task from 'app/models/task.contract';
import { TaskAction } from 'app/pages/home/enums/task-action';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'ui-form',
  imports: [FormsModule, ReactiveFormsModule, UiButtonComponent],
  template: `
    <form [formGroup]="fgTask" (ngSubmit)="submit()" class="ui-form">
      <label class="ui-form__label">
        <span class="label__title">Creation Date</span>
        <input type="date" formControlName="date" />
        @if (getFieldError("date"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <label class="ui-form__label">
        <span class="label__title">Name</span>
        <input type="text" formControlName="name" />
        @if (getFieldError("name"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <label class="ui-form__label">
        <span class="label__title">Time to Complete (hours)</span>
        <input type="number" formControlName="effort" />
        @if (getFieldError("effort"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <label class="ui-form__label">
        <span class="label__title">Status</span>
        <select formControlName="status">
          <option value="">Select status</option>
          @for(status of statusOptions; track status) {
          <option [value]="status">{{ status }}</option>
          }
        </select>
        @if (getFieldError("status"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <label class="ui-form__label">
        <span class="label__title">Description</span>
        <textarea formControlName="description"></textarea>
        @if (getFieldError("description"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <label class="ui-form__label">
        <span class="label__title">Responsible</span>
        <input type="email" formControlName="responsible" />
        @if (getFieldError("responsible"); as error) {
        <small class="label__error">{{ error }}</small>
        }
      </label>

      <ui-button [buttonDisabled]="fgTask.invalid" [buttonType]="'submit'" [buttonModifier]="'secondary'" [buttonText]="'Submit'" (callback)="submit()" />
    </form>
  `,
  styles: [
    `
      @use 'mixins' as *;
      @use 'variables' as *;

      .ui-form {
        @include flexbox(column, center, center);
        gap: 1rem;
        width: 100%;
        border-radius: 0.5rem;

        &__label {
          @include flexbox(column, center, center);
          width: 100%;

          & .label__title {
            width: 100%;
            font-weight: medium;
            margin-bottom: 0.5rem;
          }

          & .label__error {
            color: var(--rose-500);
            width: 100%;
            font-size: 0.75rem;
          }

          & input,
          & select,
          & textarea {
            display: block;
            width: 100%;
            border: none;
            padding: 0.625rem;
            font-size: 0.875rem;
            border-radius: 0.5rem;

            &:focus {
              outline: none;
            }
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormComponent {
  // * DIRECTIVES
  @Input() action!: TaskAction;
  @Input() set task(value: Task | undefined) {
    this.fgTask.reset();

    if (value) {
      this.fgTask.patchValue({
        id: value.id,
        date: value.date ? new Date(value.date).toISOString().split('T')[0] : '',
        name: value.name,
        effort: value.effort,
        status: value.status,
        description: value.description,
        responsible: value.responsible,
      });
    }
  }

  @Output() formSubmit = new EventEmitter<FormSubmit>();

  // * VARIABLES
  public readonly statusOptions = ['todo', 'in progress', 'done'];

  public readonly fgTask = new FormGroup({
    id: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    effort: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(24)]),
    status: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    responsible: new FormControl('', [Validators.required, Validators.email]),
  });

  // * METHODS
  public getFieldError(controlName: string): string | null {
    const control = this.fgTask.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    const errorMessages: Record<string, string> = {
      max: 'Maximum value exceeded.',
      min: 'Invalid minimum value.',
      email: 'Invalid email.',
      required: 'Required field.',
      maxlength: 'Maximum number of characters exceeded.',
      minlength: 'Invalid minimum number of characters.',
    };

    const firstErrorKey = Object.keys(control.errors)[0];
    return errorMessages[firstErrorKey] || 'Invalid field.';
  }

  public submit(): void {
    if (this.fgTask.valid) {
      const value = this.fgTask.value;

      const task: Partial<Task> = {
        id: value?.id || '',
        date: value.date ? new Date(value.date).toISOString().split('T')[0] : '',
        name: value.name || '',
        effort: value.effort || 0,
        status: (value.status as 'todo' | 'in-progress' | 'done') || 'todo',
        description: value.description || '',
        responsible: value.responsible || '',
      };

      if (this.action === TaskAction.CREATE) {
        delete task.id;
      }

      this.formSubmit.emit({ action: this.action, task: task });
    }
  }
}
