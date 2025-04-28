"use client"

import { useState } from "react"
import ProductForm from "./product-form"
import ProductList from "./product-list"
import { Button } from "./ui/button"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ModeToggle } from "./mode-toggle"

export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState("list")

  const toggleForm = () => {
    setActiveTab(activeTab === "form" ? "list" : "form")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Productos</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button onClick={toggleForm}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {activeTab === "form" ? "Cancelar" : "Nuevo Producto"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="list">Lista de Productos</TabsTrigger>
          <TabsTrigger value="form">Crear Producto</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <ProductList />
        </TabsContent>

        <TabsContent value="form">
          <ProductForm onComplete={() => setActiveTab("list")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}