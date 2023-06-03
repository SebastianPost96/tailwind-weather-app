import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localLink',
  standalone: true,
})
export class LocalLinkPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('//cdn.weatherapi.com', 'assets');
  }
}
