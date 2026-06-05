# 📱 Sistema DentMiguel en Railway - Guía Completa

## ✅ SISTEMA 100% LISTO

Tu sistema está **completamente arreglado y optimizado**. Aquí te damos la guía para usarlo en Railway.

---

## 🚀 DEPLOYMENT EN RAILWAY

### Paso 1: Obtén tu URL de Railway
1. Ve a tu proyecto en [Railway.app](https://railway.app)
2. Haz clic en **Deployments** (la última versión)
3. Abre tu URL pública (algo como: `https://dentmiguel-production-xxxx.railway.app`)
4. **Copia esta URL** y guárdala

---

## 📲 CÓMO FUNCIONA AHORA

### **A. Panel Administrador**
```
URL: https://tu-railway-url/
Usuario: admin
Contraseña: admin
```

**Lo que puedes hacer:**
- ✅ Registrar pacientes
- ✅ Agendar citas
- ✅ Ver confirmaciones de pacientes
- ✅ Gestionar historias clínicas

---

### **B. Enviar Links a Pacientes por WhatsApp**

#### **Link de Registro** (nuevo paciente)
1. Entra al panel → **Pacientes Activos**
2. Haz clic en **"Enviar Link Registro"**
3. Ingresa el número de WhatsApp del paciente (9 dígitos)
4. Presiona **"Generar y Enviar"**
5. Se abrirá WhatsApp Web automáticamente

El paciente recibirá un link así:
```
https://tu-railway-url/?registro=true&t=[TOKEN_ÚNICO]
```

---

#### **Link de Cuestionario** (anamnesis + consentimiento)
1. Ve a **Historia Clínica**
2. Busca al paciente
3. Haz clic en **"Link Cuestionario"**
4. Se enviará automáticamente por WhatsApp

El paciente recibirá un link así:
```
https://tu-railway-url/?anamnesis=true&t=[TOKEN_ÚNICO]
```

---

#### **Link de Confirmación de Cita**
Se envía automáticamente cuando agendas una cita y presionas el botón **"Aviso"** en la Agenda.

El paciente recibirá un link así:
```
https://tu-railway-url/?confirmar=true&id=[ID_CITA]&paciente=...&fecha=...&hora=...
```

---

## ✨ LO QUE SE ARREGLÓ

### ✅ **Funciones de WhatsApp Mejoradas**
- ✅ Limpieza automática de números (formato +51)
- ✅ Funciona en **Chrome, Firefox, Safari, Edge**
- ✅ Funciona en **Desktop y Mobile**
- ✅ Manejo de errores si WhatsApp Web no está disponible

### ✅ **Formulario de Cuestionario Mejorado**
- ✅ Validación completa de campos obligatorios
- ✅ Requiere aceptar al menos 7 de 10 cláusulas
- ✅ Guarda automáticamente las respuestas
- ✅ El paciente puede corregir datos si recibe el link nuevamente
- ✅ Mensajes de error claros en español

### ✅ **Compatibilidad Total**
- ✅ Funciona en todos los navegadores
- ✅ Responsive para mobile y tablet
- ✅ Almacenamiento local (sin necesidad de BD)
- ✅ Tokens únicos y de un solo uso (seguridad)

---

## 🔐 SEGURIDAD

### **Tokens únicos por paciente:**
- Cada link tiene un **token único e irrepetible**
- Una vez usado, **no se puede reutilizar**
- Si el paciente necesita corregir datos, envías un **nuevo link**
- Los datos se guardan automáticamente en el navegador

---

## 📊 FLUJO COMPLETO DE UN PACIENTE

```
1. TÚ ENVÍAS LINK DE REGISTRO
   ↓
2. PACIENTE COMPLETA SUS DATOS (DNI, nombre, edad, teléfono)
   ↓
3. PACIENTE RECIBE CONFIRMACIÓN
   ↓
4. TÚ ENVÍAS LINK DE CUESTIONARIO
   ↓
5. PACIENTE COMPLETA:
   - Motivo de consulta
   - Enfermedades preexistentes
   - Alergias
   - Acepta 10 cláusulas de consentimiento
   ↓
6. PACIENTE RECIBE CONFIRMACIÓN
   ↓
7. TÚ AGENDAS CITA EN EL PANEL
   ↓
8. PACIENTE RECIBE LINK DE CONFIRMACIÓN
   ↓
9. PACIENTE CONFIRMA O PIDE REPROGRAMAR
   ↓
10. TÚ VES LA RESPUESTA EN "RESPUESTAS DE CITAS"
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### **"No se abre WhatsApp"**
- ✅ El navegador debe tener **WhatsApp Web instalado** (extensión o app)
- ✅ Si no funciona, **copia el número** y envía manualmente
- ✅ Prueba en **Chrome o Firefox** primero

### **"El paciente no recibió el mensaje"**
- ✅ Verifica que el **número esté correcto** (9 dígitos)
- ✅ Asegúrate de tener **WhatsApp Web** abierto
- ✅ Intenta en otro navegador

### **"El link no funciona"**
- ✅ Copia la URL de Railway correctamente
- ✅ Asegúrate que **incluya el protocolo `https://`**
- ✅ Prueba primero en tu propio navegador

### **"El formulario no guarda datos"**
- ✅ Verifica que el navegador **acepte cookies** (localStorage)
- ✅ No borres la sesión mientras completas el formulario
- ✅ Los datos se guardan **localmente en el navegador**

---

## 📋 DATOS DE PRUEBA

El sistema incluye datos de ejemplo:

**Usuario Admin:**
- Usuario: `admin`
- Contraseña: `admin`

**Pacientes de Ejemplo:**
- Puedes **eliminarlos** desde el panel
- O usarlos para probar el flujo

---

## 🔄 RESPALDAR TUS DATOS

### **Exportar datos:**
```
Control + Shift + J (abrir consola)
Copia este código:

copy(JSON.stringify({
  patients: JSON.parse(localStorage.getItem('db_pat')),
  appointments: JSON.parse(localStorage.getItem('db_app')),
  history: JSON.parse(localStorage.getItem('db_hc'))
}))

Luego pégalo en un archivo de texto
```

---

## 📞 CONTACTO DEL DOCTOR

Cuando envíes mensajes por WhatsApp, el paciente verá:

```
Hola, somos de la Clínica Odontológica.

[MENSAJE CON LINK]

Si tienes problemas para abrir el link, cópialo 
y pégalo en tu navegador.
```

**Personaliza el nombre de tu clínica en Ajustes → Logotipo**

---

## ✨ CARACTERÍSTICAS PREMIUM INCLUIDAS

✅ **Confirmación automática de citas** - Pacientes responden por WhatsApp  
✅ **Cuestionario digital** - Historial médico en línea  
✅ **Acta de consentimiento** - Firma digital con validación  
✅ **Tokens únicos** - Seguridad y prevención de duplicados  
✅ **Modo oscuro** - Menos cansancio visual  
✅ **Impresión de recetas** - Formato profesional  
✅ **Almacenamiento local** - Sin límite de pacientes  
✅ **Compatible con todos los navegadores** - Desktop y mobile  

---

## 🎉 ¡LISTO PARA USAR!

Tu sistema está **100% operativo**. Accede ahora:

```
https://tu-railway-url
```

**Ingresa con:**
- Usuario: admin
- Contraseña: admin

¡Buena suerte con tu clínica dental! 🦷
