# Shoppings Ride – Grupo 4

**Shoppings Ride** es un sitio web desarrollado como trabajo grupal para la materia Diseño y Desarrollo Web de la Universidad Argentina de la Empresa (UADE), durante el año 2026.

- **Profesora:** Patricia Litovicius
- **Actividad:** 3 – Diseño y Desarrollo Web
- **Temática:** Recorrido temático por shoppings de CABA y GBA.

## Objetivo del proyecto

El objetivo de Shoppings Ride es brindar información sobre cuatro centros comerciales de Buenos Aires para ayudar a los usuarios a planificar una salida que combine compras, entretenimiento y gastronomía.

El sitio reúne información sobre las propuestas de cada shopping, horarios, accesos, medios de transporte, accesibilidad y recomendaciones, facilitando la organización de una experiencia personalizada.

## Público objetivo

Personas interesadas en organizar salidas de compras, disfrutar de propuestas gastronómicas o asistir al cine y otras actividades recreativas.

## Funcionalidades principales

- **Página de inicio:** presentación del recorrido, paradas, mapa general y contenido destacado.
- **Mapa interactivo:** visualización de los shoppings y del orden sugerido para realizar el recorrido.
- **Páginas individuales:** información detallada de cada uno de los cuatro centros comerciales.
- **Armá tu visita:** formulario interactivo para seleccionar paquetes, cantidad de personas y adicionales, con cálculo del precio total en USD y ARS. Simulación sin procesamiento de pagos.
- **Formulario de contacto:** validaciones de campos para simular el envío de consultas.
- **Preguntas frecuentes:** sección informativa con respuestas a consultas habituales.
- **Asistente virtual:** herramienta de consulta basada en palabras clave.
- **Diseño responsive:** experiencia adaptada a distintos dispositivos mediante un enfoque Mobile First.
- **Accesibilidad:** navegación mediante teclado y uso de textos alternativos en imágenes.

## Shoppings incluidos

| Shopping | Ubicación |
|---|---|
| Alto Avellaneda | Avellaneda, GBA |
| Boulevard Adrogué | Adrogué, GBA |
| Unicenter | Martínez, GBA |
| Shopping Caballito | Caballito, CABA |

## Tecnologías utilizadas

- **HTML5:** estructura y contenido de las páginas del sitio.
- **Tailwind CSS 3.4.17:** estilos, diseño responsive y componentes visuales, mediante CDN.
- **JavaScript:** funcionalidades e interactividad del sitio, sin frameworks.
- **Leaflet 1.9.4:** biblioteca JavaScript utilizada para desarrollar el mapa interactivo. Permite agregar marcadores, mostrar la ubicación de cada shopping y trazar recorridos entre ellos.
- **OpenStreetMap:** proveedor de los mapas base y de la cartografía utilizada para visualizar las ubicaciones.

## APIs y servicios externos

- **DolarAPI.com:** consulta del tipo de cambio oficial USD → ARS para calcular los precios en distintas monedas, con un valor de referencia alternativo en caso de error.
- **Google Fonts:** servicio utilizado para incorporar las tipografías Inder y Judson.

## Estructura del proyecto

```text
shoppings-ride/
│
├── index.html
├── mapa.html
├── alto-avellaneda.html
├── boulevard-adrogue.html
├── unicenter.html
├── shopping-caballito.html
│
├── css/
│   └── estilos.css
│
├── js/
│   └── main.js
│
└── fotos/
```

## Cómo ejecutar el proyecto

1. Clonar o descargar este repositorio.
2. Abrir el archivo `index.html` en un navegador web.
3. Asegurarse de contar con conexión a internet para utilizar Tailwind CSS, los mapas interactivos y la consulta del tipo de cambio.

También se puede acceder al sitio mediante su enlace de despliegue.

## Diseño y prototipado

- **Prototipo interactivo en Figma:** [Ver prototipo](https://www.figma.com/proto/7668wMVPBsPMhYDh81UIWG/Untitled?node-id=6-10&p=f&t=Kytf6TVCfLZlsUaE-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)
- **Design System en Figma:** [Ver Design System](https://www.figma.com/design/7668wMVPBsPMhYDh81UIWG/Untitled?node-id=0-1&t=gXbt0Bs4bKRabsxs-1)

## Integrantes y contribuciones

Proyecto desarrollado de manera grupal. Las contribuciones se detallan a continuación:

| Integrante | Contribución |
|---|---|
| Esperidioni Valentina | Desarrollo de la página de Alto Avellaneda (contenido e imágenes), retoques y ajustes del sitio web, gestión y actualización del repositorio en GitHub. |
| Turus Constanza | Desarrollo de la página de Boulevard Adrogué (contenido e imágenes). |
| Marthi Julieta | Desarrollo de la página de Unicenter (contenido e imágenes). |
| Scarpitta Tiziano | Desarrollo de la página de Shopping Caballito, gestión del repositorio y despliegue del sitio. |

## Recursos y créditos

- Fotografías seleccionadas por el grupo durante la Actividad 2.
- Mapas y datos geográficos de OpenStreetMap.
- Tipografías de Google Fonts: Inder y Judson, bajo licencia OFL.

---

**Universidad Argentina de la Empresa (UADE)**  
Licenciatura en Comercialización  
Materia: Diseño y Desarrollo Web · 2026
