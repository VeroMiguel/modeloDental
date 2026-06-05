# 🚀 DESPLEGAR EN RAILWAY - GUÍA PASO A PASO

**Doctocliq Pro v2.2 con Sincronización en Tiempo Real**

---

## 📋 PRERREQUISITOS

- ✅ Cuenta en GitHub (donde está tu repositorio)
- ✅ Cuenta en Railway.app (es gratis)
- ✅ Tu repositorio con `server.js` y `package.json`

---

## 🎯 PASO 1: CREAR CUENTA EN RAILWAY

1. Ve a **https://railway.app**
2. Haz clic en **"Start Project"**
3. Selecciona **"Deploy from GitHub"**
4. Autoriza a Railway acceder a tu GitHub
5. ¡Listo!

---

## 🔗 PASO 2: CONECTAR TU REPOSITORIO

### Opción A: Desde Railway Dashboard

1. En Railway: **New Project**
2. **Deploy from GitHub**
3. Busca: **VeroMiguel/modeloDental**
4. Haz clic en **"Deploy"**

Railway automáticamente:
- ✅ Detectará `package.json`
- ✅ Instalará dependencias
- ✅ Ejecutará `npm start`

### Opción B: Desde GitHub

1. En tu repo GitHub
2. Ve a **Settings → Integrations → Railway**
3. Conecta con Railway
4. Autoriza

---

## ⚙️ PASO 3: CONFIGURAR VARIABLES

En el panel de Railway:

1. **Variables → New Variable**

Agregar estas variables:

```
PORT = 3000
NODE_ENV = production
```

Si necesitas variables adicionales (ej: claves de API):

```
API_KEY = tu_clave_aqui
DB_PATH = ./doctocliq.db
```

---

## 📦 PASO 4: RAILWAY DESPLIEGA AUTOMÁTICAMENTE

**Railway verá tu repositorio:**

```
✅ package.json          → Instala dependencias
✅ server.js             → Ejecuta el servidor
✅ index.html            → Sirve el frontend
✅ Configura puerto      → Automáticamente
```

**Verás en los logs:**

```
╔════════════════════════════════════════╗
║   🦷 DOCTOCLIQ PRO - BACKEND ACTIVO   ║
╠════════════════════════════════════════╣
║   📍 Servidor: http://localhost:3000     
║   💾 Base de datos: SQLite
║   🔄 Sincronización: En tiempo real
║   ✅ Status: LISTO PARA PRODUCCIÓN
╚════════════════════════════════════════╝
```

---

## 🌐 PASO 5: OBTENER TU URL

1. En Railway Dashboard
2. Ve a **"Settings"**
3. Busca **"Public URL"** o **"Domains"**

Tu URL será algo como:
```
https://modelodental-production.up.railway.app
```

O si configuraste dominio personalizado:
```
https://tunombre.com
```

---

## ✅ VERIFICAR QUE FUNCIONA

1. Abre tu URL en navegador
2. Deberías ver el login de Doctocliq
3. Inicia con `admin / admin`
4. ¡Ya está en producción!

---

## 🔄 PROBAR LA SINCRONIZACIÓN EN RAILWAY

### Test 1: Dos Navegadores

```
Navegador 1:
https://tu-url-railway.app
→ Inicia sesión como admin
→ Ve a "Respuestas de Citas"

Navegador 2 (Incógnito):
https://tu-url-railway.app?confirm=TOKEN_AQUI
→ Responde "SÍ, CONFIRMO"

Resultado:
✅ En Navegador 1 aparece la respuesta instantáneamente
```

### Test 2: Móvil + Computadora

```
Computadora:
https://tu-url-railway.app
→ Panel admin

Móvil (misma red o internet):
https://tu-url-railway.app?confirm=TOKEN
→ Responde cita

Resultado:
✅ La respuesta aparece en la computadora al instante
```

---

## 🔄 UPDATES Y CAMBIOS FUTUROS

Cuando hagas cambios en tu código:

1. **Commit en GitHub**
   ```bash
   git add .
   git commit -m "Actualizar feature X"
   git push origin main
   ```

2. **Railway despliega automáticamente**
   - Detecta el nuevo commit
   - Instala dependencias
   - Reinicia el servidor
   - ¡Cambios en vivo!

---

## 📊 MONITOREAR TU APLICACIÓN

En Railway Dashboard:

### Logs
```
→ Ver todos los eventos del servidor
→ Buscar errores
→ Verficar respuestas de pacientes
```

### Metrics
```
→ CPU Usage
→ Memory Usage
→ Requests por segundo
→ Uptime
```

### Database
```
→ Ver archivos (incluyendo doctocliq.db)
→ Backup automático
→ Descargar datos
```

---

## 🛡️ SEGURIDAD EN PRODUCCIÓN

### Cambiar Contraseña Admin

En `index.html`, busca:
```javascript
if (user === 'admin' && pass === 'admin')
```

Cámbialo a:
```javascript
if (user === 'admin' && pass === 'TuContraseñaSegura123')
```

Luego: `git push` → Railway redeploy

### HTTPS Automático

Railway proporciona **HTTPS gratuito** y automático.

Tu URL es segura:
```
✅ https://tu-url.up.railway.app (Certificado válido)
```

---

## 📈 CRECIMIENTO FUTURO

### Si Necesitas Más

| Recurso | Precio | Cuando |
|---------|--------|--------|
| Plan Hobby (Actual) | Gratis | Desarrollo |
| Plan Pro | $5/mes | Producción pequeña |
| Plan Entreprise | Contactar | Gran volumen |

---

## ⚠️ PROBLEMAS COMUNES

### ❌ "Build failed"

**Solución:**
1. Verifica que `package.json` esté en la raíz
2. Ve a Railway → Logs para ver el error exacto
3. Fix el error en tu repositorio
4. `git push` → Auto-redeploy

### ❌ "Application crashed"

**Verificar:**
```javascript
// En server.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { ... });
```

Debe escuchar en `PORT` del ambiente, no hardcodeado.

### ❌ La base de datos no persiste

**Nota:** Railway elimina archivos temporales. Para persistencia:

Opción 1: PostgreSQL
```
Railway → Add Service → PostgreSQL
Actualizar server.js para usar PostgreSQL
```

Opción 2: MongoDB
```
Railway → Add Service → MongoDB
Usar mongoose en server.js
```

---

## 📚 PRÓXIMOS PASOS

Después de desplegar:

1. ✅ Probar sincronización (ver Test arriba)
2. ✅ Cambiar contraseña admin
3. ✅ Registrar primer paciente
4. ✅ Enviar link por WhatsApp
5. ✅ Recibir respuesta en tiempo real
6. ✅ ¡Disfruta la automatización!

---

## 🎉 ¡ÉXITO!

Tu sistema Doctocliq Pro ahora está:

✅ **En la nube (Railway)**  
✅ **Con sincronización real-time**  
✅ **Accesible desde cualquier navegador**  
✅ **Con HTTPS seguro**  
✅ **Listo para pacientes reales**  

---

**Versión:** 2.2.0  
**Plataforma:** Railway.app  
**Estado:** ✅ Producción  

**¡Tu clínica está en línea! 🦷🚀**
