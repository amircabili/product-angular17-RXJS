import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductSignalService } from '../../services/product-signal.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private productSignalService: ProductSignalService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.productsUpdated.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.products = this.productService.getProductsFromLocalStorage();
    this.filterAllProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.currentPage = 1;
  }

  editProduct(product: any): void {
    this.productSignalService.setSelectedProduct(product);
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product.title);
    this.loadProducts();
  }

  get pagedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onSearchApply(): void {
    this.filterAllProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.currentPage = 1;
  }

  filterAllProducts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(query)
    );
  }

  onAddNewProductClicked(): void {
    this.productSignalService.setSelectedProduct(null);
  }
}
