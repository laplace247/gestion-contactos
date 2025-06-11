# Gestión de Contactos - AtenciónTotal

Sistema completo de gestión de contactos con API REST (Node.js + Express + MongoDB) y frontend React.

## Tecnologías

### Backend
- **Node.js** + **Express.js**
- **MongoDB** con **Mongoose**
- **CORS** para comunicación frontend-backend
- **Docker** para contenedores

### Frontend
- **React 18** + **React Router**
- **Bootstrap 5** + **React Bootstrap**
- **Axios** para peticiones HTTP
- **React Toastify** para notificaciones
- **FontAwesome** para iconos

## Estructura PRINCIPAL del Proyecto

```
gestion-contactos/
├── 📁 backend/                          
│   ├── 📁 models/
│   │   └── Contact.js                   
│   ├── 📁 routes/
│   │   └── contactRoutes.js                         
│   ├── app.js                           
│   ├── package.json                     
│   ├── Dockerfile                       
│   ├── .env                            
│   ├── .gitignore                     
│   └── README.md                       
│
├── 📁 frontend/                         
│   ├── 📁 public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navigation.js
│   │   │   ├── ContactList.js
│   │   │   ├── ContactForm.js
│   │   │   └── ContactDetails.js
│   │   ├── 📁 services/
│   │   │   └── contactService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
│
├── docker-compose.yml                   
├── .gitignore                          
└── README.md                           

```

## Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone <tu-repositorio>
cd gestion-contactos

# 2. Ejecutar con Docker Compose
docker-compose up --build

# 3. Acceder a las aplicaciones
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# MongoDB: localhost:27017
```

### Opción 2: Instalación Manual

#### Prerrequisitos
- Node.js 18+
- MongoDB
- npm o yarn

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## 🌐 URLs del Proyecto

- **Frontend React**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/contacts

## Funcionalidades

- **CRUD Completo** de contactos
- **Búsqueda** en tiempo real
- **Validación** de formularios
- **Responsive Design**
- **Notificaciones** de éxito/error
- **Navegación** intuitiva
- **Dockerización** completa

## Scripts Disponibles

### Backend
```bash
npm start      # Producción
npm run dev    # Desarrollo con nodemon
```

### Frontend
```bash
npm start      # Servidor de desarrollo
npm run build  # Build para producción
npm test       # Ejecutar tests
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contacts` | Obtener todos los contactos |
| GET | `/api/contacts/:id` | Obtener contacto por ID |
| POST | `/api/contacts` | Crear nuevo contacto |
| PUT | `/api/contacts/:id` | Actualizar contacto |
| DELETE | `/api/contacts/:id` | Eliminar contacto |

## Docker

El proyecto incluye configuración completa de Docker:

- **Backend**: Node.js + Express
- **Frontend**: React con servidor de desarrollo
- **MongoDB**: Base de datos
- **Docker Compose**: Orquestación de servicios

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🚀 COMANDOS COMPLETOS PARA EJECUTAR EL PROYECTO

### OPCIÓN 1: Con Docker (MÁS FÁCIL)

```bash
# 1. Crear estructura de directorios
mkdir gestion-contactos
cd gestion-contactos

# 2. Crear directorio backend y archivos
mkdir -p backend/{models,routes,config,middleware}

# 3. Crear directorio frontend
npx create-react-app frontend

# 4. Instalar dependencias del frontend
cd frontend
npm install axios react-router-dom bootstrap react-bootstrap react-toastify @fortawesome/fontawesome-free react-router-bootstrap

# 5. Volver al directorio raíz
cd ..

# 6. Crear todos los archivos que te proporcioné arriba

# 7. Ejecutar con Docker
docker-compose up --build
```

### OPCIÓN 2: Manual (PASO A PASO)

```bash
# 1. Preparar MongoDB
# Instalar MongoDB localmente o usar MongoDB Atlas

# 2. Configurar Backend
cd backend
npm init -y
npm install express mongoose cors dotenv body-parser
npm install -D nodemon

# 3. Configurar Frontend
cd ../frontend
npm install

# 4. Ejecutar Backend (Terminal 1)
cd backend
npm run dev  # es para ejecutarlo

# 5. Ejecutar Frontend (Terminal 2)
cd frontend
npm start   # es para ejecutarlo

# 6. Ejecutar MongoDB (Terminal 3 - si es local)
mongod
```

### SECUENCIA COMPLETA DE COMANDOS:

```bash
# PASO 1: Crear proyecto desde cero
mkdir gestion-contactos
cd gestion-contactos

# PASO 2: Crear backend
mkdir -p backend/{models,routes,config,middleware}
cd backend
npm init -y
npm install express mongoose cors dotenv body-parser
npm install -D nodemon

# PASO 3: Crear frontend
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom bootstrap react-bootstrap react-toastify @fortawesome/fontawesome-free react-router-bootstrap

# PASO 4: Volver a raíz y crear archivos
cd ..

# PASO 5: Ejecutar con Docker
docker-compose up --build