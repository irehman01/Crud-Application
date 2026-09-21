import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private apiUrl = 'https://localhost:44339/api/Product';


  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Business laptop',
      price: 150000,
      quantity: 10,
      category: 'Electronics',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Keyboard',
      description: 'Mechanical keyboard',
      price: 8000,
      quantity: 25,
      category: 'Accessories',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Office Chair',
      description: 'Comfortable office chair',
      price: 25000,
      quantity: 5,
      category: 'Furniture',
      status: 'Available'
    }
  ];
    constructor(private http: HttpClient) {}


  // READ
  getProducts(): Product[] {
    return this.products;
  }

  // CREATE
  addProduct(product: Product): Observable<Product> {
  console.log('Service called:', product);

  return this.http.post<Product>(
    'https://localhost:44339/api/Product',
    product
  );
}

  // UPDATE
  updateProduct(product: Product): void {

    const index = this.products.findIndex(
      p => p.id === product.id
    );

    if (index !== -1) {
      this.products[index] = product;
    }
  }

  // DELETE
  deleteProduct(id: number): void {

    this.products = this.products.filter(
      p => p.id !== id
    );

  }
}