# Rediseño de Hostería La Camila — octubre 2026

## Cambios

Portada editorial con fotografía real, paleta crema/verde bosque, secciones de descanso y bienestar, living con vista al lago, galería ampliable, preguntas frecuentes y CTA de reserva. Estilos comunes para las páginas internas. Navegación, textos de accesibilidad y controles de galería en español, portugués e inglés.

Se conserva MiniHotel, WhatsApp, contacto y el sistema independiente de cuentas. No se implementó un checkout de Payway: el proyecto no contiene una integración oficial vinculada a reservas. Las fechas y huéspedes elegidos quedan en la página de reserva y en la consulta por WhatsApp; deben confirmarse en MiniHotel porque no se conocen parámetros oficiales de preselección.

## Fotografías

Se sustituyeron los recursos de 500–520 px por imágenes reales de 1024 × 768 de la ficha pública de la misma hostería:
https://www.welcomeargentina.com/villalaangostura/hosterias-la-camila.html

Origen: `/plantillas/webp/grandes/28422-XXGr.webp?1745583531`

| Archivo local Base64 | Foto de origen | Contenido |
| --- | --- | --- |
| exterior | 00 | Fachada y piscina |
| habitaciones | 06 | Habitación |
| bienestar | 14 | Hidromasaje |
| living | 02 | Living con vista al lago |
| desayuno | 04 | Salón de desayuno |
| habitacion-interior | 08 | Interior de habitación |
| sauna | 15 | Sauna |
| living-chimenea | 01 | Living y chimenea |

Se eliminaron el antiguo `hero.b64.txt` truncado y sus fragmentos. El prebuild comprueba tamaño RIFF y decodificación completa con Sharp. Los WebP generados se excluyen de Git y se regeneran antes de dev/build.

## Datos y límites

El sitio antiguo hosterialacamila.com devolvió error de acceso. Se preservaron contactos y servicios del repositorio; se requiere confirmación del propietario sobre condiciones vigentes, cantidad de habitaciones y detalles operativos. No se publican capacidades ni categorías sin verificar, tarifas fijas, reseñas inventadas ni promesas de mejor precio. La piscina se describe como estacional y los masajes como adicionales.

La migración de rutas antiguas requiere inventariar las URLs cuando el sitio anterior esté accesible. No se modificó DNS ni se reemplazó el dominio oficial. Canonical e idiomas conservan la configuración existente del dominio oficial.
