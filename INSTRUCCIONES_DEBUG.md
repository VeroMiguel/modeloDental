# 🔧 GUÍA DE DEBUG - Respuestas de Citas

## ⚠️ Si las respuestas del paciente NO aparecen

### Paso 1: Verificar en Consola
1. Abre tu navegador (F12 para abrir Consola)
2. Ve a la pestaña **Console**
3. Copia y pega esto:
   ```javascript
   JSON.parse(localStorage.getItem('db_app')).map(a => ({ 
     id: a.id, 
     paciente: a.patName, 
     status: a.status,
     respuestaEstado: a.respuestaEstado,
     respuestaFecha: a.respuestaFecha 
   }))
   ```
4. **Presiona ENTER**

Deberías ver algo como:
```
[
  { id: 1, paciente: "Juan Pérez", status: "Confirmada", respuestaEstado: "Confirmada", respuestaFecha: "2026-06-05T..." }
]
```

### Paso 2: Si ves `respuestaEstado: undefined`
- El paciente **SÍ dio una respuesta** pero NO se guardó correctamente
- **Solución**: El paciente debe hacer clic en el botón nuevamente

### Paso 3: Si ves `status: "Pendiente"`
- La cita **NO ha recibido respuesta aún**
- Asegúrate que el paciente:
  1. Abrió el link por WhatsApp ✅
  2. Vio los botones "Confirmar" o "Reprogramar" ✅
  3. Hizo clic en uno de ellos ✅

---

## 🚀 Cómo Probar Correctamente

### En tu Computadora (Admin):
1. Abre el navegador en incógnito/privado (Para simular otro usuario)
2. Ve a: `http://localhost` (o tu URL de Railway)
3. Haz login: `admin/admin`
4. Ve a **Agenda Médica**
5. Busca una cita
6. Haz clic en el botón verde de WhatsApp
7. **Copia el link** que genera

### En otra Ventana/Navegador (Paciente):
1. Abre una **ventana de incógnito** diferente
2. **Pega el link** que copiaste
3. Se abrirá una pantalla pública
4. Haz clic en **"Sí, confirmaré mi asistencia"** o **"Reprogramar"**
5. Verás el mensaje de éxito

### De Vuelta en Admin (Primera Ventana):
1. **RECARGA LA PÁGINA** (F5)
2. Ve a **Respuestas de Citas**
3. **Deberías ver tu respuesta**

---

## 📱 Diferencia Importante: Local vs Railway

### En Local (tu computadora):
- Todos los datos se guardan en el **mismo navegador**
- Si abres 2 pestañas, comparten localStorage
- Debes abrir en **modo incógnito** para simular otro usuario

### En Railway (producción):
- Cada dispositivo tiene su **propio localStorage**
- El paciente usa su teléfono (otro localStorage)
- Tú usas tu computadora (otro localStorage)
- Los datos se sincronizan automáticamente cada 3 segundos

---

## 🔴 Problemas Comunes

### ❌ "No veo las respuestas después de 10 minutos"
**Causas posibles:**
1. El navegador del paciente cerró la sesión
2. El localStorage fue limpiado
3. Estás viendo un caché antiguo

**Soluciones:**
- Presiona **F5** para recargar
- Presiona **Ctrl+Shift+Delete** para limpiar caché
- Cierra el navegador completamente y reabre

### ❌ "El paciente hizo clic pero no se guardó"
**Causas:**
- El link era **inválido** (token expirado)
- El token ya fue **usado antes**
- localStorage está **lleno o deshabilitado**

**Soluciones:**
- Envía un **nuevo link** por WhatsApp
- Abre DevTools (F12) → Tab Console → Escribe `localStorage.getItem('db_app')` para verificar

### ❌ "Las respuestas de ayer aparecen como 'Sin Respuesta'"
**Causa:**
- Los datos no se sincronizaron entre sesiones

**Solución:**
- Haz clic en **"Re-enviar aviso"** para generar un nuevo link
- El paciente debe responder de nuevo

---

## ✅ Verificación Paso a Paso

### 1. Crear una Cita de Prueba
```
1. Admin → Pacientes → Registrar Manual
   Nombre: "Test Paciente"
   DNI: "12345678"
   Edad: 30
   Teléfono: 987654321
   Email: test@test.com

2. Admin → Agenda Médica → Agendar Cita
   Paciente: "Test Paciente"
   Fecha: Hoy
   Hora: 10:00
   Tratamiento: "Limpieza"
```

### 2. Enviar Link al Paciente
```
1. Click en botón verde de WhatsApp
2. Aparecerá un link. COPIA EL LINK
3. Abre una ventana de incógnito
4. PEGA EL LINK en la URL
5. Presiona ENTER
```

### 3. Responder como Paciente
```
1. En ventana de incógnito verás la pantalla pública
2. Haz click en "Sí, confirmaré mi asistencia"
3. Verás un mensaje de éxito ✅
```

### 4. Ver la Respuesta en Admin
```
1. Vuelve a la ventana de admin
2. Presiona F5 para recargar
3. Ve a "Respuestas de Citas"
4. DEBERÍAS VER: "✓ Asistencia Confirmada"
```

---

## 🎯 Última Verificación

Ejecuta esto en la **Consola (F12)**:

```javascript
// Ver todas las citas
let apps = JSON.parse(localStorage.getItem('db_app'));
console.log('Total citas:', apps.length);
console.log('Respuestas:', apps.filter(a => a.status !== 'Pendiente').length);
console.table(apps.map(a => ({
  Hora: a.time,
  Paciente: a.patName,
  Estado: a.status,
  Respuesta: a.respuestaEstado || 'N/A',
  Timestamp: a.respuestaFecha ? new Date(a.respuestaFecha).toLocaleString('es-PE') : 'N/A'
})));
```

Si todo está correcto, verás una tabla con todas las respuestas.

---

## 📞 Si Aún No Funciona

1. **Limpia todo:**
   ```javascript
   // En Consola escribir:
   localStorage.clear()
   window.location.reload()
   ```

2. **Vuelve a empezar:** Crea una cita nueva desde cero

3. **Prueba en otro navegador:** Chrome, Firefox, Edge, Safari

4. **Reinicia tu PC:** A veces el sistema operativo cachea datos

---

## ✨ Resumen

| Acción | Resultado Esperado |
|--------|-------------------|
| Paciente abre link | Pantalla pública aparece |
| Paciente hace clic en botón | Página muestra "✓ Éxito" |
| Admin recarga página | "Respuestas de Citas" muestra respuesta |
| Admin espera 3 segundos | Datos se auto-actualizan |

**Si ves esto → ¡Está funcionando al 100%! 🎉**

