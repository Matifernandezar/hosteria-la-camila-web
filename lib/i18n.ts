export const locales = ["es", "pt", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const languageTags: Record<Locale, string> = {
  es: "es-AR",
  pt: "pt-BR",
  en: "en",
};

export const dictionaries = {
  es: {
    nav: { home: "Inicio", rooms: "Habitaciones", services: "Servicios", gallery: "Galería", location: "Ubicación", contact: "Contacto", book: "Consultar disponibilidad" },
    hero: { eyebrow: "Villa La Angostura · Patagonia Argentina", title: "La Patagonia frente a vos", subtitle: "Descansá en Villa La Angostura con vistas al Nahuel Huapi, desayuno patagónico y una experiencia pensada para disfrutar cada estación.", primary: "Consultar disponibilidad", secondary: "Hablar por WhatsApp" },
    availability: { title: "Tu estadía", checkin: "Entrada", checkout: "Salida", adults: "Adultos", children: "Menores", submit: "Ver disponibilidad", note: "Las tarifas y la disponibilidad se confirman exclusivamente en el motor oficial de MiniHotel." },
    intro: { eyebrow: "Hostería La Camila", title: "Un refugio cálido frente al Nahuel Huapi", body: "Una hostería patagónica de 15 habitaciones en Villa La Angostura, pensada para combinar descanso, vistas panorámicas y una atención cercana." },
    rooms: { title: "Habitaciones", body: "Las categorías, disponibilidad, restricciones y tarifas vigentes se muestran directamente en MiniHotel. Así evitamos publicar información desactualizada.", cta: "Consultar habitaciones disponibles", detailTitle: "Categoría de habitación", detailBody: "Esta ficha se publicará cuando la categoría y su descripción sean validadas. Mientras tanto, consultá el inventario real en MiniHotel." },
    services: { title: "Servicios para disfrutar cada estación", breakfast: "Desayuno buffet patagónico", breakfastText: "Productos regionales para empezar el día con sabores de la Patagonia.", spa: "Spa e hidromasaje", spaText: "Un espacio de relax con vista al lago y la cordillera.", pool: "Piscina exterior climatizada", poolText: "Disponible durante la temporada estival.", wifi: "Wi‑Fi", wifiText: "Conectividad en habitaciones y espacios comunes.", parking: "Estacionamiento privado", parkingText: "Espacio de estacionamiento dentro de la propiedad.", extra: "Además: masajes con costo adicional, TV LED con DirecTV, caja de seguridad electrónica, baño privado con bañera, calefacción central regulable, limpieza diaria, recambio de blancos y conserjería." },
    gallery: { title: "La Camila, en imágenes", body: "La galería queda preparada para utilizar exclusivamente las fotografías profesionales reales entregadas por la hostería." },
    location: { title: "En el comienzo de la Ruta de los Siete Lagos", body: "Hostería La Camila se encuentra en Villa La Angostura, con vistas al lago Nahuel Huapi y a la cordillera de los Andes.", directions: "Cómo llegar" },
    book: { title: "Reserva directa", body: "Consultá disponibilidad, habitaciones y tarifas en tiempo real en el motor oficial de MiniHotel.", engineSpanish: "Por el momento, MiniHotel conserva el idioma español hasta confirmar los códigos oficiales para portugués e inglés.", fallback: "Abrir el motor de reservas en una pestaña nueva", help: "¿Necesitás ayuda con tu reserva?" },
    contact: { title: "Estamos para ayudarte", body: "Podés escribirnos por WhatsApp, correo o Instagram. También podés completar el formulario y continuar la consulta directamente en WhatsApp.", name: "Nombre", email: "Correo", message: "Consulta", submit: "Continuar por WhatsApp", success: "Listo. Abrimos WhatsApp con tu consulta preparada.", error: "Revisá los datos antes de continuar." },
    policies: { title: "Políticas", body: "Las políticas de reserva, cancelación, menores, mascotas, horarios y medios de pago se publicarán únicamente con la versión oficial validada por la hostería." },
    footer: { tagline: "Refugio patagónico frente al Nahuel Huapi.", rights: "Todos los derechos reservados." },
    common: { direct: "Reserva directa", whatsapp: "WhatsApp", photoPending: "Fotografía profesional pendiente de incorporar", viewGallery: "Ver galería", learnMore: "Conocer servicios" },
  },
  pt: {
    nav: { home: "Início", rooms: "Quartos", services: "Serviços", gallery: "Galeria", location: "Localização", contact: "Contato", book: "Consultar disponibilidade" },
    hero: { eyebrow: "Villa La Angostura · Patagônia Argentina", title: "A Patagônia diante de você", subtitle: "Descanse em Villa La Angostura com vista para o Nahuel Huapi, café da manhã patagônico e uma experiência pensada para cada estação.", primary: "Consultar disponibilidade", secondary: "Falar pelo WhatsApp" },
    availability: { title: "Sua estadia", checkin: "Entrada", checkout: "Saída", adults: "Adultos", children: "Crianças", submit: "Ver disponibilidade", note: "Tarifas e disponibilidade são confirmadas exclusivamente no motor oficial MiniHotel." },
    intro: { eyebrow: "Hostería La Camila", title: "Um refúgio acolhedor diante do Nahuel Huapi", body: "Uma hostería patagônica de 15 quartos em Villa La Angostura, criada para combinar descanso, vistas panorâmicas e atendimento próximo." },
    rooms: { title: "Quartos", body: "As categorias, disponibilidade, restrições e tarifas vigentes são exibidas diretamente no MiniHotel para evitar informação desatualizada.", cta: "Consultar quartos disponíveis", detailTitle: "Categoria de quarto", detailBody: "Esta página será publicada quando a categoria e sua descrição forem validadas. Enquanto isso, consulte o inventário real no MiniHotel." },
    services: { title: "Serviços para aproveitar cada estação", breakfast: "Café da manhã buffet patagônico", breakfastText: "Produtos regionais para começar o dia com sabores da Patagônia.", spa: "Spa e hidromassagem", spaText: "Um espaço de relaxamento com vista para o lago e a cordilheira.", pool: "Piscina externa climatizada", poolText: "Disponível durante a temporada de verão.", wifi: "Wi‑Fi", wifiText: "Conectividade nos quartos e áreas comuns.", parking: "Estacionamento privativo", parkingText: "Espaço de estacionamento dentro da propriedade.", extra: "Além disso: massagens com custo adicional, TV LED com DirecTV, cofre eletrônico, banheiro privativo com banheira, calefação central regulável, limpeza diária, troca de roupa de cama e concierge." },
    gallery: { title: "La Camila, em imagens", body: "A galeria está preparada para usar exclusivamente as fotografias profissionais reais fornecidas pela hostería." },
    location: { title: "No começo da Rota dos Sete Lagos", body: "Hostería La Camila fica em Villa La Angostura, com vista para o lago Nahuel Huapi e a Cordilheira dos Andes.", directions: "Como chegar" },
    book: { title: "Reserva direta", body: "Consulte disponibilidade, quartos e tarifas em tempo real no motor oficial do MiniHotel.", engineSpanish: "Por enquanto, o MiniHotel permanece em espanhol até a confirmação dos códigos oficiais para português e inglês.", fallback: "Abrir o motor de reservas em uma nova aba", help: "Precisa de ajuda com sua reserva?" },
    contact: { title: "Estamos aqui para ajudar", body: "Fale conosco por WhatsApp, e-mail ou Instagram. Você também pode preencher o formulário e continuar a consulta diretamente no WhatsApp.", name: "Nome", email: "E-mail", message: "Consulta", submit: "Continuar no WhatsApp", success: "Pronto. Abrimos o WhatsApp com sua consulta preparada.", error: "Revise os dados antes de continuar." },
    policies: { title: "Políticas", body: "As políticas de reserva, cancelamento, menores, animais, horários e formas de pagamento serão publicadas somente após validação oficial pela hostería." },
    footer: { tagline: "Refúgio patagônico diante do Nahuel Huapi.", rights: "Todos os direitos reservados." },
    common: { direct: "Reserva direta", whatsapp: "WhatsApp", photoPending: "Fotografia profissional pendente de incorporação", viewGallery: "Ver galeria", learnMore: "Conhecer serviços" },
  },
  en: {
    nav: { home: "Home", rooms: "Rooms", services: "Services", gallery: "Gallery", location: "Location", contact: "Contact", book: "Check availability" },
    hero: { eyebrow: "Villa La Angostura · Argentine Patagonia", title: "Patagonia, right in front of you", subtitle: "Stay in Villa La Angostura with views of Nahuel Huapi, a Patagonian breakfast and an experience designed for every season.", primary: "Check availability", secondary: "Chat on WhatsApp" },
    availability: { title: "Your stay", checkin: "Check-in", checkout: "Check-out", adults: "Adults", children: "Children", submit: "View availability", note: "Rates and availability are confirmed exclusively in the official MiniHotel booking engine." },
    intro: { eyebrow: "Hostería La Camila", title: "A warm retreat facing Nahuel Huapi", body: "A 15-room Patagonian inn in Villa La Angostura, designed around rest, panoramic views and warm, personal service." },
    rooms: { title: "Rooms", body: "Current categories, availability, restrictions and rates are displayed directly in MiniHotel so the website never publishes stale inventory.", cta: "Check available rooms", detailTitle: "Room category", detailBody: "This page will be published once the category and description are validated. Until then, check live inventory in MiniHotel." },
    services: { title: "Services for every season", breakfast: "Patagonian buffet breakfast", breakfastText: "Regional products to start the day with the flavors of Patagonia.", spa: "Spa and hot tub", spaText: "A place to unwind with lake and mountain views.", pool: "Heated outdoor pool", poolText: "Available during the summer season.", wifi: "Wi‑Fi", wifiText: "Connectivity in rooms and common areas.", parking: "Private parking", parkingText: "On-property parking for guests.", extra: "Also available: massages at an additional cost, LED TV with DirecTV, electronic safe, private bathroom with bathtub, adjustable central heating, daily housekeeping, linen replacement and concierge assistance." },
    gallery: { title: "La Camila, in pictures", body: "The gallery is ready to use only the real professional photographs supplied by the property." },
    location: { title: "At the beginning of the Seven Lakes Route", body: "Hostería La Camila is in Villa La Angostura, overlooking Lake Nahuel Huapi and the Andes.", directions: "Get directions" },
    book: { title: "Book direct", body: "Check live availability, rooms and rates in the official MiniHotel booking engine.", engineSpanish: "For now, MiniHotel remains in Spanish until its official Portuguese and English language codes are confirmed.", fallback: "Open the booking engine in a new tab", help: "Need help with your booking?" },
    contact: { title: "We are here to help", body: "Contact us on WhatsApp, email or Instagram. You can also complete the form and continue your enquiry directly in WhatsApp.", name: "Name", email: "Email", message: "Enquiry", submit: "Continue on WhatsApp", success: "Done. We opened WhatsApp with your enquiry prepared.", error: "Please review your details before continuing." },
    policies: { title: "Policies", body: "Booking, cancellation, children, pets, check-in/out and payment policies will only be published after they are officially validated by the property." },
    footer: { tagline: "A Patagonian retreat facing Nahuel Huapi.", rights: "All rights reserved." },
    common: { direct: "Book direct", whatsapp: "WhatsApp", photoPending: "Professional photograph pending", viewGallery: "View gallery", learnMore: "Explore services" },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
