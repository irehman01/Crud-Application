import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../models/product';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  products: Product[] = [];

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    status: 'Available'
  };

  editing = false;

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }
saveProduct(): void {

  if (this.editing) {

    // this.productService.updateProduct(this.product).subscribe({
    //   next: () => {
    //     console.log('Product updated successfully');
    //     this.loadProducts();
    //     this.resetForm();
    //   },
    //   error: (error) => {
    //     console.error('Error updating product:', error);
    //   }
    // });

  } else {

    const newProduct: Product = {
      ...this.product,
      id: 0
    };

    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.loadProducts();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });

  }
}
  editProduct(product: Product): void {

    this.product = { ...product };
    this.editing = true;

  }

  deleteProduct(id: number): void {

    this.productService.deleteProduct(id);
    this.loadProducts();

  }

  cancelEdit(): void {

    this.resetForm();

  }

  resetForm(): void {

    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      status: 'Available'
    };

    this.editing = false;
  }
}