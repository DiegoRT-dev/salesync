# Salesync

Sistema de punto de venta (POS) desarrollado con Next.js, enfocado en la gestión de productos, ventas y estadísticas en tiempo real.

## Demo 
Prueba la aplicación aquí:
https://salesync-neon.vercel.app/

## Características

- Registro de ventas con carrito dinámico
- Control de inventario
- Métodos de pago (efectivo/tarjeta)
- Estadísticas con gráficas
- Productos mas vendidos
- Ventas e ingresos por día
- Historial de ventas
- Actualización en tiempo real
- UI moderna con Tailwind CSS

## Tecnologías
- Next.js 16
- React
- Tailwind CSS
- Zustand
- Prisma ORM
- PostgreSQL (Supabase)
- Recharts (gráficas)

## Instalación y ejecución local

1. Clona el repositorio

```bash
git clone https://github.com/DiegoRT-dev/salesync.git
cd salesync
```

2. Instala dependencias

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. Configura la base de datos

Crea un archivo .env en la raíz del proyecto con:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

4. Genera y aplica la base de datos

```bash
npx prisma generate client
npx prisma migrate dev
```

5. Ejecuta la aplicación

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

## Capturas de pantalla

Página principal

![Pagina Principal](public/screenshots/Home.png)

Página de Venta

![Pagina Venta](public/screenshots/Venta.png)

Página de Productos

![Productos](public/screenshots/Productos.png)

Página de Estadisticas

![Estadisticas](public/screenshots/Estadisticas.png)

## Funcionalidades principales

Ventas
- Selección de productos
- Carrito con cantidades dinámicas
- Cálculo automático de total
- Validación de stock en backend
- Alertas visuales (exito / error)

Productos
- Lista de productos con stock
- Prevención de ventas sin inventario

Estadísticas
- Ventas por día
- Ingresos por día
- Productos más vendidos
- Método de pago más usados

## Estructura del proyecto
```bash
/app
├── /api (/sales /stats /productos /table)
├── /venta
├── /estadisticas
├── /productos
/lib
├── prisma.ts
├── store/
/components (Estadisticas, Footer, Navbar, ProductList, TablaHoy, TablaReciente, Venta, VentasHoy)
```

## Deploy

La aplicación está desplegada usando:

- Vercel
- Supabase (PostgreSQL)

## Mejoras futuras

- Filtros por rango de fechas
- Alertas de stock bajo
- Roles
- Autenticación de usuarios

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una idea para mejorar la app, abre un issue o un pull request.

## Licencia

MIT License - siéntete libre de usar, modificar y compartir este proyecto.
Creado por DiegoRT-dev

¡Gracias por visitar!
