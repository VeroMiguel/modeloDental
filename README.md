# 🦷 Doctocliq Pro - Sistema Dental Profesional

**Sistema de Gestión Odontológica Completo** | Listo para Producción | Desarrollado para Desktop

---

## ✨ Características Principales

### 🏥 **Módulo de Pacientes**
- ✅ Registro completo con DNI, teléfono, email, dirección
- ✅ Búsqueda avanzada por nombre, DNI o teléfono
- ✅ Historial de citas por paciente
- ✅ Notas médicas y antecedentes
- ✅ Validación de DNI único

### 📅 **Gestión de Citas**
- ✅ Agendamiento intuitivo
- ✅ Prevención de citas duplicadas
- ✅ Estado: Pendiente / Confirmada
- ✅ Confirmación por WhatsApp
- ✅ Vista de citas del día

### 🦷 **Odontograma Digital**
- ✅ Interfaz ultra-rápida (carga al instante)
- ✅ 32 dientes con 5 caras cada uno
- ✅ Estados: Sano, Caries, Curado, Extracción
- ✅ Actualización en tiempo real
- ✅ Guardado automático

### 💊 **Recetario Médico**
- ✅ Emisión de recetas profesionales
- ✅ Impresión formateada
- ✅ Historial de medicamentos
- ✅ Diseño estilo receta tradicional

### 💰 **Módulo de Finanzas**
- ✅ Registro de ingresos y egresos
- ✅ Balance y resumen de caja
- ✅ Métodos de pago: Efectivo, Tarjeta, Yape, Transferencia
- ✅ Reportes automáticos

### 📦 **Gestión de Inventario**
- ✅ Control de insumos
- ✅ Stock en tiempo real
- ✅ Valor total del almacén
- ✅ Alertas de bajo stock

### 👨‍⚕️ **Recursos Humanos**
- ✅ Registro de odontólogos
- ✅ Cálculo de comisiones
- ✅ Asignación de especialidades
- ✅ Control de personal

### 📊 **Dashboard Gerencial**
- ✅ Estadísticas en tiempo real
- ✅ Citas pendientes y programadas
- ✅ Ingresos del mes
- ✅ Resumen de operaciones

### 📤 **Exportación de Datos**
- ✅ Descarga en CSV para Excel
- ✅ Exportación de todos los módulos
- ✅ Nombres de archivo con fecha

---

## 🚀 Instalación y Uso

### Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (opcional, funciona sin conexión)

### Pasos
1. Abre el archivo `index.html` en tu navegador
2. Usa credenciales por defecto:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`
3. ¡El sistema está listo para usar!

### Datos de Prueba
El sistema incluye datos de ejemplo para exploración. Puedes:
- Eliminar pacientes de prueba
- Crear tus propios datos
- Agregar más citas y tratamientos

---

## 📋 Guía de Módulos

### 1️⃣ PACIENTES
**Ruta:** Dashboard → Pacientes

- Busca pacientes por nombre, DNI o teléfono
- Registra con todos los datos: DNI, edad, género, email, dirección
- Consulta última cita de cada paciente
- Clic en 👁️ para ver detalles completos

### 2️⃣ AGENDA Y CITAS
**Ruta:** Dashboard → Agenda y Citas

- Agendar citas con fecha, hora y tratamiento
- Cambiar estado a Confirmada
- Enviar recordatorio por WhatsApp
- Ver próximas citas ordenadas por fecha

### 3️⃣ ODONTOGRAMA
**Ruta:** Dashboard → Odontograma

- Selecciona paciente de la lista
- Haz clic en caras del diente para cambiar estado
- Colores: Blanco (Sano), Rojo (Caries), Azul (Curado), Gris (Extracción)
- Los cambios se guardan automáticamente

### 4️⃣ RECETARIO
**Ruta:** Dashboard → Recetas

- Crea receta con medicamentos y dosis
- Imprime formato profesional con sello y firma
- Historial completo de recetas emitidas

### 5️⃣ TRATAMIENTOS
**Ruta:** Dashboard → Catálogo

- Agrega servicios con especialidad y precio
- Edita lista de precios
- Base para agendamiento de citas

### 6️⃣ FINANZAS
**Ruta:** Dashboard → Finanzas

- Registra ingresos (cobros a pacientes)
- Registra egresos (compras, gastos)
- Visualiza balance de caja
- Métodos de pago disponibles

### 7️⃣ INVENTARIO
**Ruta:** Dashboard → Inventario

- Agrega insumos con cantidad y costo
- Controla stock total
- Calcula valor del almacén

### 8️⃣ PERSONAL
**Ruta:** Dashboard → Personal

- Registra doctores y staff
- Asigna especialidades
- Define comisiones por tratamiento

### 9️⃣ REPORTES
**Ruta:** Dashboard → Reportes

- Descarga datos en formato CSV
- Compatible con Excel
- Exporta pacientes, citas, finanzas e inventario

---

## 🎨 Interfaz de Usuario

### Diseño
- Barra lateral navegable (280px)
- Barra superior con usuario e información
- Contenido principal responsive
- Colores profesionales azul oscuro

### Elementos
- **Botones:** Primarios (azul), Peligro (rojo), Éxito (verde)
- **Badges:** Codificadas por color según estado
- **Modales:** Centrados con fondo translúcido
- **Toasts:** Notificaciones automáticas

---

## 💾 Almacenamiento de Datos

Todos los datos se guardan automáticamente en **localStorage** del navegador:
- No requiere servidor
- Datos persistentes
- Exportación a CSV disponible

**Bases de datos internas:**
- `db_pat` → Pacientes
- `db_app` → Citas
- `db_trt` → Tratamientos
- `db_fin` → Finanzas
- `db_odo` → Odontogramas
- `db_pres` → Recetas
- `db_inv` → Inventario
- `db_staff` → Personal

---

## 🔒 Seguridad

- ✅ Validación de DNI único
- ✅ Validación de citas duplicadas
- ✅ Confirmación antes de eliminar datos
- ✅ Contraseña por defecto (modifiable)

---

## ⚡ Rendimiento

- ✅ Carga instantánea de odontograma
- ✅ Búsqueda en tiempo real
- ✅ Sin lag en operaciones
- ✅ Optimizado para 1000+ pacientes

---

## 🛠️ Desarrollo y Personalización

### Agregar Nueva Funcionalidad
1. Agrega entrada en `this.data` al inicializar
2. Crea función `render[Modulo]` para mostrar
3. Crea función `save[Modulo]` para guardar
4. Agrega persistencia en `saveDB()`

### Cambiar Colores
Modifica variables CSS al inicio del `<style>`:
```css
:root {
    --primary: #0284c7;
    --sidebar-bg: #0f172a;
    --success: #10b981;
    /* ... más variables */
}
```

---

**Versión:** 2.0 Pro  
**Última actualización:** 2026  
**Tecnología:** HTML5 + CSS3 + JavaScript Vanilla  
**Almacenamiento:** LocalStorage (Sin servidor)
- Copyright

## 🎨 Diseño y UX

### **Estilo Doctocliq**
- Colores azules y naranjas
- Tipografía Inter
- Gradientes modernos
- Sombras suaves

### **Responsive Design**
- Mobile-first approach
- Breakpoints optimizados
- Navegación adaptable

### **Interactividad**
- Smooth scrolling
- Hover animations
- Alertas de contacto

## 📊 Estadísticas Técnicas

- **Líneas de código**: 400+ líneas
- **Secciones**: 8 secciones principales
- **Responsive**: 100% compatible
- **SEO**: Meta tags optimizados
- **Performance**: Optimizado para carga rápida

## 🚀 Funcionalidades

- **Navegación suave** entre secciones
- **Formularios simulados** con validación
- **Botones interactivos** con feedback
- **Enlaces sociales** preparados
- **CTA tracking** básico

## 💼 Marketing y Conversión

- **Hero persuasivo** con valor claro
- **Social proof** con testimonios
- **Planes escalables** para diferentes tamaños
- **Urgencia** con "Prueba Gratis"
- **Confianza** con información completa

## 🔧 Tecnologías Usadas

- **HTML5** semántico
- **CSS3** con variables y flexbox
- **JavaScript** vanilla para interactividad
- **Font Awesome** para iconos
- **Google Fonts** para tipografía

## 📱 Compatible con

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop, Tablet, Mobile
- ✅ Conexiones lentas optimizado

## 🎯 Objetivo

Esta landing page está diseñada para:
- **Convertir visitantes** en leads
- **Mostrar valor** del producto
- **Generar confianza** con testimonios
- **Facilitar contacto** con botones claros

Es la **página principal** perfecta para lanzar Doctocliq al mercado peruano. 🚀