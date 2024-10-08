const express = require("express");
const mysql = require("mysql2");
const app = express();

// Crear conexión a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'DB_5IV8'
});

// Conectar a la base de datos
con.connect((err) => {
    if (err) {
        return console.error("Error al conectar a la base de datos:", err);
    }
    console.log('Conectado a la base de datos');
});

// Middleware para manejar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Ruta para agregar un usuario
app.post('/agregarUsuario', (req, res) => {
    const nombre = req.body.nombre;
    const id = req.body.id;

    console.log(nombre)
    console.log(id)
    // Validar datos
    if (!nombre || !id) {
        return res.status(400).send("Faltan datos obligatorios.");
    }

    con.query('INSERT INTO usuarios (id_usuario, nombre) VALUES (?, ?)', [id, nombre], (err, respuesta) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
            return res.status(500).send("Error al insertar el usuario.");
        }

        return res.send(`<h1>Nombre:</h1> ${nombre}`);
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

app.get('/obtenerUsuario',(req,res)=>{
    con.query('select * from usuarios', (err, respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        var userHTML=``;
        var i=0;
        respuesta.forEach(user =>{
            i++;
            userHTML+=`<tr><td>${i}</td><td>${user.nombre}</td></tr>`;
        });
        return res.send(`<table>
            <tr>
            <th>id</th>
            <th>Nombre:</th>
            <tr>
            ${userHTML}
            </table>`
        );
    });
});