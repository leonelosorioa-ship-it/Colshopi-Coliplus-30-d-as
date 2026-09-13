// Lista de Códigos VIP autorizados de ColShopi Tienda By Leps Digital
// Incluye códigos de 6 dígitos exclusivos para compradoras del suplemento Coli Plus
// y permite validación de códigos de 6 dígitos numéricos, igual como funciona con TyroFem 30D.

export const VIP_CODES_LIST: string[] = [
  '518472', '829104', '394812', '741258', '963852',
  '159753', '482619', '317495', '628401', '905147',
  '248163', '739284', '185926', '602481', '391745',
  '842617', '519374', '206841', '748192', '935274',
  '162849', '471928', '830192', '594712', '362819',
  '718294', '940182', '285719', '639182', '417294',
  '852147', '963258', '741852', '123987', '456321',
  '789654', '321654', '654987', '987321', '258741',
  '369852', '147852', '258963', '369741', '753951',
  '951357', '357159', '159357', '852963', '741963'
];

// Códigos especiales y universales para demo / validación inmediata
export const SPECIAL_DEMO_CODES: string[] = [
  'COLI30',
  'VIP777',
  'COLIFEM',
  'COLIPLUS',
  '250816',
  'VIP2026'
];

export const WHATSAPP_SUPPORT_NUMBER = '573104007428';
export const WHATSAPP_DISPLAY_NUMBER = '310 400 7428';

/**
 * Valida si el código es válido:
 * - Cualquier código numérico de 6 dígitos (criterio principal del usuario)
 * - Códigos específicos pre-generados de frasco
 * - Códigos de demostración rápida
 */
export function isValidVIPCode(code: string): boolean {
  if (!code) return false;
  const clean = code.trim().toUpperCase();
  
  // Acepta cualquier código de 6 dígitos numéricos (como en TyroFem 30D)
  if (/^\d{6}$/.test(clean)) {
    return true;
  }
  
  return VIP_CODES_LIST.includes(clean) || SPECIAL_DEMO_CODES.includes(clean);
}

/**
 * Genera el enlace oficial a WhatsApp para solicitar el código o soporte con Bianka
 */
export function getWhatsAppCodeRequestUrl(userName?: string, userPhone?: string): string {
  let text = '';
  if (userName && userName.trim()) {
    const phoneDetail = userPhone && userPhone.trim() ? ` (WhatsApp de mi pedido: ${userPhone.trim()})` : '';
    text = `👋 ¡Hola Bianka! Mi nombre es ${userName.trim()}${phoneDetail}. Acabo de ingresar a la App de ColiFem 30D de ColShopi Tienda By Leps Digital. Ya compré mi frasco de Coli Plus y necesito mi código de acceso VIP de 6 dígitos para activar mi programa de 30 días. ¡Muchas gracias! 💚`;
  } else {
    text = `👋 ¡Hola Bianka! Acabo de ingresar a la App de ColiFem 30D de ColShopi Tienda By Leps Digital. Ya compré mi frasco de Coli Plus y necesito mi código de acceso VIP de 6 dígitos para activar mi programa de 30 días. 💚`;
  }
  return `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppSupportUrl(reason?: string): string {
  const text = reason
    ? `👋 ¡Hola Bianka! Necesito soporte sobre ColiFem 30D y mi suplemento Coli Plus de ColShopi Tienda By Leps Digital: ${reason}`
    : `👋 ¡Hola Bianka! Necesito soporte y orientación sobre mi acceso al programa de 30 días de ColiFem 30D de ColShopi Tienda By Leps Digital.`;
  return `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(text)}`;
}

