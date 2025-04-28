"use client"

import { useState, useEffect } from "react"
import { useProducts } from "@/context/product-context"
import { formatDate } from "@/lib/utils"
import type { Product } from "@/types/product"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Trash2, Package } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { deleteProduct } = useProducts()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImage() {
      const apiKey = process.env.NEXT_PUBLIC_PIXABAY_KEY
      if (!apiKey) {
        console.error("Missing Pixabay API key (NEXT_PUBLIC_PIXABAY_KEY)")
        setLoading(false)
        return
      }

      const url = new URL("https://pixabay.com/api/")
      url.searchParams.set("key", apiKey)
      url.searchParams.set("q", product.nombre)
      url.searchParams.set("image_type", "photo")
      url.searchParams.set("per_page", "3")
      url.searchParams.set("lang", "es")
      url.searchParams.set("safesearch", "true")

      try {
        console.debug("Fetching image URL:", url.toString())

        const res = await fetch(url.toString())
        if (!res.ok) {
          console.error(`Image API error ${res.status} for URL: ${url.toString()}`)
          setLoading(false)
          return
        }

        const data = await res.json()
        if (data.hits && data.hits.length > 0) {
          setImageUrl(data.hits[0].webformatURL)
        }
      } catch (err) {
        console.error("Error fetching image:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [product.nombre])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{product.nombre}</CardTitle>
          <Badge variant="outline">#{product.codigo}</Badge>
        </div>
      </CardHeader>

      {/* Imagen del producto */}
      <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-muted-foreground">Cargando imagen…</span>
          </div>
        ) : imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={product.nombre}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-muted-foreground">Sin imagen</span>
          </div>
        )}
      </div>

      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{product.cantidad} unidades</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Creado: {formatDate(product.creacion)}
        </p>
        <p className="text-sm">{product.descripcion}</p>
      </CardContent>

      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
                <span className="font-semibold"> {product.nombre}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteProduct(product.codigo)
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
