# Proyecto Node.js

Este proyecto requiere Node.js (v20 o superior) y npm (v6 o superior)

Para configurar y ejecutar el proyecto, sigue estos pasos:
**PASOS PREVIOS**
-Tener postgres instalado
-Crear la base de datos que está en el archivo .env o template (O tener acceso a la bd en la nube)
-Ejecutar la creación de tablas y migración de data(crear-table.sql migracion-data.sql)

1. **Crea un archivo `.env` copiando el contenido de `.env.template` y asegúrate de que contenga todas las configuraciones:**

2. **Instala las dependencias del proyecto ejecutando:**

   npm install

3. **Inicia el servidor en modo local con el siguiente comando:**
   npm run start:local

4. **Accede a las APIs a través de http://localhost:3002.**

5: **CREAR IMAGEN**
docker build -t prueba1 .

6: **DESPLEGAR IMAGEN**
docker run -p 8080:8080 -it prueba1

4. **Accede a las Documentaciones de la API a través de http://localhost:8080/api.**


PD: SE DESPLIEGA LA IMAGEN DE ACUERDO AL PUERTO EN LOS ENV DE DOCKERFILE
