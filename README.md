# Hostería La Camila — nueva web oficial

Aplicación multipágina construida con Next.js 16 App Router + TypeScript estricto, preparada para Vercel y para integrar el Booking Frame oficial de MiniHotel sin recrear disponibilidad ni tarifas.

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000/es`.

## Producción

1. Crear proyecto en Vercel desde este repositorio.
2. Definir `NEXT_PUBLIC_SITE_URL=https://www.hosterialacamila.com`.
3. Mantener `NEXT_PUBLIC_MINIHOTEL_BOOKING_URL` exactamente con el hotel, motor, `currency=USD`, `language=es-ES` y `rp=` oficiales.
4. Conectar el dominio y verificar DNS/HTTPS.
5. Reemplazar los marcadores visuales por fotografías profesionales reales y el wordmark textual por el logo oficial, sin alterar el logo.
6. Validar manualmente el flujo completo de MiniHotel en móvil y escritorio.
7. Ejecutar `npm run typecheck`, `npm run lint` y `npm run build` antes del despliegue.

## MiniHotel

El iframe usa exclusivamente la URL oficial entregada. Los scripts `iframe-resizer.min.js` y `main.js` se cargan con `next/script`, estrategia `afterInteractive`, y el CSP permite únicamente el origen necesario de MiniHotel para `frame-src`, `script-src` y `connect-src`.

Los campos de fecha/huéspedes de la home se transportan a `/reservar` como contexto para el usuario y WhatsApp. No se inyectan parámetros no documentados dentro del iframe. La búsqueda real y la confirmación se hacen en MiniHotel.

## Idiomas

Rutas: `/es`, `/pt`, `/en`. La web está traducida manualmente en `lib/i18n.ts`. Hasta confirmar los códigos de idioma admitidos por MiniHotel, el iframe conserva `language=es-ES` también en las páginas portuguesa e inglesa, con aviso visible.

## Habitaciones

No hay categorías inventadas. `/[locale]/habitaciones` explica que inventario y tarifas viven en MiniHotel. La ruta de detalle existe, pero no publica características hasta que exista contenido validado.

## SEO

- metadatos únicos por idioma/página;
- canonical + `hreflang` (`es-AR`, `pt-BR`, `en`, `x-default`);
- `Hotel` + `PostalAddress` como JSON-LD;
- `sitemap.xml` y `robots.txt`;
- raíz redirigida a `/es`;
- estructura preparada para añadir redirecciones 301 verificadas desde las URLs heredadas `.php` sin adivinar rutas.

## Analítica

`lib/analytics.ts` define los eventos de conversión. Los eventos externos a MiniHotel pueden enviarse a GA4 cuando se configure `NEXT_PUBLIC_GA_ID`. Los pasos internos del iframe (selección de habitación, pago y confirmación) no se espían ni se deducen desde el DOM cross-origin; solo deberán conectarse si MiniHotel ofrece un mecanismo oficial de eventos/postMessage documentado.

## Seguridad y privacidad

- CSP con nonce por request mediante `proxy.ts` (Next.js 16);
- cabeceras de seguridad adicionales;
- no hay credenciales privadas en cliente;
- el formulario de contacto valida con Zod y termina en WhatsApp, por lo que no expone un endpoint de correo susceptible a spam;
- no se envían datos personales o financieros a analítica;
- la web no almacena tarjetas ni estados de pago.

## Payway

No se implementa un checkout paralelo. La integración solo debe activarse si MiniHotel confirma Payway dentro de su flujo o si ambos proveedores entregan un método oficial que relacione reserva, importe y estado de pago.

## Pendientes funcionales confirmados

1. Códigos de idioma admitidos por el Booking Frame para portugués e inglés.
2. Política real y porcentaje de la seña.
3. Confirmación de cómo se integra/relaciona Payway con MiniHotel.

## Prueba manual de salida

- móvil: Safari iOS + Chrome Android;
- escritorio: Chrome, Firefox, Safari;
- validar iframe, altura dinámica y ausencia de doble scroll;
- seleccionar fechas/huéspedes dentro del motor, revisar habitaciones/tarifas y avanzar hasta la confirmación permitida;
- probar caída/bloqueo del iframe y enlace alternativo;
- probar todos los WhatsApp contextuales;
- revisar `hreflang`, canonical, sitemap y robots;
- Lighthouse objetivo >=90, documentando cualquier penalización originada por scripts externos.