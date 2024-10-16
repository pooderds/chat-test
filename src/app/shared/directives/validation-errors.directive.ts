import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationHelper } from '../pipes/validation-helper/validation-helper.pipe';

@Directive({
  selector: '[validationErrors]',
  standalone: true,
})
export class ValidationErrorsDirective implements OnInit {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>,
  ) {}

  @Input('validationErrorsControl')
  name: string = '';
  @Input('validationErrorsLabel')
  label?: string;
  @Input('validationErrors')
  formGroup?: FormGroup;

  ngOnInit() {
    let formatter = new ValidationHelper();
    if (this.formGroup && this.name) {
      let control = this.formGroup?.get(this.name);
      if (control) {
        control.statusChanges.subscribe(() => {
          if (this.container.length > 0) {
            this.container.clear();
          }
          if (control && control.dirty && control.invalid && control.errors) {
            formatter
              .formatMessages(control.errors, this.label ?? this.name)
              .forEach((err) => {
                this.container.createEmbeddedView(this.template, {
                  $implicit: err,
                });
              });
          }
        });
      }
    }
  }
}
