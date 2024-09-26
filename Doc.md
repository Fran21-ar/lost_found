# Lost & Foud

Este proyecto está destinado a poder hacer una conección entre dos personas, una persona que pudo perder un objeto personal y otra que lo pudo haber encontrado. Esto funciona mediante un registro en el que un usuario creará su cuenta y podrá subir si perdió un objeto o si encontró algun objeto personal para poder dar con el propietario de este.

Este proyecto esta desarrollado con node.js, Express, javascript, html, css y bases de datos mysql. 
Para poder hacer funcionar este proyecto deberan tener instalado node.js y luego en la carpeta principal (lost_found) ejecutar el siguiente comando en la terminal integrada:
npm init
Luego de esto instalar express en la misma carpeta
npm i express.

Luego de esto desde xampp deberas crear una base de datos con el nombre lost_found y en ella 3 entidades, 
usuarios, obj_perdidos y obj_encontrados. Crear las relaciones (mostradas en la carpeta docImg). 
Una vez hecho eso desde la terminal integrada de vs deberás ejecutar el siguiente comando
npm i mysql2 
y desde la terminal de xampp 
mysql -u root (o tu nombre de usuario)-p
