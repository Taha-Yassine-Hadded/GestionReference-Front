import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterValues: any = {};
  private selectedCategoryId: number | null = null;

  constructor() { }

  setFilter(key: string, value: any) {
    this.filterValues[key] = value;
  }

  getFilter(key: string): any {
    return this.filterValues[key];
  }

  clearFilter(key: string) {
    delete this.filterValues[key];
  }

  setCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  getCategory(): number | null {
    return this.selectedCategoryId;
  }

  clearCategory() {
    this.selectedCategoryId = null;
  }
}
