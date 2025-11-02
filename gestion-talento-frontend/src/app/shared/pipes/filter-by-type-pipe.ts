import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType',
  standalone: true // Asegúrate de que sea standalone
})
export class FilterByTypePipe implements PipeTransform {
  transform(items: any[], type: string): any[] {
    if (!items || !type) {
      return items;
    }
    return items.filter(item => item.type === type);
  }
}