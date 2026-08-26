# Checklist de salida a producción

- [ ] Instalar dependencias con Node.js >=20.9.
- [ ] Ejecutar `npm run typecheck`, `npm run lint` y `npm run build`.
- [ ] Reemplazar todos los marcadores visuales por fotografías profesionales reales y colocar el logo oficial.
- [ ] Probar `/es`, `/pt` y `/en` en celular, tablet y escritorio.
- [ ] Probar el Booking Frame real: carga, altura, fechas, huéspedes, habitaciones, tarifas y finalización de reserva.
- [ ] Confirmar que los scripts de MiniHotel no se duplican durante navegación real.
- [ ] Probar el enlace alternativo del motor y todos los CTA de WhatsApp.
- [ ] Confirmar que portugués/inglés muestran aviso mientras el motor permanezca en `es-ES`.
- [ ] Aplicar solo redirecciones 301 de URLs antiguas que hayan sido verificadas; no adivinar `.php`.
- [ ] Revisar canonical, `hreflang`, sitemap, robots y JSON-LD en producción.
- [ ] Configurar GA4 solo si se desea y verificar que no se envían datos personales/financieros.
- [ ] Ejecutar Lighthouse y documentar cualquier impacto atribuible a scripts externos.
- [ ] Verificar CSP/cabeceras en el dominio final.
- [ ] Configurar Payway únicamente después de confirmar el flujo MiniHotel ↔ Payway y la política de seña.
