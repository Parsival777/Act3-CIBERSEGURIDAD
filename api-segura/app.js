const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "ClaveSecretaLaboratorioActividad3";

// Ruta raíz para validación de ZAP
app.get('/', (req, res) => {
    res.json({ status: "OK", mensaje: "API de Seguridad activa" });
});

// Endpoint de autenticación (Genera Token)
app.post('/api/login', (req, res) => {
    const token = jwt.sign({ usuario: "admin_local", rol: "administrador" }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ mensaje: "Autenticación exitosa", token });
});

// Middleware de validación JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: "Acceso denegado: Token no proporcionado" });
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Acceso denegado: Token inválido o expirado" });
        req.usuario = decoded;
        next();
    });
};

// Endpoint Sensible 1: Panel de Administración
app.get('/api/admin', verificarToken, (req, res) => {
    res.json({ status: "OK", datos: "Acceso concedido al Panel de Administración" });
});

// Endpoint Sensible 2: Información Financiera
app.get('/api/finanzas', verificarToken, (req, res) => {
    res.json({ status: "OK", datos: "Acceso concedido a Registros Financieros Protegidos" });
});

app.listen(3000, () => console.log('API Segura escuchando en http://localhost:3000'));