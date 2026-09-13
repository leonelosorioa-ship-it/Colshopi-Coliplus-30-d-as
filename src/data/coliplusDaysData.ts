import { DayPlan } from '../types';

export const COLIPLUS_30_DAYS: DayPlan[] = [
  // FASE 1: RESETEO Y DESCOMPRESIÓN INTESTINAL (Días 1 - 7)
  {
    day: 1,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Iniciar el ritual de hidratación y primera dosis nocturna de Coli Plus.',
    biankaQuote: 'Bienvenida a tu transformación digestiva con ColShopi. Hoy encendemos la chispa de la calma intestinal y la ligereza abdominal.',
    biankaAudioText: '¡Hola hermosa! Soy Bianka, tu guía de bienestar y hábitos saludables de ColShopi Tienda. Hoy iniciamos tu Guía de 30 Días con Coli Plus. En esta primera semana nos enfocaremos en descomprimir tu abdomen y disolver los gases atrapados. Esta noche, 20 a 30 minutos después de cenar, disuelve 1 cucharada de Coli Plus en un vaso de agua fresca y bébelo con calma. ¡Estaré a tu lado todos los días!',
    coliPlusIntakeGuide: '1 cucharada dosificadora en 250ml de agua fresca, 20-30 min después de cenar antes de acostarte.',
    tasks: [
      { id: 'd1-t1', title: 'Dosis Coli Plus Nocturna', description: '1 cucharada en 250ml de agua fresca 30 min antes de acostarte.', type: 'supplement', completed: false },
      { id: 'd1-t2', title: 'Meta de Hidratación (2 Litros)', description: 'Bebe 8 vasos de agua distribuidos a lo largo de tu jornada.', type: 'hydration', completed: false },
      { id: 'd1-t3', title: 'Cena Liviana Anti-Gases', description: 'Opta por una crema caliente o caldo suave sin lácteos.', type: 'nutrition', completed: false },
      { id: 'd1-t4', title: 'Activación del Nervio Vago', description: 'Haz 3 respiraciones diafragmáticas lentas inflando el abdomen antes de cenar.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'Evita masticar chicle y bebidas con gas hoy para no tragar aire adicional que cause meteorismo.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 2,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Despertar con un vaso de agua tibia y observar la primera evacuación.',
    biankaQuote: 'Tu cuerpo responde maravillosamente cuando le das agua suficiente y fibra botánica noble sin forzarlo.',
    biankaAudioText: '¡Buenos días! Al despertar, bebe un vaso de agua tibia antes de tu café matutino. La pitaya, linaza y chía de Coli Plus que tomaste anoche ya están lubricando suavemente tus paredes intestinales.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca antes de dormir para propulsión fecal natural matutina.',
    tasks: [
      { id: 'd2-t1', title: 'Agua Tibia al Despertar', description: '250ml de agua a temperatura tibia para activar el reflejo gastrocólico.', type: 'hydration', completed: false },
      { id: 'd2-t2', title: 'Registro en Escala de Bristol', description: 'Anota en tu Daily Tracker cómo fue tu visita al baño hoy.', type: 'wellness', completed: false },
      { id: 'd2-t3', title: 'Dosis Coli Plus Nocturna', description: '1 porción en agua fresca 20 minutos después de cenar.', type: 'supplement', completed: false },
      { id: 'd2-t4', title: 'Almuerzo sin Frituras', description: 'Cocina a la plancha o al vapor para evitar sobrecargar la vesícula.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La alcachofa presente en Coli Plus estimula la producción de bilis para digerir grasas con mayor rapidez.',
    recommendedRecipeId: 'rec-1'
  },
  {
    day: 3,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Masticación consciente: 20 masticadas por bocado.',
    biankaQuote: 'El estómago no tiene dientes. La digestión empieza en la boca con tus enzimas salivares.',
    biankaAudioText: 'Hoy nos enfocamos en el poder de la masticación. Masticar cada bocado hasta formar una pasta suave reduce en más del 60% la fermentación bacteriana ruidosa en el colon.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua fresca nocturna.',
    tasks: [
      { id: 'd3-t1', title: 'Masticación Lenta', description: 'Dedica 20 minutos a tu comida principal sin pantallas ni prisas.', type: 'wellness', completed: false },
      { id: 'd3-t2', title: 'Infusión Digestiva Post-Almuerzo', description: 'Una taza tibia de menta o manzanilla para relajar el píloro.', type: 'hydration', completed: false },
      { id: 'd3-t3', title: 'Dosis Coli Plus', description: '1 cucharada en agua fresca antes de descansar.', type: 'supplement', completed: false },
      { id: 'd3-t4', title: 'Verduras Cocidas al Vapor', description: 'Prefiere vegetales cocidos en vez de ensaladas crudas duras.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Las verduras cocidas tienen paredes celulares ablandadas que facilitan la digestión en un colon inflamado.',
    recommendedRecipeId: 'rec-3'
  },
  {
    day: 4,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Caminata de 15 minutos post-comida para propulsión peristáltica.',
    biankaQuote: 'El movimiento suave de tus piernas masajea naturalmente tus órganos abdominales.',
    biankaAudioText: '¡Hola campeona! Una caminata suave de 15 minutos a paso tranquilo tras el almuerzo acelera el vaciado gástrico y previene el reflujo y la modorra.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca 20 min después de tu cena ligera.',
    tasks: [
      { id: 'd4-t1', title: 'Caminata Digestiva', description: '15 minutos caminando al aire libre tras el almuerzo.', type: 'wellness', completed: false },
      { id: 'd4-t2', title: 'Dosis Coli Plus Nocturna', description: 'Tu porción habitual con 250ml de agua fresca.', type: 'supplement', completed: false },
      { id: 'd4-t3', title: 'Meta 2 Litros de Agua', description: 'Registra tus 8 vasos en el contador de hidratación.', type: 'hydration', completed: false },
      { id: 'd4-t4', title: 'Proteína Magra al Horno', description: 'Pechuga a las hierbas finas o pescado blanco con calabacín.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La flor de jamaica en Coli Plus actúa como diurético botánico noble, reduciendo la retención de líquidos.',
    recommendedRecipeId: 'rec-7'
  },
  {
    day: 5,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Eliminar endulzantes artificiales y bebidas gaseosas.',
    biankaQuote: 'Los polialcoholes y gas artificial fermentan creando una distensión abdominal dolorosa.',
    biankaAudioText: 'Hoy eliminamos por completo los refrescos y gaseosas. Coli Plus ya tiene un sabor delicioso y natural a manzana verde endulzado con stevia pura, sin calorías ni azúcares añadidos.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd5-t1', title: 'Cero Gaseosas ni Dulces', description: 'Reemplaza cualquier refresco por agua fresca con rodajas de pepino y limón.', type: 'nutrition', completed: false },
      { id: 'd5-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción en agua fresca para proteger tu colon.', type: 'supplement', completed: false },
      { id: 'd5-t3', title: 'Chequeo de Distensión', description: 'Observa si tu abdomen amanece más plano hoy.', type: 'wellness', completed: false },
      { id: 'd5-t4', title: 'Agua con Semillas Hidratadas', description: 'Acompaña tu hidratación diaria con regularidad.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El té verde en Coli Plus aporta catequinas que disminuyen la inflamación oxidativa celular.',
    recommendedRecipeId: 'rec-8'
  },
  {
    day: 6,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Cena temprana: al menos 2 horas antes de ir a dormir.',
    biankaQuote: 'Dormir con el estómago vacío permite que el complejo motor migratorio barra residuos.',
    biankaAudioText: 'Cenar al menos dos horas antes de acostarte permite que el intestino active su sistema de limpieza nocturno. Tu Coli Plus será el lubricante ideal para cerrar la noche.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua tibia o fresca 30 minutos antes de dormir.',
    tasks: [
      { id: 'd6-t1', title: 'Cena Temprana (antes de las 8pm)', description: 'Deja reposar tu digestión antes de tumbarte en la cama.', type: 'nutrition', completed: false },
      { id: 'd6-t2', title: 'Dosis Coli Plus Nocturna', description: '1 cucharada en agua fresca.', type: 'supplement', completed: false },
      { id: 'd6-t3', title: 'Masaje Abdominal en Sentido Horario', description: '5 minutos de automasaje circular suave siguiendo el colon.', type: 'wellness', completed: false },
      { id: 'd6-t4', title: 'Contador 8 Vasos de Agua', description: 'Completa la meta para mantener hidratado el bolo fecal.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El masaje en sentido horario sigue la anatomía del colon ascendente, transverso y descendente.',
    recommendedRecipeId: 'rec-5'
  },
  {
    day: 7,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Reseteo y Descompresión Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases, hinchazón y digestión pesada',
    dailyGoal: 'Celebrar el primer ciclo de 7 días: ¡tu abdomen ha despertado!',
    biankaQuote: '¡Felicitaciones! Has completado tu primera semana. Tu abdomen está más liviano y deshinchado.',
    biankaAudioText: '¡Qué gran logro! Cumpliste tu primera semana del protocolo. Ya debes sentir tu vientre mucho más plano, con menos ruidos molestos y una digestión más ligera. Mañana pasamos a la Fase 2 para nutrir y reparar tu mucosa intestinal.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd7-t1', title: 'Registro Semanal Completo', description: 'Registra tu nivel de desinflamación en el Daily Tracker.', type: 'wellness', completed: false },
      { id: 'd7-t2', title: 'Dosis Coli Plus Nocturna', description: 'Cierra tu primera fase con tu porción habitual.', type: 'supplement', completed: false },
      { id: 'd7-t3', title: 'Celebrar con Batido Verde', description: 'Prepara el Batido Verde Desinflamante con Coli Plus.', type: 'nutrition', completed: false },
      { id: 'd7-t4', title: 'Meta 2 Litros de Agua', description: 'Sostén la hidratación como cimiento innegociable.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El mucílago de linaza y chía forma una red gelatinosa que previene que los ácidos biliares irriten la pared del colon.',
    recommendedRecipeId: 'rec-2',
    isMilestone: true
  },

  // FASE 2: RESTAURACIÓN DE LA MUCOSA Y TRÁNSITO REGULAR (Días 8 - 14)
  {
    day: 8,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Aumentar el consumo de caldos ricos en minerales y aminoácidos.',
    biankaQuote: 'Reparar la barrera intestinal sella la permeabilidad y devuelve la tolerancia a las comidas.',
    biankaAudioText: 'Bienvenida a la Fase 2. Ahora que desinflamamos los gases agudos, vamos a nutrir y reparar la barrera celular de tu colon. Coli Plus aporta fibra soluble prebiótica para que tus células colónicas reciban nutrientes directos.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua fresca después de cenar.',
    tasks: [
      { id: 'd8-t1', title: 'Dosis Coli Plus Diaria', description: '1 porción en agua fresca 20 min tras cenar.', type: 'supplement', completed: false },
      { id: 'd8-t2', title: 'Caldo Reparador de Verduras', description: 'Prepara un caldo con zanahoria, apio, calabacín y cúrcuma.', type: 'nutrition', completed: false },
      { id: 'd8-t3', title: 'Meta de 8 Vasos de Agua', description: 'Mantén el flujo hídrico activo durante el día.', type: 'hydration', completed: false },
      { id: 'd8-t4', title: 'Postura de Descanso Digestivo', description: 'Eleva las piernas 10 minutos contra la pared al llegar a casa.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La espirulina y el té verde en Coli Plus aportan polifenoles antioxidantes que protegen la mucosa frente a toxinas.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 9,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Incorporar grasas saludables antiinflamatorias (aguacate y aceite de oliva).',
    biankaQuote: 'Las grasas monoinsaturadas lubrican el colon y reducen citoquinas proinflamatorias.',
    biankaAudioText: 'Hoy sumamos grasas buenas: medio aguacate o un chorrito de aceite de oliva extra virgen en crudo sobre tus verduras cocidas. Esto, junto a Coli Plus, crea evacuaciones tipo 4 en la Escala de Bristol.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd9-t1', title: 'Grasas Buenas en el Almuerzo', description: 'Añade 1 cucharadita de aceite de oliva crudo a tus vegetales.', type: 'nutrition', completed: false },
      { id: 'd9-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción con agua fresca antes de descansar.', type: 'supplement', completed: false },
      { id: 'd9-t3', title: '8 Vasos de Agua al Día', description: 'Distribuye sorbos generosos entre horas.', type: 'hydration', completed: false },
      { id: 'd9-t4', title: 'Revisión de Evacuación', description: 'Chequea en tu tracker si tu tránsito es más suave hoy.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El salvado de trigo en Coli Plus aporta fibra insoluble que incrementa el volumen fecal de forma controlada.',
    recommendedRecipeId: 'rec-6'
  },
  {
    day: 10,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Consumir avena reposada o chía hidratada para efecto mucilaginoso.',
    biankaQuote: 'La fibra gelatinosa actúa como un bálsamo calmante en las terminaciones nerviosas del intestino.',
    biankaAudioText: 'Día 10: Hoy preparamos avena reposada o pudín de chía suave. La textura en gel se complementa con la fórmula de Coli Plus para un tránsito regular y sin esfuerzo.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca o agregada a tu batido suave.',
    tasks: [
      { id: 'd10-t1', title: 'Desayuno Gelatinoso Protector', description: 'Avena cocida con canela o semillas hidratadas.', type: 'nutrition', completed: false },
      { id: 'd10-t2', title: 'Dosis Coli Plus', description: '1 porción en agua fresca nocturna.', type: 'supplement', completed: false },
      { id: 'd10-t3', title: 'Respiración Profunda 4-7-8', description: 'Inhala en 4, retén en 7 y exhala en 8 para desactivar el estrés digestivo.', type: 'wellness', completed: false },
      { id: 'd10-t4', title: 'Hidratación con Rodajas de Limón', description: 'Agua fresca con limón para mejorar la palatabilidad.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El noni presente en Coli Plus ayuda a modular los receptores de serotonina en el plexo entérico.',
    recommendedRecipeId: 'rec-9'
  },
  {
    day: 11,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Identificar y anotar cualquier sensibilidad alimentaria.',
    biankaQuote: 'Escuchar las señales sutiles de tu cuerpo es el mejor mapa para evitar recaídas.',
    biankaAudioText: 'Hoy abrimos la bitácora de sensaciones. Si un alimento te hace sentir hinchazón o pesadez dentro de las dos horas siguientes, anótalo. Tu microbiota está en pleno proceso de regeneración.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua fresca nocturna.',
    tasks: [
      { id: 'd11-t1', title: 'Bitácora de Síntomas', description: 'Anota en las notas del Daily Tracker si algún alimento te cayó pesado.', type: 'wellness', completed: false },
      { id: 'd11-t2', title: 'Dosis Coli Plus Nocturna', description: 'Tu porción habitual con 250ml de agua.', type: 'supplement', completed: false },
      { id: 'd11-t3', title: 'Hidratación 2 Litros', description: 'No olvides tus 8 vasos para una absorción perfecta.', type: 'hydration', completed: false },
      { id: 'd11-t4', title: 'Almuerzo Equilibrado', description: '1/2 plato vegetales cocidos, 1/4 proteína magra, 1/4 carbohidrato complejo.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'El gluten de trigo altamente procesado puede retrasar el tránsito en personas con colon irritable.',
    recommendedRecipeId: 'rec-10'
  },
  {
    day: 12,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Estiramientos suaves de torsión para facilitar el vaciado de gases.',
    biankaQuote: 'Las torsiones de columna exprimen suavemente el colon descendente facilitando la motilidad.',
    biankaAudioText: 'Dedica 5 minutos antes de dormir a hacer torsiones espinales en la cama. Esto estimula físicamente las curvas del colon para que los gases salgan sin dolor.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca antes de descansar.',
    tasks: [
      { id: 'd12-t1', title: 'Torsiones Espinales en Cama', description: 'Gira suavemente tus rodillas juntas hacia cada lado respirando hondo.', type: 'wellness', completed: false },
      { id: 'd12-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción disuelta en agua fresca.', type: 'supplement', completed: false },
      { id: 'd12-t3', title: 'Infusión Calmante', description: 'Tila, manzanilla o toronjil para inducir el descanso.', type: 'hydration', completed: false },
      { id: 'd12-t4', title: 'Cena sin Lácteos', description: 'Prueba leche de almendras o bebida de coco en vez de lácteos de vaca.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La lactosa es el azúcar fermentable que más distensión genera en adultos hispanos.',
    recommendedRecipeId: 'rec-11'
  },
  {
    day: 13,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Regular el horario de tus comidas para crear un reloj biológico digestivo.',
    biankaQuote: 'Tu intestino adora la rutina. Comer a las mismas horas sincroniza los jugos gástricos.',
    biankaAudioText: 'Intenta almorzar y cenar en una ventana horaria fija. El colon tiene su propio ritmo circadiano y cuando sabe qué esperar, las evacuaciones se vuelven un reloj suizo.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca después de cenar.',
    tasks: [
      { id: 'd13-t1', title: 'Horarios Fijos de Comida', description: 'Almuerza y cena con menos de 30 minutos de variación.', type: 'nutrition', completed: false },
      { id: 'd13-t2', title: 'Dosis Coli Plus Diaria', description: 'Tu cucharada en agua fresca 20 min tras cenar.', type: 'supplement', completed: false },
      { id: 'd13-t3', title: 'Monitoreo de Energía', description: 'Evalúa tu nivel de vitalidad en el tracker.', type: 'wellness', completed: false },
      { id: 'd13-t4', title: '8 Vasos de Agua al Día', description: 'Registra tu meta cumplida.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El noni presente en Coli Plus tiene propiedades botánicas que equilibran la flora nativa.',
    recommendedRecipeId: 'rec-3'
  },
  {
    day: 14,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Restauración de la Mucosa y Tránsito Regular',
    phaseSub: 'Días 8 al 14 • Fibra prebiótica + 8 superalimentos reparadores',
    dailyGoal: 'Cierre de Fase 2: Barrera intestinal protegida y tránsito fluido.',
    biankaQuote: 'Día 14: Dos semanas de fidelidad a tu bienestar. Tu colon ya no sufre las crisis de antes.',
    biankaAudioText: '¡Completaste dos semanas! Tu mucosa intestinal está recuperada, el tránsito es diario y la distensión es mínima. Mañana alcanzamos el Día 15, la mitad de tu viaje y el hito donde ColShopi celebra tu victoria.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd14-t1', title: 'Dosis Coli Plus Nocturna', description: 'Prepara tu cuerpo para la fase de repoblación bacteriana.', type: 'supplement', completed: false },
      { id: 'd14-t2', title: 'Chequeo de Evacuación Bristol', description: 'Verifica tu progreso hacia el tipo 4 (salchicha suave y lisa).', type: 'wellness', completed: false },
      { id: 'd14-t3', title: 'Meta de Hidratación Completa', description: '2 litros diarios sin excusas.', type: 'hydration', completed: false },
      { id: 'd14-t4', title: 'Cena Ligera de Pescado o Pollo', description: 'Acompañado de puré de zanahoria con aceite de oliva.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Las heces tipo 4 en la Escala de Bristol indican hidratación óptima y fibra balanceada.',
    recommendedRecipeId: 'rec-7',
    isMilestone: true
  },

  // FASE 3: REPOBLACIÓN Y EQUILIBRIO DE LA MICROBIOTA (Días 15 - 21)
  {
    day: 15,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: '¡HITO DÍA 15! Mitad de camino y recarga preventiva de Coli Plus.',
    biankaQuote: '¡Enhorabuena, hoy es el Día 15! Has transformado tu ritmo digestivo. En esta Fase 3, la fibra prebiótica de Coli Plus alimenta tus colonias benéficas.',
    biankaAudioText: '¡Felicidades hermosa, Día 15! Llegaste a la mitad del protocolo. Tu abdomen está plano, desinflamado y tu tránsito regularizado. En esta Fase 3 vamos a nutrir a tus bifidobacterias con prebióticos para producir butirato antiinflamatorio. Recuerda asegurar tu siguiente frasco en ColShopi para no pausar este hermoso impulso.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua fresca después de cenar.',
    tasks: [
      { id: 'd15-t1', title: '¡Celebrar el Hito del Día 15!', description: 'Felicítate por tu constancia y abre tu modal de progreso.', type: 'wellness', completed: false },
      { id: 'd15-t2', title: 'Dosis Coli Plus con Batido o Agua', description: '1 porción en batido verde o agua fresca.', type: 'supplement', completed: false },
      { id: 'd15-t3', title: 'Revisión de Frasco Coli Plus', description: 'Verifica cuántas porciones te quedan y pide tu pack con descuento VIP en ColShopi.', type: 'wellness', completed: false },
      { id: 'd15-t4', title: 'Meta 2 Litros de Agua', description: '8 vasos para sostener la fermentación sana.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El butirato generado por la fermentación de la fibra de Coli Plus es la principal fuente energética de tus colonocitos.',
    recommendedRecipeId: 'rec-1',
    isMilestone: true
  },
  {
    day: 16,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Sumar alimentos prebióticos naturales: plátano verde cocido o papa cocida y enfriada.',
    biankaQuote: 'El almidón resistente alimenta selectivamente a tus bacterias protectoras de la mucosa.',
    biankaAudioText: 'Un truco de oro: cocina papa o plátano verde y déjalo enfriar en la nevera antes de comerlo. Se convierte en almidón resistente que viaja intacto hasta tu colon para alimentar tu flora.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca 20 min después de cenar.',
    tasks: [
      { id: 'd16-t1', title: 'Almidón Resistente en tu Plato', description: 'Añade papa o batata cocida y reposada a tu comida.', type: 'nutrition', completed: false },
      { id: 'd16-t2', title: 'Dosis Coli Plus Diaria', description: '1 porción con agua fresca nocturna.', type: 'supplement', completed: false },
      { id: 'd16-t3', title: 'Caminata Consciente', description: '20 minutos caminando a buen ritmo para activar el colon.', type: 'wellness', completed: false },
      { id: 'd16-t4', title: 'Registro en Daily Tracker', description: 'Apunta tu índice de saciedad y ligereza.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El almidón resistente enfriado reduce el índice glucémico y nutre bacterias del filo Firmicutes y Bacteroidetes.',
    recommendedRecipeId: 'rec-12'
  },
  {
    day: 17,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Probar tomar Coli Plus en la mañana si tu tránsito ya está regularizado.',
    biankaQuote: 'Si tu colon ya evacúa puntual al despertar, la dosis matutina activa la saciedad y la energía.',
    biankaAudioText: 'Si tu estreñimiento ya se resolvió y tienes evacuaciones suaves por la mañana, puedes ensayar tomar tu porción de Coli Plus en ayunas disuelta en agua fresca o con un batido verde para potenciar la saciedad durante la jornada.',
    coliPlusIntakeGuide: '1 cucharada en ayunas o en la noche según tu preferencia de ritmo.',
    tasks: [
      { id: 'd17-t1', title: 'Ensayo de Dosis Matutina', description: 'Toma tu Coli Plus en ayunas con 250ml de agua si tu colon ya es regular.', type: 'supplement', completed: false },
      { id: 'd17-t2', title: 'Almuerzo Colorido y Diverso', description: 'Incluye al menos 4 colores vegetales distintos en tu plato.', type: 'nutrition', completed: false },
      { id: 'd17-t3', title: 'Hidratación 2 Litros', description: 'Suma 8 vasos con el contador del tracker.', type: 'hydration', completed: false },
      { id: 'd17-t4', title: 'Desconexión Digital 30 min antes de dormir', description: 'Permite que la melatonina relaje los esfínteres intestinales.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El 90% de la serotonina del cuerpo se sintetiza en las células enterocromafines del intestino.',
    recommendedRecipeId: 'rec-2'
  },
  {
    day: 18,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Cuidar la temperatura de tus bebidas: evitar agua helada con las comidas.',
    biankaQuote: 'El frío extremo coagula las grasas y ralentiza las enzimas digestivas en el estómago.',
    biankaAudioText: 'Evita tomar agua con hielo mientras almuerzas. El agua a temperatura ambiente o una infusión tibia mantiene las enzimas gástricas en su temperatura óptima de 37 grados.',
    coliPlusIntakeGuide: '1 cucharada en agua a temperatura ambiente.',
    tasks: [
      { id: 'd18-t1', title: 'Bebidas a Temperatura Ambiente', description: 'Di no al agua helada durante tu comida principal.', type: 'wellness', completed: false },
      { id: 'd18-t2', title: 'Dosis Coli Plus', description: 'Tu porción habitual con agua fresca.', type: 'supplement', completed: false },
      { id: 'd18-t3', title: '8 Vasos de Agua al Día', description: 'Bebe entre comidas y no en exceso durante el bocado.', type: 'hydration', completed: false },
      { id: 'd18-t4', title: 'Crema Digestiva de Calabacín', description: 'Cena ligera y reconfortante.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Las enzimas pancreáticas funcionan con máxima eficiencia a 36.5°C - 37.5°C.',
    recommendedRecipeId: 'rec-5'
  },
  {
    day: 19,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Incorporar hierbas carminativas en tus preparaciones (hinojo, cilantro, comino).',
    biankaQuote: 'Las hierbas aromáticas relajan el músculo liso gastrointestinal y expulsan el gas.',
    biankaAudioText: 'Hoy cocinamos con especias amigas del colon: comino, orégano, cilantro fresco o hinojo. Tienen aceites esenciales que calman los espasmos del intestino.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd19-t1', title: 'Cocinar con Especias Carminativas', description: 'Añade comino o hinojo a tu guiso de verduras.', type: 'nutrition', completed: false },
      { id: 'd19-t2', title: 'Dosis Coli Plus', description: '1 porción en agua fresca 20 min tras cenar.', type: 'supplement', completed: false },
      { id: 'd19-t3', title: 'Meta de 8 Vasos de Agua', description: 'Registra tus 2 litros en el contador interactivo.', type: 'hydration', completed: false },
      { id: 'd19-t4', title: 'Auto-Evaluación de Ánimo', description: 'Nota cómo una digestión liviana mejora tu energía y buen humor.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El anetol del hinojo inhibe la fermentación de bacterias productoras de gas metano.',
    recommendedRecipeId: 'rec-8'
  },
  {
    day: 20,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Optimizar el sueño reparador para regeneración celular intestinal.',
    biankaQuote: 'Mientras duermes en sueño profundo, tu mucosa colónica duplica su tasa de mitosis.',
    biankaAudioText: 'El descanso nocturno es medicina para el colon. Procura dormir al menos 7 horas continuas. Coli Plus actúa mientras descansas facilitando una mañana sin inflamación.',
    coliPlusIntakeGuide: '1 cucharada en 250ml de agua fresca antes de descansar.',
    tasks: [
      { id: 'd20-t1', title: 'Higiene del Sueño', description: 'Habitación fresca, oscura y sin televisión encendida.', type: 'wellness', completed: false },
      { id: 'd20-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción en agua fresca para nutrir tu flora.', type: 'supplement', completed: false },
      { id: 'd20-t3', title: 'Infusión de Manzanilla con Canela', description: 'Cálida y sedante para el sistema nervioso central.', type: 'hydration', completed: false },
      { id: 'd20-t4', title: 'Cena Liviana Proteica', description: 'Tortilla francesa con espinacas baby y calabacín.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Los ácidos grasos de cadena corta producidos por la fibra de Coli Plus promueven la calma mental.',
    recommendedRecipeId: 'rec-11'
  },
  {
    day: 21,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Eje intestino-cerebro, butirato y descanso profundo',
    dailyGoal: 'Cierre de Fase 3: Microbiota equilibrada y colon en armonía.',
    biankaQuote: '¡Tres semanas de victoria digestiva! Tus bacterias amigas han colonizado tu intestino.',
    biankaAudioText: '¡Completaste la Fase 3! Has transformado la ecología de tu intestino. Tu cuerpo ahora absorbe mejor los nutrientes y los gases son cosa del pasado. Mañana entramos a la recta final: la Fase 4 de consolidación y blindaje.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd21-t1', title: 'Chequeo Clínico Personal', description: 'Revisa tu gráfica de Recharts en el tracker.', type: 'wellness', completed: false },
      { id: 'd21-t2', title: 'Dosis Coli Plus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd21-t3', title: 'Meta de Hidratación Completa', description: '2 litros diarios registrados en el sistema.', type: 'hydration', completed: false },
      { id: 'd21-t4', title: 'Batido con Chía y Coli Plus', description: 'Prepara tu batido favorito del recetario.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La regularidad de 21 días crea la impronta neuroentérica necesaria para que el hábito se vuelva permanente.',
    recommendedRecipeId: 'rec-1',
    isMilestone: true
  },

  // FASE 4: MANTENIMIENTO, FIJACIÓN DE HÁBITOS Y BLINDAJE DIGESTIVO (Días 22 - 30)
  {
    day: 22,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Fijar el horario de toma de Coli Plus como un hábito innegociable.',
    biankaQuote: 'La excelencia no es un acto aislado, es el hábito diario que cuida tu templo interior.',
    biankaAudioText: 'Bienvenida a la última fase. Aquí blindamos lo aprendido para que nunca más vuelvas a sentirte atrapada por la distensión. Fija la toma de Coli Plus en tu momento favorito del día.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca en el horario que mejor te funcionó (mañana o noche).',
    tasks: [
      { id: 'd22-t1', title: 'Anclaje de Hábito Coli Plus', description: 'Toma tu dosis en el horario exacto que mejor te funcionó.', type: 'supplement', completed: false },
      { id: 'd22-t2', title: '2 Litros de Agua Diarios', description: 'Suma tus 8 vasos en el Daily Tracker.', type: 'hydration', completed: false },
      { id: 'd22-t3', title: 'Comida con Proteína Limpia', description: 'Pescado blanco o pollo sin salsas ultraprocesadas.', type: 'nutrition', completed: false },
      { id: 'd22-t4', title: 'Registro Somático', description: 'Registra tu energía y evacuación.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'Anclar un suplemento a un disparador diario (como cepillarte los dientes de noche) asegura 95% de adherencia.',
    recommendedRecipeId: 'rec-6'
  },
  {
    day: 23,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Manejo del estrés y respiración antes de cualquier evento tenso.',
    biankaQuote: 'Cuando tu mente se altera, tus intestinos se contraen. Respira hondo y protégelos.',
    biankaAudioText: 'El estrés agudo bloquea la digestión y detiene el peristaltismo. Cada vez que sientas tensión laboral o familiar, haz tres respiraciones diafragmáticas antes de comer.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca 20 min después de cenar.',
    tasks: [
      { id: 'd23-t1', title: 'Pausa de Respiración Consciente', description: '5 minutos de respiración diafragmática al medio día.', type: 'wellness', completed: false },
      { id: 'd23-t2', title: 'Dosis Coli Plus', description: 'Tu porción habitual con agua fresca.', type: 'supplement', completed: false },
      { id: 'd23-t3', title: 'Hidratación Continua', description: 'Ten tu botella de agua a la vista en tu lugar de trabajo.', type: 'hydration', completed: false },
      { id: 'd23-t4', title: 'Cena Antiinflamatoria', description: 'Crema de calabaza o zanahoria con semillas de calabaza tostadas.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'El nervio vago conecta el tronco encefálico con el colon; la exhalación prolongada estimula su tono parasimpático.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 24,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Aprender a comer fuera de casa sin inflamar tu abdomen.',
    biankaQuote: 'Salir a un restaurante no tiene por qué arruinar tu progreso digestivo.',
    biankaAudioText: 'Si sales a comer fuera: pide platos a la plancha o al horno, pide las salsas aparte y evita bebidas gaseosas o tragos dulces. Al regresar a casa, tu vaso de Coli Plus blindará tu noche.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca al llegar a casa.',
    tasks: [
      { id: 'd24-t1', title: 'Elección Inteligente en Restaurante', description: 'Pide aderezos al lado y vegetales cocidos.', type: 'nutrition', completed: false },
      { id: 'd24-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción en agua fresca para equilibrar el día.', type: 'supplement', completed: false },
      { id: 'd24-t3', title: 'Meta 8 Vasos de Agua', description: 'Bebe agua pura antes de salir de casa.', type: 'hydration', completed: false },
      { id: 'd24-t4', title: 'Paseo Nocturno Suave', description: '10 minutos caminando para ayudar a la propulsión.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El té verde y la alcachofa en Coli Plus ayudan al hígado a procesar excesos culinarios moderados.',
    recommendedRecipeId: 'rec-10'
  },
  {
    day: 25,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Planificar el mantenimiento continuo con Coli Plus.',
    biankaQuote: 'Estamos a solo 5 días de tu graduación. Proteger este resultado evita el efecto rebote.',
    biankaAudioText: '¡A solo 5 días de tu graduación! Para proteger este resultado y evitar el rebote, tomar medio o un frasco mensual de Coli Plus como mantenimiento continuo mantendrá tu abdomen plano y protegido para siempre.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca.',
    tasks: [
      { id: 'd25-t1', title: 'Dosis Coli Plus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd25-t2', title: 'Revisión del Paquete de Reorden', description: 'Verifica las opciones de reorden de ColShopi para asegurar tu mantenimiento.', type: 'wellness', completed: false },
      { id: 'd25-t3', title: 'Hidratación 2 Litros', description: '8 vasos completados en tu registro.', type: 'hydration', completed: false },
      { id: 'd25-t4', title: 'Almuerzo Rico en Fibra Limpia', description: 'Arroz integral o quinoa con salmón y espárragos.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Mantener un consumo regular de prebióticos previene la disbiosis bacteriana recurrente.',
    recommendedRecipeId: 'rec-7'
  },
  {
    day: 26,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Integrar Coli Plus en recetas culinarias frías o batidos.',
    biankaQuote: 'El agradable sabor a manzana verde hace que incorporarlo a tu vida sea un placer diario.',
    biankaAudioText: 'Hoy preparamos un batido verde con Coli Plus integrado. Gracias a su sabor natural a manzana verde, combina perfecto con hojas verdes y pepino sin necesidad de añadir azúcar.',
    coliPlusIntakeGuide: '1 cucharada mezclada directamente en batido verde matutino o en agua fresca.',
    tasks: [
      { id: 'd26-t1', title: 'Batido Verde con Coli Plus', description: 'Desayuno o merienda revitalizante y ligera.', type: 'nutrition', completed: false },
      { id: 'd26-t2', title: 'Dosis Coli Plus Integrada', description: '1 cucharada en tu preparación.', type: 'supplement', completed: false },
      { id: 'd26-t3', title: 'Caminata 20 minutos', description: 'Respira aire fresco y oxigena tus tejidos.', type: 'wellness', completed: false },
      { id: 'd26-t4', title: 'Contador de Agua al Día', description: '8 vasos completados.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'Consumir la fibra en un batido entero conserva la matriz vegetal que retarda el vaciamiento gástrico de forma saludable.',
    recommendedRecipeId: 'rec-2'
  },
  {
    day: 27,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Evaluar la vitalidad de tu piel y tu energía diurna.',
    biankaQuote: 'La piel es el espejo del colon. Cuando el intestino está limpio, tu rostro resplandece.',
    biankaAudioText: 'Mírate al espejo hoy. Nota la luminosidad de tu piel y la energía con la que te despiertas. Cuando liberas a tu colon de toxinas y desechos fermentados, todo tu cuerpo florece.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca nocturna.',
    tasks: [
      { id: 'd27-t1', title: 'Evaluación Somática Completa', description: 'Registra tu vitalidad en el Daily Tracker.', type: 'wellness', completed: false },
      { id: 'd27-t2', title: 'Dosis Coli Plus Nocturna', description: '1 porción en agua fresca antes de descansar.', type: 'supplement', completed: false },
      { id: 'd27-t3', title: '2 Litros de Agua Pura', description: '8 vasos bien distribuidos.', type: 'hydration', completed: false },
      { id: 'd27-t4', title: 'Cena Suave y Caliente', description: 'Sopa digestiva de verduras con trocitos de pollo.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'El eje intestino-piel está mediado por la reducción de endotoxinas bacterianas en el torrente sanguíneo.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 28,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Despedirse para siempre de los laxantes agresivos y químicos.',
    biankaQuote: 'Los laxantes convencionales generan dependencia; Coli Plus educa a tu colon con fibra viva.',
    biankaAudioText: 'Hoy celebramos tu libertad digestiva. Ya no dependes de pastillas irritantes ni laxantes químicos. Tu colon ha recuperado su tono muscular natural con los 8 superalimentos de Coli Plus.',
    coliPlusIntakeGuide: '1 cucharada en agua fresca diaria.',
    tasks: [
      { id: 'd28-t1', title: 'Desechar Laxantes Químicos', description: 'Di adiós a irritantes y abraza la nutrición botánica.', type: 'wellness', completed: false },
      { id: 'd28-t2', title: 'Dosis Coli Plus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd28-t3', title: 'Meta 8 Vasos de Agua', description: 'Hidratación consciente y constante.', type: 'hydration', completed: false },
      { id: 'd28-t4', title: 'Almuerzo Colon-Friendly', description: 'Elige tu receta preferida del recetario.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Los laxantes estimulantes irritan los plexos de Meissner y Auerbach provocando atonía del colon a largo plazo.',
    recommendedRecipeId: 'rec-12'
  },
  {
    day: 29,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: 'Víspera de graduación: preparar tu reporte de transformación.',
    biankaQuote: 'Mañana culmina tu ciclo inicial de 30 días. Tu transformación es una realidad palpable.',
    biankaAudioText: '¡Estamos en la víspera del gran día! Mañana completas oficialmente tu Guía de 30 Días con Coli Plus. Podrás descargar tu Diploma Oficial de Victoria Digestiva y tu informe médico de transformación. ¡Estoy inmensamente orgullosa de ti!',
    coliPlusIntakeGuide: '1 cucharada en agua fresca antes de dormir.',
    tasks: [
      { id: 'd29-t1', title: 'Dosis Coli Plus Nocturna', description: 'Última noche de la fase inicial de 30 días.', type: 'supplement', completed: false },
      { id: 'd29-t2', title: 'Revisión de Síntomas Iniciales', description: 'Recuerda cómo te sentías en el Día 1 comparado con hoy.', type: 'wellness', completed: false },
      { id: 'd29-t3', title: 'Meta 2 Litros de Agua', description: 'Hidratación sólida para cerrar con broche de oro.', type: 'hydration', completed: false },
      { id: 'd29-t4', title: 'Cena Festiva Saludable', description: 'Salmón o trucha con puré de espinacas y cúrcuma.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La neuroplasticidad entérica consolida el reflejo gastrocolónico matutino en un ciclo de 4 semanas.',
    recommendedRecipeId: 'rec-6'
  },
  {
    day: 30,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Mantenimiento, Fijación de Hábitos y Blindaje Digestivo',
    phaseSub: 'Días 22 al 30 • Fijación de hábitos, autonomía y graduación oficial',
    dailyGoal: '¡GRADUACIÓN OFICIAL! Diploma de Victoria Digestiva y Celebración.',
    biankaQuote: '¡Lo lograste campeona! 30 días de amor propio, constancia y victoria sobre la inflamación.',
    biankaAudioText: '¡Felicidades con todo mi corazón! Hoy completas con éxito tu Guía de 30 Días de ColiFem con Coli Plus. Tu abdomen está plano, tu microbiota equilibrada y tu tránsito regulado. En nombre de todo el equipo de ColShopi Tienda By Leps Digital y el mío propio, te otorgamos tu Diploma Oficial de Victoria Digestiva. ¡Sigue cuidándote con amor y Coli Plus!',
    coliPlusIntakeGuide: '1 cucharada de graduación en agua fresca o en tu batido verde favorito.',
    tasks: [
      { id: 'd30-t1', title: 'Descarga tu Diploma Oficial', description: 'Descarga tu certificado de Victoria Digestiva emitido por ColShopi y Bianka.', type: 'wellness', completed: false },
      { id: 'd30-t2', title: 'Dosis Coli Plus de Graduación', description: '1 porción en agua o batido verde.', type: 'supplement', completed: false },
      { id: 'd30-t3', title: 'Exportar Informe en PDF', description: 'Guarda tu bitácora de transformación somática.', type: 'wellness', completed: false },
      { id: 'd30-t4', title: 'Plan de Mantenimiento Continuo', description: 'Asegura tu frasco de Coli Plus para sostener tu bienestar.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'Mantener una dosis diaria o interdiaria de Coli Plus te asegura 3g de fibra prebiótica para blindarte contra recaídas.',
    recommendedRecipeId: 'rec-2',
    isMilestone: true
  }
];
