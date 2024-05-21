import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})

  export class AppComponent implements OnInit {
  title = 'amir-cabili-products-app';
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.initializeLocalStorage().subscribe(() => {
      console.log('Local storage initialized successfully.');
    });
  }
}

