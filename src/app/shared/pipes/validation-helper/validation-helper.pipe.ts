import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationHelper',
  standalone: true,
})
export class ValidationHelper implements PipeTransform {
  transform(source: unknown, name: string): string[] {
    if (source instanceof FormControl) {
      return this.formatMessages((source as FormControl).errors, name);
    }
    return this.formatMessages(source as ValidationErrors, name);
  }

  formatMessages(errors: ValidationErrors | null, name: string): string[] {
    let messages: string[] = [];
    for (let errorName in errors) {
      switch (errorName) {
        case 'required':
          messages.push(`You must enter a ${name}`);
          break;
        case 'minlength':
          messages.push(`A ${name} must be at least
    ${errors['minlength'].requiredLength}
    characters`);
          break;
      }
    }
    return messages;
  }
}
