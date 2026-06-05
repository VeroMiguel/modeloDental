// ====================================
// CONFIGURACIÓN DE SINCRONIZACIÓN
// ====================================

const SYNC_CONFIG = {
    API_BASE: typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
        ? window.location.origin 
        : 'http://localhost:3000',
    ENDPOINTS: {
        responderCita: '/api/responder-cita',
        obtenerRespuestas: '/api/respuestas-citas',
        registrarPaciente: '/api/registrar-paciente',
        guardarCuestionario: '/api/guardar-cuestionario',
        syncRespuestas: '/api/sync-respuestas'
    },
    SYNC_INTERVAL: 3000  // 3 segundos
};

// ====================================
// FUNCIONES DE SINCRONIZACIÓN
// ====================================

/**
 * Envía respuesta de cita al servidor
 */
async function responderCitaAlServidor(data) {
    try {
        const response = await fetch(`${SYNC_CONFIG.API_BASE}${SYNC_CONFIG.ENDPOINTS.responderCita}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: data.token,
                cita_id: data.citaId,
                paciente_nombre: data.pacienteName,
                paciente_phone: data.pacientePhone,
                respuesta: data.respuesta,
                datos_json: {
                    timestamp: new Date().toISOString(),
                    navegador: navigator.userAgent,
                    ip: 'auto-detected'
                }
            })
        });

        if (!response.ok) throw new Error('Error al guardar');
        
        const result = await response.json();
        console.log('✅ Respuesta guardada en servidor:', result);
        return result;
    } catch (error) {
        console.error('❌ Error sincronizando:', error);
        // Guardar localmente como fallback
        localStorage.setItem(`respuesta_backup_${data.token}`, JSON.stringify(data));
        return { success: false, message: 'Guardado localmente' };
    }
}

/**
 * Obtiene todas las respuestas del servidor
 */
async function obtenerRespuestasDelServidor() {
    try {
        const response = await fetch(`${SYNC_CONFIG.API_BASE}${SYNC_CONFIG.ENDPOINTS.obtenerRespuestas}`);
        
        if (!response.ok) throw new Error('Error al obtener respuestas');
        
        const respuestas = await response.json();
        console.log('✅ Respuestas obtenidas del servidor:', respuestas.length);
        return respuestas;
    } catch (error) {
        console.error('❌ Error obteniendo respuestas:', error);
        return [];
    }
}

/**
 * Registra paciente en el servidor
 */
async function registrarPacienteEnServidor(data) {
    try {
        const response = await fetch(`${SYNC_CONFIG.API_BASE}${SYNC_CONFIG.ENDPOINTS.registrarPaciente}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: data.token,
                dni: data.dni,
                nombre: data.nombre,
                edad: data.edad,
                phone: data.phone,
                datos_json: {
                    timestamp: new Date().toISOString()
                }
            })
        });

        if (!response.ok) throw new Error('Error al registrar');
        
        const result = await response.json();
        console.log('✅ Paciente registrado en servidor:', result);
        return result;
    } catch (error) {
        console.error('❌ Error registrando paciente:', error);
        return { success: false };
    }
}

/**
 * Guarda cuestionario en el servidor
 */
async function guardarCuestionarioEnServidor(data) {
    try {
        const response = await fetch(`${SYNC_CONFIG.API_BASE}${SYNC_CONFIG.ENDPOINTS.guardarCuestionario}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: data.token,
                paciente_dni: data.pacienteDni,
                motivo: data.motivo,
                enfermedades: data.enfermedades,
                alergias: data.alergias,
                consentimiento_json: data.consentimiento
            })
        });

        if (!response.ok) throw new Error('Error al guardar');
        
        const result = await response.json();
        console.log('✅ Cuestionario guardado en servidor:', result);
        return result;
    } catch (error) {
        console.error('❌ Error guardando cuestionario:', error);
        return { success: false };
    }
}

// ====================================
// INICIAR SINCRONIZACIÓN AUTOMÁTICA
// ====================================

/**
 * Inicia auto-sincronización cada 3 segundos
 */
function iniciarSincronizacionAutomatica() {
    setInterval(() => {
        // El panel admin consultará las respuestas periódicamente
        if (window.app && window.app.renderConfirmations) {
            console.log('🔄 Sincronizando respuestas...');
            window.app.renderConfirmations();
        }
    }, SYNC_CONFIG.SYNC_INTERVAL);
    
    console.log('✅ Sincronización automática iniciada cada', SYNC_CONFIG.SYNC_INTERVAL, 'ms');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSincronizacionAutomatica);
} else {
    iniciarSincronizacionAutomatica();
}

console.log('✅ Módulo de sincronización cargado exitosamente');
