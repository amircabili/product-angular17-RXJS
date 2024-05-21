import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductSignalService } from '../../services/product-signal.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  formFields: any[] = [];
  loadingFormFields = true;
  selectedProduct: any | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productSignalService: ProductSignalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.productSignalService.getSelectedProduct().subscribe((productData: any | null) => {
      if (productData === null) {
        this.clearFormFields();
      } else {
        this.selectedProduct = productData;
        this.productForm.patchValue(productData);
      }
    });

    this.productService.getFormFields().subscribe(
      (data: any) => {
        this.formFields = data.form_fields;
      },
      error => {
        console.error('Error loading form fields:', error);
      },
      () => {
        this.loadingFormFields = false;
      }
    );
  }

  private initializeForm(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
      if (this.selectedProduct) {
        this.productService.updateProduct(this.selectedProduct.title, updatedProduct);
      } else {
        this.productService.addProduct(updatedProduct);
      }
      this.clearFormFields();
      this.productSignalService.setSelectedProduct(null);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  clearFormFields(): void {
    this.productForm.reset();
    this.selectedProduct = null;
  }
}
