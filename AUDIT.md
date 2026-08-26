# Auditoría breve y arquitectura — 26/08/2026

## Auditoría del ecosistema actual

- El dominio oficial indicado es `hosterialacamila.com` y el alojamiento está asociado públicamente a Av. Siete Lagos 5418, Villa La Angostura.
- Fuentes públicas actuales coinciden en atributos como vista al lago/montaña, Wi-Fi y estacionamiento; también aparecen spa/hidromasaje y piscina.
- Existen menciones históricas de restaurante/Piano Bar en fuentes de terceros. No se incorporan al nuevo sitio porque el brief exige confirmación de actividad antes de publicarlos.
- El dominio actual no devolvió un inventario indexable de sus rutas internas durante esta auditoría automatizada. Por eso el proyecto no inventa nombres de `.php`; la configuración queda preparada para añadir solamente redirecciones verificadas al momento de migración.

## Mapa del sitio

- `/es`, `/pt`, `/en`
- `/[idioma]/habitaciones`
- `/[idioma]/habitaciones/[slug]`
- `/[idioma]/servicios`
- `/[idioma]/galeria`
- `/[idioma]/ubicacion`
- `/[idioma]/reservar`
- `/[idioma]/contacto`
- `/[idioma]/politicas`

## Flujo de reserva

1. Usuario llega por SEO, Instagram, Google o WhatsApp.
2. CTA principal: “Consultar disponibilidad”.
3. Si usa el launcher de la home, sus fechas y huéspedes viajan a `/reservar` como contexto local.
4. El Booking Frame oficial de MiniHotel se carga con los identificadores entregados, `currency=USD`, `language=es-ES` y `rp=`.
5. Disponibilidad, restricciones, categorías, tarifas y creación de reserva ocurren dentro de MiniHotel.
6. Si el iframe falla, se ofrece apertura del motor en nueva pestaña y WhatsApp.
7. El cobro de seña solo se activa dentro del flujo oficialmente compatible MiniHotel ↔ Payway.

## Tres pendientes confirmados

1. Códigos de idioma del Booking Frame.
2. Política y porcentaje real de seña.
3. Relación/integración oficial de Payway con MiniHotel.
