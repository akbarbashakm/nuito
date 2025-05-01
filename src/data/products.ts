import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Black T-Shirt",
    description: "A timeless black t-shirt made with premium cotton for everyday comfort.",
    price: 1999,
    images: ["/images/products/black-tshirt-1.jpg", "/images/products/black-tshirt-2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
    ],
    category: "basic",
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Vintage Logo T-Shirt",
    description: "A retro-inspired tee featuring our classic logo design.",
    price: 2499,
    images: ["/images/products/vintage-tshirt-1.jpg", "/images/products/vintage-tshirt-2.jpg"],
    sizes: ["M", "L", "XL", "2XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#808080" },
    ],
    category: "graphic",
    featured: true,
    inStock: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Summer Vibes T-Shirt",
    description: "Bright and colorful tee perfect for those sunny summer days.",
    price: 2299,
    images: ["/images/products/summer-tshirt-1.jpg", "/images/products/summer-tshirt-2.jpg"],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Blue", hex: "#1E90FF" },
      { name: "Yellow", hex: "#FFD700" },
    ],
    category: "seasonal",
    featured: false,
    inStock: true,
    createdAt: new Date(),
  },
]; 