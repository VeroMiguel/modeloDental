// ====================================
// SERVIDOR BACKEND - DOCTOCLIQ PRO
// Sincronización en tiempo real v2.3
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
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// ====================================
// BASE DE DATOS SQLITE
// ====================================

const dbPath = path.join(__dirname, 'doctocliq.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('❌ Error conectando DB:', err);
    else console.log('✅ Base de datos conectada');
});

// Crear tablas
db.serialize(() => {
    // Tabla de CITAS (para que el paciente pueda acceder)
    db.run(`
        CREATE TABLE IF NOT EXISTS citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE NOT NULL,
            cita_id TEXT NOT NULL,
            paciente_nombre TEXT NOT NULL,
            paciente_phone TEXT,
            fecha TEXT,
            hora TEXT,
            tratamiento TEXT,
            estado TEXT DEFAULT 'Pendiente',
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabla de RESPUESTAS (confirmaciones del paciente)
    db.run(`
        CREATE TABLE IF NOT EXISTS respuestas_citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT UNIQUE NOT NULL,
            cita_id TEXT NOT NULL,
            paciente_nombre TEXT NOT NULL,
            paciente_phone TEXT,
            respuesta TEXT,
            fecha_respuesta DATETIME DEFAULT CURRENT_TIMESTAMP,
            datos_json TEXT
        )
    `);

    console.log('✅ Tablas de base de datos inicializadas');
});

// ====================================
// API: GUARDAR NUEVA CITA (desde admin)
// ====================================
app.post('/api/crear-cita', (req, res) => {
    const { token, cita_id, paciente_nombre, paciente_phone, fecha, hora, tratamiento } = req.body;

    if (!token || !cita_id || !paciente_nombre) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.run(
        `INSERT INTO citas (token, cita_id, paciente_nombre, paciente_phone, fecha, hora, tratamiento) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [token, cita_id, paciente_nombre, paciente_phone, fecha, hora, tratamiento],
        function(err) {
            if (err) {
                console.error('❌ Error guardando cita:', err);
                return res.status(500).json({ error: 'Error al guardar cita' });
            }
            console.log(`✅ Cita guardada - Paciente: ${paciente_nombre} - Token: ${token}`);
            res.json({ success: true, id: this.lastID, token: token });
        }
    );
});

// ====================================
// API: OBTENER CITA POR TOKEN (para paciente)
// ====================================
app.get('/api/cita/:token', (req, res) => {
    const { token } = req.params;

    db.get(
        `SELECT * FROM citas WHERE token = ?`,
        [token],
        (err, row) => {
            if (err) {
                console.error('❌ Error obteniendo cita:', err);
                return res.status(500).json({ error: 'Error al consultar cita' });
            }
            
            if (!row) {
                console.warn(`⚠️ Cita no encontrada - Token: ${token}`);
                return res.status(404).json({ error: 'Cita no encontrada', cita_id: null });
            }
            
            console.log(`✅ Cita encontrada - ${row.paciente_nombre}`);
            res.json(row);
        }
    );
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
        [token, cita_id || 'N/A', paciente_nombre || 'N/A', paciente_phone || 'N/A', respuesta, JSON.stringify(datos_json)],
        function(err) {
            if (err) {
                console.error('❌ Error guardando respuesta:', err);
                return res.status(500).json({ error: 'Error al guardar respuesta' });
            }
            console.log(`✅ Respuesta guardada - ${paciente_nombre || 'Paciente'}: ${respuesta}`);
            
            // Actualizar estado de la cita
            db.run(
                `UPDATE citas SET estado = ? WHERE token = ?`,
                [respuesta === 'Confirmada' ? 'Confirmada' : 'Reprogramar', token]
            );
            
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
// API: OBTENER CITAS DEL DÍA
// ====================================
app.get('/api/citas-dia', (req, res) => {
    const fecha = req.query.fecha || new Date().toISOString().split('T')[0];
    
    db.all(
        `SELECT * FROM citas WHERE fecha = ? ORDER BY hora ASC`,
        [fecha],
        (err, rows) => {
            if (err) {
                console.error('❌ Error obteniendo citas:', err);
                return res.status(500).json({ error: 'Error' });
            }
            res.json(rows || []);
        }
    );
});

// ====================================
// SERVIR ARCHIVO HTML
// ====================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/*', (req, res) => {
    // Servir index.html para todas las rutas (para rutas con parámetros)
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ====================================
// INICIAR SERVIDOR
// ====================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🦷 DOCTOCLIQ PRO - SINCRONIZACIÓN   ║
╠═══════════════════════════════════��════╣
║   📍 Servidor: http://localhost:${PORT}     
║   💾 Base de datos: SQLite
║   🔄 Sincronización: 100% En tiempo real
║   ✅ Status: LISTO PARA PRODUCCIÓN
║   ✨ v2.3 - Con búsqueda de citas
╚════════════════════════════════════════╝
    `);
});

// Cierre de BD
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error(err);
        console.log('✅ Base de datos cerrada');
        process.exit(0);
    });
});
