"use client"
import { useProducts } from "@/context/product-context"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { toast } from "./ui/use-toast"

const formSchema = z.object({
  codigo: z.coerce.number().positive("El código debe ser un número positivo"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  cantidad: z.coerce.number().nonnegative("La cantidad no puede ser negativa"),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  onComplete?: () => void
}

export default function ProductForm({ onComplete }: ProductFormProps) {
  const { addProduct } = useProducts()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "" as unknown as number,
      nombre: "",
      descripcion: "",
      cantidad: "" as unknown as number,
    },
  })

  function onSubmit(values: ProductFormValues) {
    const newProduct = {
      ...values,
      creacion: new Date(),
    }

    addProduct(newProduct)

    toast({
      title: "Producto creado",
      description: `${values.nombre} ha sido añadido correctamente.`,
    })

    form.reset()

    if (onComplete) {
      onComplete()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crear Nuevo Producto</CardTitle>
        <CardDescription>Completa el formulario para añadir un nuevo producto al inventario.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="123"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? "" : Number(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>Código único del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del producto" {...field} />
                    </FormControl>
                    <FormDescription>Nombre descriptivo del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? "" : Number(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>Cantidad disponible en inventario</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descripción detallada del producto" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Descripción detallada del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Crear Producto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
