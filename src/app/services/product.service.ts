import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'https://dummyjson.com/products';
  private localStorageKey = 'products';
  private formFieldsUrl = 'assets/product_form.json';
  productsUpdated: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  setProducts(products: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
    this.productsUpdated.next();
  }

  addProduct(newProduct: any): void {
    let products = this.getProductsFromLocalStorage();
    if (!Array.isArray(products)) {
      products = [];
    }
    products.push(newProduct);
    this.setProducts(products);
  }

  deleteProduct(productTitle: string): void {
    let products = this.getProductsFromLocalStorage();
    if (Array.isArray(products)) {
      products = products.filter(product => product.title !== productTitle);
      this.setProducts(products);
    }
  }

  getFormFields(): Observable<any> {
    return this.http.get<any>(this.formFieldsUrl);
  }

  initializeLocalStorage(): Observable<any> {
    const storedProducts = this.getProductsFromLocalStorage();
    if (storedProducts.length > 0) {
      return of(storedProducts);
    }

    return this.http.get<any>(this.productsUrl).pipe(
      tap((data: any) => {
        console.log('Fetched products:', data);
        if (data && data.products && Array.isArray(data.products)) {
          this.setProducts(data.products);
        } else {
          console.error('Initial product data is empty or not in the expected format.');
        }
      }),
      catchError(error => {
        console.error('Error loading initial product data:', error);
        return of(null);
      })
    );
  }

  getProductsFromLocalStorage(): any[] {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  updateProduct(productTitle: string, updatedProductData: any): void {
    const products = this.getProductsFromLocalStorage();
    const productIndex = products.findIndex(product => product.title === productTitle);
    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[productIndex] = { ...updatedProducts[productIndex], ...updatedProductData };
      this.setProducts(updatedProducts);
      this.productsUpdated.next();
    } else {
      console.error(`Product with title ${productTitle} not found.`);
    }
  }
}
