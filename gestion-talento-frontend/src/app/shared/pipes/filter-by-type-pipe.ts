import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class FilterByTypePipe implements PipeTransform {
  transform(items: any[], filterValue: string): any[] {
    if (!items || !filterValue) return items || [];

    const searchLower = filterValue.toLowerCase();

    return items.filter(item => {
      // 1. Buscamos la propiedad, ya sea 'type' o 'tipo'
      const propertyValue = item.type || item.tipo;

      // 2. Si existe, comparamos ignorando mayúsculas
      return propertyValue && propertyValue.toLowerCase() === searchLower;
    });
  }
}