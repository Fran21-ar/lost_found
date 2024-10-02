const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.use(express.static('public'));

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'lost_found'  
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectarse con la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


//Registro
app.post('/registro', (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    const query = 'INSERT INTO usuarios (nombre, apellido, gmail, contrasena) VALUES (?, ?, ?, ?)'; 
    db.query(query, [nombre, apellido, email, password], (err, results) =>{
        if(err){
            console.log('error al registrar usuario: ',err);
            return resizeTo.status(500).send ('error al registrar el usuario. ');
        }
        res.redirect('/main.html');
    });
});


//Iniciar Sesion
app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    
    const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            res.redirect('/main.html');
        } else {
            res.status(401).send('Email o contraseña incorrectos');
        }
    });
});


//Objeto Perdido
app.post('/objeto_perdido', (req, res) => {
    const { tipo, descripcion, numero, fecha, id_usuario } = req.body;

    const query = `INSERT INTO obj_perdidos (tipo, descripcion, numero_contacto, fecha_perdido, id_usuario) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [tipo, descripcion, numero, fecha, id_usuario], (err, result) => {
        if (err) {
            console.log('Error al subir objeto perdido: ', err);
            return res.status(500).send('Error al subir objeto perdido');
        }
        res.send();
    });
});


//Objeto encontrado
app.post('/objeto_encontrado', (req, res) => {
    const { tipo, descripcion, numero, fecha, id_usuario } = req.body;

    const query = `INSERT INTO obj_encontrados (tipo, descripcion, numero_contacto, fecha_encontrado, id_usuario) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [tipo, descripcion, numero, fecha, id_usuario], (err, result) => {
        if (err) {
            console.error('Error al subir el objeto encontrado:', err);
            return res.status(500).send('Error al subir el objeto encontrado');
        }

        res.send();
    });
});


//en esta parte del código voy a hacer la peticion a la base de datos para que se puedan mostrar en el main.html

app.get('/objeto_perdido', (req, res) => {
    const query = 'SELECT tipo, descripcion, numero_contacto, fecha_perdido FROM obj_perdidos'; 

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los objetos perdidos' });
        }
        res.json(results); 
    });
});

app.get('/obj_encontrado', (req, res) => {
    const query = 'SELECT tipo, descripcion, numero_contacto, fecha_encontrado FROM obj_encontrados'; 

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los objetos encontrados' });
        }
        res.json(results); 
    });
});
