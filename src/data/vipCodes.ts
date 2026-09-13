// Lista Oficial y Secreta de los 50 Códigos VIP de ColShopi Tienda By Leps Digital
// Estos 50 códigos de 6 dígitos numéricos son de USO ÚNICO y EXCLUSIVO.
// Cada compradora recibe uno de estos códigos por parte de Bianka al contactar a soporte.

export const SECRET_50_VIP_CODES: string[] = [
  '518472', '829104', '394812', '741258', '963852',
  '159753', '482619', '317495', '628401', '905147',
  '248163', '739284', '185926', '602481', '391745',
  '842617', '519374', '206841', '748192', '935274',
  '162849', '471928', '830192', '594712', '362819',
  '718294', '940182', '285719', '639182', '417294',
  '852147', '963258', '581934', '724185', '619283',
  '837491', '492816', '371948', '684215', '928374',
  '173952', '481936', '739158', '294817', '816294',
  '539281', '672914', '384719', '917283', '426815'
];

// Alias para compatibilidad con código existente
export const VIP_CODES_LIST: string[] = SECRET_50_VIP_CODES;

export const WHATSAPP_SUPPORT_NUMBER = '573104007428';
export const WHATSAPP_DISPLAY_NUMBER = '310 400 7428';

const STORAGE_CLAIMED_CODES_KEY = 'colishopi_claimed_vip_codes';

export interface ClaimedCodeRecord {
  code: string;
  userId: string;
  userName: string;
  claimedAt: string;
}

/**
 * Obtiene el mapa de códigos ya utilizados en el cliente (localStorage)
 */
export function getClaimedCodes(): Record<string, ClaimedCodeRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_CLAIMED_CODES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Registra un código como utilizado de forma única y exclusiva
 */
export function markCodeAsClaimed(code: string, userId: string, userName: string): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = code.trim();
    const claimed = getClaimedCodes();
    claimed[clean] = {
      code: clean,
      userId,
      userName,
      claimedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_CLAIMED_CODES_KEY, JSON.stringify(claimed));
  } catch (e) {
    console.warn('Error guardando código canjeado:', e);
  }
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  code?: string;
}

/**
 * Valida de forma estricta:
 * 1. Debe ser exactamente 6 dígitos numéricos.
 * 2. Debe pertenecer OBLIGATORIAMENTE a la lista de 50 códigos secretos.
 * 3. NO debe haber sido utilizado previamente por otra compradora (Uso único).
 */
export function validateStrictVIPCode(code: string, currentUserId?: string): ValidationResult {
  if (!code || !code.trim()) {
    return {
      isValid: false,
      error: 'Por favor ingresa tu código de activación de 6 dígitos.'
    };
  }

  const clean = code.trim();

  // Debe ser 6 dígitos numéricos
  if (!/^\d{6}$/.test(clean)) {
    return {
      isValid: false,
      error: `El código debe tener exactamente 6 dígitos numéricos (ingresaste ${clean.length}/6).`
    };
  }

  // Comprueba si está en la lista de los 50 códigos secretos autorizados
  const isAuthorized = SECRET_50_VIP_CODES.includes(clean);
  if (!isAuthorized) {
    return {
      isValid: false,
      error: 'Código no reconocido o no autorizado. El acceso a ColiFem 30D es exclusivo para compradoras de ColShopi. Solicita tu código único de 6 dígitos a Bianka por WhatsApp.'
    };
  }

  // Comprueba si ya fue utilizado por otra usuaria (Uso único)
  const claimedMap = getClaimedCodes();
  const existingClaim = claimedMap[clean];

  if (existingClaim && (!currentUserId || existingClaim.userId !== currentUserId)) {
    return {
      isValid: false,
      error: `Este código de 6 dígitos (${clean}) ya fue activado previamente por otra compradora. Cada código es de uso único y exclusivo. Por favor solicita tu código personal a Bianka por WhatsApp.`
    };
  }

  return {
    isValid: true,
    code: clean
  };
}

/**
 * Función booleana para comprobaciones rápidas
 */
export function isValidVIPCode(code: string): boolean {
  return validateStrictVIPCode(code).isValid;
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
