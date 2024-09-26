const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;
// Middleware para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
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
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


//Registro
app.post('/registro', (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    const query = 'INSERT INTO usuarios (nombre, apellido, gmail, contraseña) VALUES (?, ?, ?, ?)'; 
    db.query(query, [nombre, apellido, email, password], (err, results) =>{
        if(err){
            console.log('error al registrar usuario: ',err);
            return resizeTo.status(500).send ('error al registrar el usuario. ');
        }
        res.redirect('/main.html');
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


//Iniciar Sesion
app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe en la base de datos
    const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            // Si las credenciales son correctas, redirigir a la página de subir objeto
            res.redirect('/subir_objeto.html');
        } else {
            // Si las credenciales son incorrectas, enviar un mensaje de error
            res.status(401).send('Email o contraseña incorrectos');
        }
    });
});


//Objeto Perdido
app.post('/objeto_perdido', (req, res) => {
    const { tipo, descripcion, numero, fecha, id_usuario } = req.body;

    const query = `INSERT INTO obj_perdidos (tipo, descripcion, numero, fecha_perdida, id_usuario) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [tipo, descripcion, numero, fecha, id_usuario], (err, result) => {
        if (err) {
            console.log('Error al subir objeto perdido: ', err);
            return res.status(500).send('Error al subir objeto perdido');
        }
        res.send('Objeto subido exitosamente');
    });
});


//Objeto encontrado
app.post('/objeto_encontrado', (req, res) => {
    const { tipo, descripcion, numero, fecha, id_usuario } = req.body;

    const query = `INSERT INTO obj_encontrados (tipo, descripcion, numero, fecha_encontrada, id_usuario) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [tipo, descripcion, numero, fecha, id_usuario], (err, result) => {
        if (err) {
            console.error('Error al subir el objeto encontrado:', err);
            return res.status(500).send('Error al subir el objeto encontrado');
        }

        res.send('Objeto encontrado subido exitosamente');
    });
});

// Ruta para obtener objetos perdidos
app.get('/api/perdidos', (req, res) => {
    db.query('SELECT * FROM obj_perdidos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para obtener objetos encontrados
app.get('/api/encontrados', (req, res) => {
    db.query('SELECT * FROM obj_encontrados', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});