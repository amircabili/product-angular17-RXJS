import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSignalService {
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);

  setSelectedProduct(product: Product | null): void {
    this.selectedProductSubject.next(product);
  }

  getSelectedProduct(): Observable<Product | null> {
    return this.selectedProductSubject.asObservable();
  }
}
