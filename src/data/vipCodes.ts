// Lista de Códigos VIP autorizados de ColShopi Tienda By Leps Digital
// Incluye 50 códigos de 6 dígitos exclusivos para compradoras del suplemento Coli Plus
// más los PINs y códigos de acceso de prueba rápida.

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

export function isValidVIPCode(code: string): boolean {
  if (!code) return false;
  const clean = code.trim().toUpperCase();
  return VIP_CODES_LIST.includes(clean) || SPECIAL_DEMO_CODES.includes(clean);
}
