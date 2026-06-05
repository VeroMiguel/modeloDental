// ====================================
// BACKEND PROFESIONAL - DOCTOCLIQ
// Sincronización en tiempo real
// ====================================

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// ====================================
// BASE DE DATOS SQLITE
// ====================================

const dbPath = path.join(__dirname, 'doctocliq.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('❌ Error conectando DB:', err);
    else console.log('✅ Base de datos conectada:', dbPath);
});

// Crear tablas si no existen
db.serialize(() => {
    // Tabla de respuestas de citas
    db.run(`
        CREATE TABLE IF NOT EXISTS respuestas_citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE,
            cita_id TEXT,
            paciente_nombre TEXT,
            paciente_phone TEXT,
            respuesta TEXT,
            fecha_respuesta DATETIME DEFAULT CURRENT_TIMESTAMP,
            datos_json TEXT
        )
    `);

    // Tabla de registro de pacientes
    db.run(`
        CREATE TABLE IF NOT EXISTS registros_pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE,
            dni TEXT,
            nombre TEXT,
            edad INTEGER,
            phone TEXT,
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
            datos_json TEXT
        )
    `);

    // Tabla de cuestionarios
    db.run(`
        CREATE TABLE IF NOT EXISTS cuestionarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE,
            paciente_dni TEXT,
            motivo TEXT,
            enfermedades TEXT,
            alergias TEXT,
            consentimiento_json TEXT,
            fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ Tablas de base de datos inicializadas');
});

// ====================================
// API: GUARDAR RESPUESTA DE CITA
// ====================================
app.post('/api/responder-cita', (req, res) => {
    const { token, cita_id, paciente_nombre, paciente_phone, respuesta, datos_json } = req.body;

    if (!token || !respuesta) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.run(
        `INSERT INTO respuestas_citas 
         (token, cita_id, paciente_nombre, paciente_phone, respuesta, datos_json) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [token, cita_id, paciente_nombre, paciente_phone, respuesta, JSON.stringify(datos_json)],
        function(err) {
            if (err) {
                console.error('❌ Error guardando respuesta:', err);
                return res.status(500).json({ error: 'Error al guardar respuesta' });
            }
            console.log(`✅ Respuesta guardada - Paciente: ${paciente_nombre} - Respuesta: ${respuesta}`);
            res.json({ 
                success: true, 
                id: this.lastID,
                timestamp: new Date().toISOString()
            });
        }
    );
});

// ====================================
// API: OBTENER TODAS LAS RESPUESTAS
// ====================================
app.get('/api/respuestas-citas', (req, res) => {
    db.all(
        `SELECT * FROM respuestas_citas ORDER BY fecha_respuesta DESC LIMIT 100`,
        (err, rows) => {
            if (err) {
                console.error('❌ Error obteniendo respuestas:', err);
                return res.status(500).json({ error: 'Error al obtener respuestas' });
            }
            res.json(rows || []);
        }
    );
});

// ====================================
// API: OBTENER RESPUESTA POR TOKEN
// ====================================
app.get('/api/respuesta/:token', (req, res) => {
    const { token } = req.params;

    db.get(
        `SELECT * FROM respuestas_citas WHERE token = ?`,
        [token],
        (err, row) => {
            if (err) {
                console.error('❌ Error:', err);
                return res.status(500).json({ error: 'Error al consultar' });
            }
            res.json(row || null);
        }
    );
});

// ====================================
// API: GUARDAR REGISTRO DE PACIENTE
// ====================================
app.post('/api/registrar-paciente', (req, res) => {
    const { token, dni, nombre, edad, phone, datos_json } = req.body;

    if (!token || !dni || !nombre) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.run(
        `INSERT INTO registros_pacientes 
         (token, dni, nombre, edad, phone, datos_json) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [token, dni, nombre, edad, phone, JSON.stringify(datos_json)],
        function(err) {
            if (err) {
                console.error('❌ Error guardando paciente:', err);
                return res.status(500).json({ error: 'Error al guardar' });
            }
            console.log(`✅ Paciente registrado - DNI: ${dni} - Nombre: ${nombre}`);
            res.json({ success: true, id: this.lastID });
        }
    );
});

// ====================================
// API: GUARDAR CUESTIONARIO
// ====================================
app.post('/api/guardar-cuestionario', (req, res) => {
    const { token, paciente_dni, motivo, enfermedades, alergias, consentimiento_json } = req.body;

    if (!token || !paciente_dni) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.run(
        `INSERT INTO cuestionarios 
         (token, paciente_dni, motivo, enfermedades, alergias, consentimiento_json) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [token, paciente_dni, motivo, enfermedades, alergias, JSON.stringify(consentimiento_json)],
        function(err) {
            if (err) {
                console.error('❌ Error guardando cuestionario:', err);
                return res.status(500).json({ error: 'Error al guardar' });
            }
            console.log(`✅ Cuestionario guardado - DNI: ${paciente_dni}`);
            res.json({ success: true, id: this.lastID });
        }
    );
});

// ====================================
// API: WEBHOOK PARA SINCRONIZAR
// ====================================
app.get('/api/sync-respuestas', (req, res) => {
    const desde = req.query.desde || 0;
    
    db.all(
        `SELECT * FROM respuestas_citas 
         WHERE id > ? 
         ORDER BY fecha_respuesta DESC 
         LIMIT 50`,
        [desde],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.json({
                respuestas: rows || [],
                ultima_id: rows && rows.length > 0 ? rows[rows.length - 1].id : desde
            });
        }
    );
});

// ====================================
// SERVIR ARCHIVO HTML PRINCIPAL
// ====================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ====================================
// INICIAR SERVIDOR
// ====================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🦷 DOCTOCLIQ PRO - BACKEND ACTIVO   ║
╠════════════════════════════════════════╣
║   📍 Servidor: http://localhost:${PORT}     
║   💾 Base de datos: SQLite
║   🔄 Sincronización: En tiempo real
║   ✅ Status: LISTO PARA PRODUCCIÓN
╚════════════════════════════════════════╝
    `);
});

// Manejar cierre de BD
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error(err);
        console.log('✅ Base de datos cerrada');
        process.exit(0);
    });
});
