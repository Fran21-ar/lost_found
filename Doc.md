# Lost & Foud

Este proyecto está diseñado para conectar a personas que han perdido un objeto personal con aquellas que lo han encontrado. Funciona mediante un sistema de registro donde los usuarios crean una cuenta y pueden subir informacion sobre un objeto perdido o encontrado, facilitando así el contacto entre ambas partes.

TECNOLOGIAS USADAS
. Node.js
. Express
. JavaScript
. HTML & CSS
. MySQL

REQUISITOS PREVIOS

1. Tener instalado Node.js.
2. Tener instalado xampp o una herramienta similar para manejar el servidor local y la base de datos mySql.

INSTALACION DEL PROYECTO

Clonar o descargar el proyecto y abrir la carpeta principal (lost_found) en tu editor de código. 
Ejecutar el siguiente comando para inicializar el proyecto de Node.js:
npm init -y
instalar las dependencias necesarias: 
npm i express mysql2

CONFIGURACIÓN DE LA BASE DE DATOS

Desde xamp, crear una base de datos con el nombre (lost_found).
Crear las tablas 
.Usuarios
.obj_perdidos
.obj_encontrados 
Nota: Las relaciones entre estas tablas estan detalladas en los diagramas dentro de la carpeta docImg del proyecto.

Para acceder a MySQL desde la terminal de XAMPP:
mysql -u root -p

importar las relaciones y tablas según lo indicado en los archivos SQL adjuntos o con tus propios comandos SQL.

EJECUCION DEL PROYECTO:
para correr el servido, asegúrate de estar en la carpeta principal del proyecto y ejecuta: 
node app.js
si prefieres usar *nodemon* para reiniciar automáticamente el servidos tras cualquier cambio, instala y ejecuta: 
npm i nodemon
nodemon app.js

USO DEL SISTEMA

Registro de usuarios: Los usuarios pueden registrarse y acceder al sistema con su correo y contraseña.

Subir objetos: Una vez registrado, cada usuario puede subir un objeto perdido o encontrado con sus detalles.

Ver objetos: Se pueden visualizar todos los objetos perdidos y encontrados, haciendo una búsqueda simple.
