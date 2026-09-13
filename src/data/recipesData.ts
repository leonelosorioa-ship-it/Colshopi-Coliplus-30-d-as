import { Recipe } from '../types';

export const GUT_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Batido Verde Desinflamante con ColiPlus Manzana',
    category: 'Batidos & Smoothies',
    prepTime: '5 min',
    servings: '1 vaso (300ml)',
    colplusUsage: '1 cucharada dosificadora de ColiPlus',
    description: 'Bebida fresca y alcalinizante rica en clorofila y prebióticos activos para reducir la distensión matutina.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '1 cucharada de ColiPlus sabor manzana verde',
      '1 taza de espinacas tiernas lavadas',
      '1/2 pepino cohombro pelado y sin semillas',
      '1 trozo pequeño de jengibre fresco (1 cm)',
      '1 taza de agua filtrada fría o agua de coco natural',
      'Jugo de 1/2 limón tahití'
    ],
    instructions: [
      'Lava muy bien las hojas de espinaca y el pepino.',
      'Coloca todos los ingredientes frescos en la licuadora con el agua.',
      'Licúa a velocidad alta durante 45 segundos hasta obtener una mezcla homogénea.',
      'Añade la cucharada de ColiPlus al final y pulsa durante 5 segundos para disolver sin sobrebatir.',
      'Sirve inmediatamente y bebe con calma, masticando cada sorbo para activar enzimas salivares.'
    ],
    gutBenefit: 'Aporte de mucílagos y magnesio que relajan la musculatura lisa del colon y previenen espasmos.'
  },
  {
    id: 'rec-2',
    title: 'Caldo de Huesos y Vegetales Reparador de Mucosa',
    category: 'Infusiones & Caldos',
    prepTime: '45 min (olla a presión) o 3 horas',
    servings: '4 porciones',
    description: 'El elixir dorado de la salud intestinal: rico en colágeno, prolina y glutamina para sellar uniones estrechas del epitelio.',
    fodmapStatus: 'Anti-Gases',
    ingredients: [
      '500g de huesos de res o pollo de pastoreo',
      '2 zanahorias en rodajas medianas',
      '2 ramas de apio (solo hojas y tallo tierno)',
      '1 trozo de cúrcuma fresca rallada',
      '1 cucharada de vinagre de sidra de manzana crudo',
      '1 cucharadita de sal marina o del Himalaya',
      '2 litros de agua'
    ],
    instructions: [
      'Coloca los huesos en la olla con el agua y el vinagre de manzana (el ácido ayuda a extraer minerales y colágeno).',
      'Deja reposar 15 minutos en frío, luego lleva a ebullición suave.',
      'Agrega las zanahorias, el apio, la cúrcuma y la sal marina.',
      'Cocina a fuego lento tapado durante al menos 2 horas o 45 min en olla a presión.',
      'Cuela el caldo y guárdalo en frascos de vidrio. Toma 1 taza caliente antes del almuerzo o cena.'
    ],
    gutBenefit: 'La l-glutamina y glicina reparan las microvellosidades intestinales y calman la hiperreactividad.'
  },
  {
    id: 'rec-3',
    title: 'Crema Digestiva de Ahuyama y Jengibre Cálido',
    category: 'Almuerzos & Cenas',
    prepTime: '20 min',
    servings: '2 platos',
    description: 'Plato reconfortante de textura aterciopelada que no genera ninguna fermentación gaseosa.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '400g de ahuyama o calabaza pelada y cortada en cubos',
      '1 trozo de jengibre fresco pelado (2 cm)',
      '1/2 taza de leche de coco ligera sin azúcar',
      '1 taza de caldo de verduras casero',
      '1 cucharadita de aceite de oliva virgen extra',
      'Pizca de sal marina y comino tostado'
    ],
    instructions: [
      'Cocina los cubos de ahuyama al vapor o en el caldo hirviendo durante 12-15 minutos hasta que estén suaves.',
      'Transfiere la ahuyama caliente a la licuadora con el jengibre, la leche de coco y la sal.',
      'Procesa hasta lograr una crema espesa y sedosa.',
      'Sirve caliente en un tazón hondo con unas gotas de aceite de oliva por encima y un toque de semillas de calabaza tostadas.'
    ],
    gutBenefit: 'Fibra soluble blanda que forma un gel calmante sobre las paredes estomacales inflamadas.'
  },
  {
    id: 'rec-4',
    title: 'Infusión Carminativa de Tres Hierbas Antigases',
    category: 'Infusiones & Caldos',
    prepTime: '8 min',
    servings: '1 taza grande',
    description: 'Trilogía digestiva clásica: desinflama en 15 minutos expulsando gases atrapados y aliviando cólicos.',
    fodmapStatus: 'Anti-Gases',
    ingredients: [
      '1 cucharada de flores secas de manzanilla',
      '5 hojas de menta fresca o hierbabuena',
      '1 estrella de anís estrellado o 1/2 cdta de semillas de hinojo',
      '300ml de agua recién hervida',
      'Unas gotas de zumo de limón al gusto'
    ],
    instructions: [
      'Coloca las flores de manzanilla, la menta y el anís en una tetera o taza.',
      'Vierte el agua caliente a 90°C sobre las hierbas.',
      'Tapa la taza inmediatamente (esto es crucial para no evaporar los aceites esenciales carminativos) y deja infusionar 7 minutos.',
      'Cuela y bebe tibia a pequeños sorbos después de la comida principal.'
    ],
    gutBenefit: 'El anetol del anís y el camazuleno de la manzanilla frenan los espasmos del músculo liso digestivo.'
  },
  {
    id: 'rec-5',
    title: 'Bowl de Avena Reposada con Chía, Canela y Arándanos',
    category: 'Desayunos Colon-Friendly',
    prepTime: '5 min (preparar noche anterior)',
    servings: '1 porción',
    description: 'Desayuno prebiótico con almidón resistente que nutre las bacterias productoras de butirato.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '1/2 taza de hojuelas de avena sin gluten certificada',
      '1 cucharada de semillas de chía',
      '1 taza de leche de almendras sin azúcar',
      '1/2 cucharadita de canela de Ceilán en polvo',
      '1/4 taza de arándanos frescos o fresas en rodajas',
      '1 cucharada de nueces picadas'
    ],
    instructions: [
      'En un frasco o bowl de vidrio, mezcla la avena, la chía, la canela y la leche de almendras.',
      'Revuelve bien para que las semillas de chía no se apelmacen.',
      'Tapa y refrigera durante al menos 4 horas o toda la noche.',
      'Por la mañana, saca 15 minutos antes de la nevera para no consumirla helada.',
      'Corona con los arándanos frescos y las nueces picadas.'
    ],
    gutBenefit: 'El almidón resistente formado por enfriamiento alimenta selectivamente a bifidobacterias saludables.'
  },
  {
    id: 'rec-6',
    title: 'Huevos Pochados con Aguacate y Pan de Masa Madre',
    category: 'Desayunos Colon-Friendly',
    prepTime: '12 min',
    servings: '1 porción',
    description: 'Aporte de grasas saludables monoinsaturadas y proteínas de fácil asimilación que no saturan el hígado.',
    fodmapStatus: 'Digestión Suave',
    ingredients: [
      '2 huevos frescos de campo',
      '1 rebanada de pan de masa madre artesanal (fermentación lenta de 24h)',
      '1/3 de aguacate hass maduro en láminas',
      '1 cucharadita de aceite de oliva extra virgen',
      'Pizca de sal marina y semillas de ajonjolí tostado'
    ],
    instructions: [
      'Tuesta ligeramente la rebanada de pan de masa madre.',
      'En una olla con agua a punto de hervir y unas gotas de vinagre, haz un remolino suave y vierte los huevos uno a uno.',
      'Cocina durante 3 minutos hasta que la clara esté firme y la yema permanezca líquida.',
      'Coloca las láminas de aguacate sobre el pan tostado y monta encima los huevos pochados.',
      'Termina con aceite de oliva y semillas de ajonjolí.'
    ],
    gutBenefit: 'La fermentación lenta degrada el gluten y los fitatos, facilitando una digestión limpia y sin pesadez.'
  },
  {
    id: 'rec-7',
    title: 'Pechuga al Limón con Salteado Suave de Calabacín y Zanahoria',
    category: 'Almuerzos & Cenas',
    prepTime: '20 min',
    servings: '2 porciones',
    description: 'Almuerzo balanceado libre de cebolla y ajo crudo, ideal para los días con tendencia a inflamación.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '300g de filetes de pechuga de pollo marinados en limón y orégano',
      '1 calabacín verde cortado en medias lunas',
      '1 zanahoria grande cortada en bastoncitos finos',
      '1 cucharada de aceite de oliva o aceite de coco virgen',
      'Sal marina, tomillo fresco y pizca de pimienta blanca'
    ],
    instructions: [
      'Calienta una sartén o plancha a fuego medio con la mitad del aceite de oliva.',
      'Cocina los filetes de pechuga 4 minutos por lado hasta dorar con jugos claros.',
      'En otra sartén, saltea los bastoncitos de zanahoria y el calabacín a fuego vivo durante 5 minutos para que queden tiernos pero crujientes.',
      'Sazona los vegetales con tomillo y sal marina.',
      'Sirve acompañado de 1/2 taza de arroz blanco jazmín o puré de papa criolla.'
    ],
    gutBenefit: 'Proteína magra sin adobos artificiales ni azúcares que garantiza cero fermentación bacteriana molesta.'
  },
  {
    id: 'rec-8',
    title: 'Smoothie Nocturno Reparador con ColiPlus',
    category: 'Batidos & Smoothies',
    prepTime: '5 min',
    servings: '1 vaso (250ml)',
    colplusUsage: '1 cucharada dosificadora de ColiPlus en la noche',
    description: 'El ritual de oro nocturno: tomado 30 minutos antes de dormir para trabajar en la noche y garantizar tránsito matutino.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '1 cucharada dosificadora de ColiPlus (manzana verde)',
      '1 taza de infusión fría de manzanilla o agua filtrada',
      '1/4 de manzana verde pelada (opcional para textura)',
      '3 cubitos de hielo de agua pura',
      '1 ramita pequeña de hierbabuena fresca'
    ],
    instructions: [
      'Disuelve la cucharada de ColiPlus en la infusión o agua en un vaso con batidor manual o licuadora durante 10 segundos.',
      'Agrega el hielo y las hojas de hierbabuena.',
      'Bébelo despacio en un ambiente tranquilo, lejos de pantallas, mientras realizas 3 respiraciones profundas.'
    ],
    gutBenefit: 'La flor de jamaica, pitaya y alcachofa desintoxican suavemente el hígado y el colon durante el descanso nocturno.'
  },
  {
    id: 'rec-9',
    title: 'Kéfir Suave con Papaya Dulce y Linaza Dorada Molida',
    category: 'Desayunos Colon-Friendly',
    prepTime: '5 min',
    servings: '1 tazón',
    description: 'Doble impacto: probióticos vivos en suspensión más enzimas proteolíticas naturales (papaína).',
    fodmapStatus: 'Digestión Suave',
    ingredients: [
      '1 taza de kéfir natural sin azúcar (o yogur griego sin lactosa)',
      '1 taza de papaya madura cortada en cubos frescos',
      '1 cucharadita de semillas de linaza dorada recién molidas',
      '1 cucharadita de coco rallado deshidratado sin azúcar'
    ],
    instructions: [
      'Sirve el kéfir fresco en un tazón.',
      'Agrega los cubos de papaya recién cortados.',
      'Espolvorea la linaza molida y el coco por encima.',
      'Disfruta masticando bien cada bocado.'
    ],
    gutBenefit: 'La papaína rompe enlaces proteicos difíciles mientras las cepas lácticas del kéfir repueblan la microbiota.'
  },
  {
    id: 'rec-10',
    title: 'Pescado Blanco al Papillote con Romero y Puré de Batata',
    category: 'Almuerzos & Cenas',
    prepTime: '25 min',
    servings: '2 personas',
    description: 'Cocción hermética al vapor que conserva todos los nutrientes sin necesidad de aceites recalentados.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '2 lomos de corvina, tilapia o róbalo fresco',
      '1 batata o camote mediano cocido y hecho puré',
      '1 cucharadita de romero fresco picado',
      '1 cucharada de aceite de oliva virgen extra',
      'Rodajas de limón y sal marina'
    ],
    instructions: [
      'Precalienta el horno a 190°C.',
      'Corta dos cuadrados grandes de papel para hornear o aluminio.',
      'Coloca cada filete en el centro del papel, vierte unas gotas de aceite de oliva, limón, sal y romero.',
      'Cierra el paquete doblando los bordes para crear un bolsillo sellado al vapor.',
      'Hornea durante 15-18 minutos. Sirve de inmediato con el puré tibio de batata.'
    ],
    gutBenefit: 'Omega 3 antiinflamatorio y carbohidratos complejos amigables con el tránsito lento.'
  },
  {
    id: 'rec-11',
    title: 'Pudín Saciante de Chía en Leche de Almendras y Canela',
    category: 'Desayunos Colon-Friendly',
    prepTime: '5 min + reposo',
    servings: '1 frasco',
    description: 'Gel mucilaginoso que actúa como una esponja suave barriendo toxinas y residuos acumulados en las criptas del colon.',
    fodmapStatus: 'Bajo en FODMAPs',
    ingredients: [
      '3 cucharadas de semillas de chía negras o blancas',
      '1 taza de leche de almendras natural sin endulzante',
      '1/2 cucharadita de esencia natural de vainilla',
      '1 pizca de canela en polvo',
      '6 frambuesas o fresas para decorar'
    ],
    instructions: [
      'Mezcla las semillas de chía con la leche de almendras, la vainilla y la canela en un frasco de vidrio.',
      'Bate vigorosamente con un tenedor durante 1 minuto.',
      'Deja reposar 10 minutos y vuelve a batir para evitar que las semillas caigan al fondo.',
      'Refrigera por al menos 2 horas. Decora con frutos rojos antes de saborear.'
    ],
    gutBenefit: 'Aporte masivo de fibra soluble mucilaginosa que lubrica y protege el esfínter anal y la mucosa.'
  },
  {
    id: 'rec-12',
    title: 'Agua Digestiva de Jamaica, Menta y Pepino Hidratante',
    category: 'Infusiones & Caldos',
    prepTime: '10 min',
    servings: '1 jarra (1 litro)',
    description: 'Diurética, refrescante y repleta de antocianinas que combaten el estrés oxidativo celular en el colon.',
    fodmapStatus: 'Anti-Gases',
    ingredients: [
      '3 cucharadas de flores de jamaica secas',
      '1/2 pepino cortado en rodajas delgadas',
      '10 hojas de menta o hierbabuena magulladas suavemente',
      '1 litro de agua pura filtrada',
      'Hielo al gusto'
    ],
    instructions: [
      'Hierve 200ml de agua y vierte sobre las flores de jamaica. Deja reposar 10 minutos hasta lograr un concentrado rubí profundo.',
      'Cuela el concentrado en una jarra grande y completa con los 800ml restantes de agua fría.',
      'Añade las rodajas de pepino y la menta fresca.',
      'Refrigera durante 30 minutos y ve bebiéndola a lo largo del día entre comidas.'
    ],
    gutBenefit: 'Potencia la depuración renal y reduce la retención hídrica abdominal provocada por inflamación celular.'
  }
];
