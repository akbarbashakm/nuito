export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export type ProductColor = {
  name: string;
  hex: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  category: string;
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
} 