"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"

interface ProductContextType {
  products: Product[]
  addProduct: (product: Product) => void
  deleteProduct: (code: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  // Load products from localStorage on initial render
  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts)
        // Convert string dates back to Date objects
        const productsWithDates = parsedProducts.map((product: any) => ({
          ...product,
          creacion: new Date(product.creacion),
        }))
        setProducts(productsWithDates)
      } catch (error) {
        console.error("Error parsing products from localStorage:", error)
      }
    }
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Product) => {
    // Check if product with same code already exists
    const exists = products.some((p) => p.codigo === product.codigo)
    if (exists) {
      alert(`Ya existe un producto con el código ${product.codigo}`)
      return
    }

    setProducts((prevProducts) => [...prevProducts, product])
  }

  const deleteProduct = (code: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((product) => product.codigo !== code)
      // Immediately update localStorage after deletion
      localStorage.setItem("products", JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  return <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
