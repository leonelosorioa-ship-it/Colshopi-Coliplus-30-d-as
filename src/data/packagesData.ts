import { ProductPack } from '../types';

export const COLIPLUS_PACKS: ProductPack[] = [
  {
    id: 'pack-1',
    title: '1 Frasco ColiPlus (450g)',
    subtitle: '25 Porciones de Sabor Manzana Verde',
    bottlesCount: 1,
    priceCOP: 75900,
    regularPriceCOP: 89000,
    discountPercentage: 15,
    freeShipping: false,
    bonusGift: 'Guía Digital de Inicio Rápido',
    imageAlt: 'Frasco ColiPlus 450g sabor manzana verde'
  },
  {
    id: 'pack-2',
    title: 'Pack Dúo (2 Frascos)',
    subtitle: '50 Días de Bienestar Digestivo Continuo',
    bottlesCount: 2,
    priceCOP: 113850,
    regularPriceCOP: 149900,
    discountPercentage: 24,
    freeShipping: true,
    badge: 'MÁS POPULAR',
    popular: true,
    bonusGift: 'Infusión Digestiva Carminativa + Envío Gratis',
    imageAlt: '2 Frascos de ColiPlus 450g'
  },
  {
    id: 'pack-3',
    title: 'Paga 2 Lleva 3 Frascos',
    subtitle: 'Tratamiento Completo de 75 Días',
    bottlesCount: 3,
    priceCOP: 151800,
    regularPriceCOP: 227700,
    discountPercentage: 33,
    freeShipping: true,
    badge: 'MEJOR VALOR',
    bonusGift: 'Guía Anti-FODMAPs + Cuchara Medidora VIP + Envío Gratis',
    imageAlt: '3 Frascos ColiPlus oferta 3x2'
  },
  {
    id: 'pack-5',
    title: 'Paga 3 Lleva 5 Frascos',
    subtitle: 'Plan Familiar / Mantenimiento Anual',
    bottlesCount: 5,
    priceCOP: 227700,
    regularPriceCOP: 379500,
    discountPercentage: 40,
    freeShipping: true,
    badge: 'MÁXIMO AHORRO',
    bonusGift: 'Tratamiento Completo + Obsequio Premium ColShopi + Envío Gratis',
    imageAlt: '5 Frascos ColiPlus tratamiento completo familiar'
  }
];

export const WHATSAPP_CONTACT_NUMBER = '+573104007428'; // Official ColShopi customer care with Bianka
