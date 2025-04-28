"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/context/product-context"
import ProductCard from "./product-card"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Search } from "lucide-react"

type SortOption = "codigo" | "nombre" | "cantidad" | "creacion"

export default function ProductList() {
  const { products } = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("creacion")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const filteredAndSortedProducts = useMemo(() => {
    // Filter products by name
    const filtered = products.filter((product) => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

    // Sort products
    return [...filtered].sort((a, b) => {
      if (sortBy === "creacion") {
        return sortDirection === "asc"
          ? new Date(a.creacion).getTime() - new Date(b.creacion).getTime()
          : new Date(b.creacion).getTime() - new Date(a.creacion).getTime()
      }

      if (sortBy === "codigo" || sortBy === "cantidad") {
        return sortDirection === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      }

      // Sort by name
      return sortDirection === "asc" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
    })
  }, [products, searchTerm, sortBy, sortDirection])

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-") as [SortOption, "asc" | "desc"]
    setSortBy(field)
    setSortDirection(direction)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>{filteredAndSortedProducts.length} productos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="creacion-desc" onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creacion-desc">Más recientes</SelectItem>
                <SelectItem value="creacion-asc">Más antiguos</SelectItem>
                <SelectItem value="nombre-asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="nombre-desc">Nombre (Z-A)</SelectItem>
                <SelectItem value="codigo-asc">Código (menor a mayor)</SelectItem>
                <SelectItem value="codigo-desc">Código (mayor a menor)</SelectItem>
                <SelectItem value="cantidad-asc">Cantidad (menor a mayor)</SelectItem>
                <SelectItem value="cantidad-desc">Cantidad (mayor a menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.codigo} product={product} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
