# Gestión de Contactos API

Este proyecto es una API REST para la gestión de contactos, construida con Node.js, Express y MongoDB. Permite realizar operaciones básicas como obtener todos los contactos y crear nuevos contactos.

## Estructura del Proyecto

```
gestion-contactos/
├── app.js                # Punto de entrada de la aplicación
├── models/               # Contiene los modelos de datos
│   └── Contact.js        # Modelo de datos para un contacto
├── routes/               # Contiene las rutas de la API
│   └── contactRoutes.js   # Rutas para manejar contactos
├── package.json          # Configuración del proyecto y dependencias
├── Dockerfile            # Definición de la imagen Docker
└── README.md             # Documentación del proyecto
```

## Requisitos

- Node.js
- MongoDB
- Docker (opcional)

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd gestion-contactos
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Asegúrate de que MongoDB esté corriendo en tu máquina local.

## Ejecución

Para ejecutar la aplicación, utiliza el siguiente comando:

```
node app.js
```

La API estará disponible en `http://localhost:3000/api/contacts`.

## Pruebas de la API

Puedes probar la API utilizando herramientas como Postman o curl.

- **GET** `http://localhost:3000/api/contacts` para obtener todos los contactos.
- **POST** `http://localhost:3000/api/contacts` para crear un nuevo contacto. Asegúrate de enviar un cuerpo JSON con las propiedades `name`, `email` y `phone`.

## Uso de Docker

Si prefieres usar Docker, sigue estos pasos:

1. Construye la imagen Docker:
   ```
   docker build -t gestion-contactos-api .
   ```

2. Ejecuta el contenedor:
   ```
   docker run -p 3000:3000 gestion-contactos-api
   ```

La API estará disponible en `http://localhost:3000/api/contacts` dentro del contenedor.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.