# Sistema de Gestión de Productos

Una aplicación moderna para la gestión de productos desarrollada con Next.js, TypeScript y TailwindCSS.

## Características

- ✅ Crear productos con validación de formularios
- ✅ Visualizar lista de productos con diseño de tarjetas
- ✅ Eliminar productos con confirmación
- ✅ Ordenar productos por código, nombre, cantidad y fecha de creación
- ✅ Filtrar productos por nombre
- ✅ Persistencia de datos con localStorage
- ✅ Modo oscuro/claro
- ✅ Diseño responsivo

## Tecnologías Utilizadas

- **Next.js 14 (App Router)**: Elegido por su estructura moderna y soporte para renderizado híbrido (SSR/SSG), lo que mejora el rendimiento y la experiencia del usuario.
- **TypeScript**: Utilizado para garantizar un desarrollo más seguro y predecible mediante tipado estático.
- **TailwindCSS**: Seleccionado por su capacidad para crear diseños responsivos y modernos de manera rápida y eficiente.
- **Context API**: Implementado para manejar el estado global de la aplicación de manera sencilla y sin necesidad de librerías externas como Redux.
- **shadcn/ui**: Proporciona componentes accesibles y personalizables, acelerando el desarrollo de la interfaz de usuario.
- **React Hook Form + Zod**: Usados para la validación de formularios, ofreciendo una experiencia de usuario fluida y validaciones robustas.
- **LocalStorage**: Utilizado para la persistencia de datos en el navegador, eliminando la necesidad de un backend en esta versión.
- **Pixabay API**: Integrada para obtener imágenes dinámicas de productos, mejorando la presentación visual de la aplicación.

## Decisiones Técnicas

1. **Manejo del Estado**:  
   Se utilizó Context API para manejar el estado global de los productos, ya que es una solución ligera y suficiente para el tamaño de esta aplicación. Esto evita la complejidad de librerías como Redux o Zustand.

2. **Validación de Formularios**:  
   React Hook Form fue elegido por su rendimiento y facilidad de integración con Zod, que permite definir esquemas de validación declarativos y reutilizables.

3. **Diseño Responsivo**:  
   TailwindCSS fue seleccionado para garantizar un diseño responsivo y moderno, con soporte para temas oscuro/claro sin esfuerzo adicional.

4. **Imágenes Dinámicas**:  
   La integración con la [Pixabay API](https://pixabay.com/api/) permite enriquecer la experiencia visual de los usuarios al mostrar imágenes relacionadas con los productos.

5. **Persistencia Local**:  
   LocalStorage fue utilizado para almacenar los datos de los productos, ya que esta aplicación no requiere un backend en su versión actual.

## Requisitos Adicionales

La aplicación utiliza la [Pixabay API](https://pixabay.com/api/) para obtener imágenes relacionadas con los productos. Es necesario configurar una clave de API en el archivo `.env`:

```env
NEXT_PUBLIC_PIXABAY_KEY=tu_clave_de_pixabay
```

Puedes obtener una clave de API gratuita registrándote en [Pixabay](https://pixabay.com/api/docs/).

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Palaciodiego008/product-management.git
   cd product-management
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura la clave de API en el archivo `.env`:

   ```env
   NEXT_PUBLIC_PIXABAY_KEY=tu_clave_de_pixabay
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.