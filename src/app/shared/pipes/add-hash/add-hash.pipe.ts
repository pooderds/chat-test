import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addHash',
  standalone: true,
})
export class AddHashPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return `#${value}`;
  }
}
