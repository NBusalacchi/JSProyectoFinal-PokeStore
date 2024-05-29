SIMULADOR DE E-COMMERCE - POKESTORE README

Descripción

PokeStore es una aplicación web que simula una tienda en línea de Pokémon. Los usuarios pueden explorar una lista de Pokémon, agregar Pokémon al carrito de compras, ver el carrito, eliminar elementos individuales o vaciar el carrito por completo, y simular una compra con un mensaje de agradecimiento personalizado.

Características

Exploración de Pokémon: La tienda muestra una lista de Pokémon obtenidos desde la PokeAPI. Cada Pokémon se muestra con su imagen, nombre, tipos y un precio basado en la suma de sus estadísticas base.

Carrito de Compras: Los usuarios pueden agregar Pokémon al carrito de compras, que se almacena en el almacenamiento local del navegador.

Gestión del Carrito: Los usuarios pueden ver los Pokémon agregados al carrito, eliminar Pokémon individuales, vaciar todo el carrito o simular una compra.

Total del Precio: El precio total de los Pokémon en el carrito se actualiza dinámicamente.

Notificaciones: Se utilizan alertas de SweetAlert2 para notificar a los usuarios sobre la adición de Pokémon al carrito, errores y la confirmación de compra.


Tecnologías Utilizadas


HTML5: Estructura básica de la aplicación.

CSS3: Estilizado y diseño responsivo.

JavaScript: Lógica de la aplicación, manipulación del DOM y gestión del carrito.

Tailwind CSS: Framework CSS para el diseño rápido y responsivo.

SweetAlert2: Librería para mostrar alertas personalizadas.

PokeAPI: API externa para obtener datos de los Pokémon.


Estructura del Proyecto

.
├── assets
│   ├── favicon.ico
│   ├── pokeball.png
│   ├── pokelogo.png
│   ├── pokebg.png
│   └── types
│       └── *.png (imágenes de los tipos de Pokémon)
├── app
│   ├── app.js
│   └── main.js
├── index.html
└── README.md


Este archivo maneja la obtención de datos de la PokeAPI y la creación de elementos de la tienda:

Obtener Pokémon: Usa la PokeAPI para obtener la lista de Pokémon y sus detalles.

Crear Elementos de la Tienda: Genera elementos HTML para cada Pokémon y los agrega al contenedor de la tienda.

Asignar Eventos: Asigna eventos a los botones de agregar al carrito.


Cómo Usar


Explorar Pokémon: Navega por la lista de Pokémon mostrada en la tienda.

Agregar al Carrito: Haz clic en el botón de carrito (🛒) debajo del Pokémon que deseas agregar.

Ver Carrito: Haz clic en el ícono de Pokébola en la esquina superior derecha para ver el carrito.

Gestionar Carrito: Puedes eliminar Pokémon individuales haciendo clic en la 'x' roja al lado de cada Pokémon o vaciar todo el carrito haciendo clic en el botón '🗑️ All'.

Simular Compra: Haz clic en el botón 'Buy', llena los detalles solicitados y confirma la compra para ver el mensaje de agradecimiento.

