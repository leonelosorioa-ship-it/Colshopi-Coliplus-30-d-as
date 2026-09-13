import { DayPlan } from '../types';

export const COLIPLUS_30_DAYS: DayPlan[] = [
  // FASE 1: DESCOMPRESIÓN Y CALMA INTESTINAL (Días 1 - 7)
  {
    day: 1,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Iniciar el ritual de hidratación y primera dosis nocturna de ColiPlus.',
    marieQuote: 'Bienvenida a tu transformación digestiva. Hoy no cambiamos todo tu mundo, solo encendemos la chispa de la calma intestinal.',
    marieAudioText: 'Hola querida, soy Marié, tu mentora en salud digestiva. Hoy iniciamos tu protocolo ColiPlus de treinta días. Esta primera semana nos enfocamos en descomprimir tu abdomen y calmar los gases. Esta noche, treinta minutos antes de dormir, toma tu primera porción de ColiPlus disuelta en un vaso de agua fresca. ¡Estoy a tu lado en cada paso!',
    tasks: [
      { id: 'd1-t1', title: 'Dosis ColiPlus Nocturna', description: '1 cucharada en 250ml de agua fresca 30 min antes de acostarte.', type: 'supplement', completed: false },
      { id: 'd1-t2', title: 'Meta de Hidratación Básica', description: 'Beber al menos 2 litros de agua durante el día.', type: 'hydration', completed: false },
      { id: 'd1-t3', title: 'Cena Liviana Anti-Gases', description: 'Opta por una crema caliente o caldo suave sin lácteos.', type: 'nutrition', completed: false },
      { id: 'd1-t4', title: 'Activación del Nervio Vago', description: 'Haz 3 respiraciones profundas inflando el abdomen antes de cenar.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'Evita masticar chicle y bebidas con gas hoy para no tragar aire adicional que cause meteorismo.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 2,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Despertar con un vaso de agua tibia y observar la primera evacuación.',
    marieQuote: 'Tu cuerpo sabe cómo sanar si le das el agua y la fibra correcta sin forzarlo.',
    marieAudioText: 'Buen día. Al despertar, toma un vaso de agua tibia antes de cualquier café. Nota cómo la pitaya y linaza de ColiPlus anoche comenzaron a lubricar tus paredes intestinales.',
    tasks: [
      { id: 'd2-t1', title: 'Agua Tibia en Ayunas', description: '250ml de agua a temperatura tibia para estimular el reflejo gastrocólico.', type: 'hydration', completed: false },
      { id: 'd2-t2', title: 'Registro en Escala de Bristol', description: 'Anota en el tracker cómo fue tu visita al baño hoy.', type: 'wellness', completed: false },
      { id: 'd2-t3', title: 'Dosis Nocturna de ColiPlus', description: '1 porción en agua fresca antes de descansar.', type: 'supplement', completed: false },
      { id: 'd2-t4', title: 'Almuerzo sin Irritantes', description: 'Sin picantes, sin frituras y sin gaseosas.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La alcachofa presente en ColiPlus estimula la bilis natural para digerir grasas con mayor ligereza.',
    recommendedRecipeId: 'rec-1'
  },
  {
    day: 3,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'La regla de oro: masticar 20 veces por bocado.',
    marieQuote: 'El estómago no tiene dientes. La digestión empieza en la boca con tus enzimas salivares.',
    marieAudioText: 'Hoy nos enfocamos en tu masticación. Masticar cada bocado hasta que sea puré reduce en un 60% la formación de gases en el colon ascendente.',
    tasks: [
      { id: 'd3-t1', title: 'Masticación Consciente', description: 'Dedica al menos 20 minutos a tu almuerzo sin mirar el celular.', type: 'wellness', completed: false },
      { id: 'd3-t2', title: 'Hidratación con Infusión', description: 'Toma una infusión de manzanilla o menta después de almorzar.', type: 'hydration', completed: false },
      { id: 'd3-t3', title: 'Dosis ColiPlus', description: '1 cucharada en agua fresca antes de dormir.', type: 'supplement', completed: false },
      { id: 'd3-t4', title: 'Verduras Cocidas', description: 'Consume verduras cocidas al vapor en vez de ensaladas crudas duras.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Las verduras cocidas tienen paredes celulares ablandadas que no fatigan un colon en fase de recuperación.',
    recommendedRecipeId: 'rec-3'
  },
  {
    day: 4,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Caminata de 15 minutos post-comida para propulsión peristáltica.',
    marieQuote: 'El movimiento suave de tus piernas masajea directamente tus vísceras abdominales.',
    marieAudioText: 'Hola. Una caminata de 15 minutos a paso tranquilo tras el almuerzo acelera el vaciado gástrico y previene el reflujo.',
    tasks: [
      { id: 'd4-t1', title: 'Caminata Digestiva', description: '15 minutos caminando al aire libre tras el almuerzo.', type: 'wellness', completed: false },
      { id: 'd4-t2', title: 'Dosis ColiPlus Nocturna', description: 'Tu porción habitual con 250ml de agua fresca.', type: 'supplement', completed: false },
      { id: 'd4-t3', title: 'Meta 2 Litros de Agua', description: 'Lleva tu botella y bebe sorbos constantes.', type: 'hydration', completed: false },
      { id: 'd4-t4', title: 'Cena Suave con Proteína Magra', description: 'Pollo al limón o pescado al vapor con puré de ahuyama.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La flor de jamaica en ColiPlus tiene efecto diurético suave que ayuda a eliminar la retención líquida.',
    recommendedRecipeId: 'rec-7'
  },
  {
    day: 5,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Sustituir harinas ultraprocesadas por carbohidratos nobles.',
    marieQuote: 'Al eliminar harinas refinadas por 48 horas, las bacterias fermentadoras de gas pierden su combustible.',
    marieAudioText: 'Día cinco. Ya deberías sentir el abdomen menos tirante y más blando al tacto. Mantén tu regularidad con ColiPlus.',
    tasks: [
      { id: 'd5-t1', title: 'Cero Harinas Blancas', description: 'Elige papa cocida, batata o arroz integral en porción moderada.', type: 'nutrition', completed: false },
      { id: 'd5-t2', title: 'Dosis ColiPlus', description: '1 porción nocturna antes de acostarte.', type: 'supplement', completed: false },
      { id: 'd5-t3', title: 'Infusión Digestiva de Tarde', description: 'Agua de jamaica con hierbabuena fresca.', type: 'hydration', completed: false },
      { id: 'd5-t4', title: 'Registro en el Tracker', description: 'Califica tu distensión de 1 a 5.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El almidón enfriado de la papa o batata funciona como prebiótico natural en el intestino grueso.',
    recommendedRecipeId: 'rec-12'
  },
  {
    day: 6,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Apagar pantallas 45 minutos antes de dormir para relajar el sistema nervioso entérico.',
    marieQuote: 'Tu intestino tiene más de 100 millones de neuronas conectadas directamente con tu descanso.',
    marieAudioText: 'El estrés nocturno bloquea la motilidad intestinal. Desconéctate hoy de pantallas temprano y prepárate para cerrar la Fase 1 con éxito.',
    tasks: [
      { id: 'd6-t1', title: 'Desconexión Digital Nocturna', description: 'Sin pantallas 45 min antes de dormir.', type: 'wellness', completed: false },
      { id: 'd6-t2', title: 'Dosis ColiPlus', description: 'Tu ritual nocturno con agua fresca.', type: 'supplement', completed: false },
      { id: 'd6-t3', title: 'Agua con Gotas de Limón', description: '2 vasos entre comidas.', type: 'hydration', completed: false },
      { id: 'd6-t4', title: 'Cena Temprana (antes de las 8 pm)', description: 'Deja 2 horas y media de digestión antes de acostarte.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Cenar temprano permite que el complejo motor migrador limpie residuos bacterianos mientras duermes.',
    recommendedRecipeId: 'rec-8'
  },
  {
    day: 7,
    phaseNumber: 1,
    phaseTitle: 'Fase 1: Descompresión y Calma Intestinal',
    phaseSub: 'Días 1 al 7 • Alivio rápido de gases y distensión',
    dailyGoal: 'Primer hito semanal completado: evaluar desinflamación y consistencia.',
    marieQuote: '¡Felicitaciones! Has completado tu primera semana. Tu colon ya respira con mayor desahogo.',
    marieAudioText: '¡Felicidades por culminar tu primera semana! Tu abdomen ya debe sentirse mucho más desinflamado. Revisa tu gráfica de distensión en el tracker.',
    isMilestone: true,
    tasks: [
      { id: 'd7-t1', title: 'Chequeo Semanal de Progreso', description: 'Revisa tus días completados y compara tu energía del Día 1 con hoy.', type: 'wellness', completed: false },
      { id: 'd7-t2', title: 'Dosis ColiPlus Nocturna', description: 'Cierra tu primera fase con tu porción habitual.', type: 'supplement', completed: false },
      { id: 'd7-t3', title: 'Celebrar con Batido Verde', description: 'Prepara el Batido Verde Desinflamante con ColiPlus.', type: 'nutrition', completed: false },
      { id: 'd7-t4', title: '2.5L de Hidratación Total', description: 'Asegura buena fluidez de las fibras solubles.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'En 7 días, las vellosidades intestinales completan su primer ciclo de recambio celular superficial.',
    recommendedRecipeId: 'rec-1'
  },

  // FASE 2: REPARACIÓN DE LA MUCOSA DIGESTIVA (Días 8 - 14)
  {
    day: 8,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Introducir caldos de colágeno y glutamina para nutrir los enterocitos.',
    marieQuote: 'En la Fase 2 pasamos de desinflamar a reparar. Imagina sellar cada microfisura de tu pared intestinal.',
    marieAudioText: 'Bienvenida a la Fase 2. Ahora que bajamos el gas y la presión, vamos a nutrir las células de tu pared intestinal con caldos reconstructores y la fibra mucilaginosa de ColiPlus.',
    tasks: [
      { id: 'd8-t1', title: 'Dosis ColiPlus Diaria', description: '1 porción en agua o batido digestivo.', type: 'supplement', completed: false },
      { id: 'd8-t2', title: '1 Taza de Caldo Reparador', description: 'Consume una taza caliente del caldo de huesos y vegetales.', type: 'nutrition', completed: false },
      { id: 'd8-t3', title: 'Hidratación 2L con Electrolitos', description: 'Agrega una pizca minúscula de sal marina a tu primer litro.', type: 'hydration', completed: false },
      { id: 'd8-t4', title: 'Respiración de Diafragma 5 Minutos', description: 'Inhala en 4s, sostén en 2s, exhala en 6s.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La espirulina y el té verde en ColiPlus aportan polifenoles antioxidantes que protegen la mucosa frente a radicales libres.',
    recommendedRecipeId: 'rec-2'
  },
  {
    day: 9,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Semillas mucilaginosas en remojo para lubricar el tránsito.',
    marieQuote: 'El gel de chía y linaza crea un escudo natural que protege el epitelio intestinal de ácidos fuertes.',
    marieAudioText: 'Hoy preparamos un pudín de chía o avena reposada. La textura en gel de estas semillas se une a ColiPlus para una protección integral.',
    tasks: [
      { id: 'd9-t1', title: 'Pudín o Avena con Chía', description: 'Desayuno rico en mucílagos calmantes.', type: 'nutrition', completed: false },
      { id: 'd9-t2', title: 'Dosis ColiPlus Nocturna', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd9-t3', title: 'Agua Fría con Menta', description: 'Beber durante la tarde para calmar espasmos.', type: 'hydration', completed: false },
      { id: 'd9-t4', title: 'Pausa Anti-Estrés de Tarde', description: '10 minutos de estiramientos de espalda y caderas.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El mucílago de las semillas es la comida favorita de las bacterias que producen moco protector intestinal.',
    recommendedRecipeId: 'rec-11'
  },
  {
    day: 10,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Eliminar el azúcar blanco refinado por completo hoy.',
    marieQuote: 'El azúcar refinado debilita la unión de los enterocitos y alimenta hongos oportunistas en el colon.',
    marieAudioText: 'Día diez. Recuerda que ColiPlus no tiene azúcar añadida. Solo sabor natural a manzana verde y stevia pura sin calorías.',
    tasks: [
      { id: 'd10-t1', title: 'Día Cero Azúcar Agregada', description: 'Reemplaza dulces por una fruta baja en fructosa como arándanos o papaya.', type: 'nutrition', completed: false },
      { id: 'd10-t2', title: 'Dosis ColiPlus', description: '1 porción en agua o batido.', type: 'supplement', completed: false },
      { id: 'd10-t3', title: 'Registro de Energía en Tracker', description: 'Observa si tu energía se mantiene más estable sin picos de azúcar.', type: 'wellness', completed: false },
      { id: 'd10-t4', title: '2L de Agua Pura', description: 'Mantén tu hidratación constante.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'La pitaya y la alcachofa regulan la glucemia basal para evitar la ansiedad por comer dulce por la tarde.',
    recommendedRecipeId: 'rec-9'
  },
  {
    day: 11,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Aumentar grasas buenas: aceite de oliva virgen extra en crudo.',
    marieQuote: 'El ácido oleico del aceite de oliva crudo estimula la producción de colecistoquinina facilitando el vaciado biliar.',
    marieAudioText: 'Añade una cucharada de aceite de oliva crudo sobre tus verduras o caldo. Las grasas saludables son indispensables para reparar membranas celulares.',
    tasks: [
      { id: 'd11-t1', title: 'Aceite de Oliva en Crudo', description: '1 cucharada sobre tu almuerzo o ensalada cocida.', type: 'nutrition', completed: false },
      { id: 'd11-t2', title: 'Dosis ColiPlus Nocturna', description: 'Tu porción habitual con 250ml de agua.', type: 'supplement', completed: false },
      { id: 'd11-t3', title: 'Caminata Ligera 20 min', description: 'Mejora la circulación esplácnica hacia los órganos digestivos.', type: 'wellness', completed: false },
      { id: 'd11-t4', title: 'Infusión Digestiva Carminativa', description: 'Tómala tras la comida más abundante.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'Nunca cocines el aceite de oliva a temperaturas extremas; consúmelo crudo para conservar sus fenoles.',
    recommendedRecipeId: 'rec-10'
  },
  {
    day: 12,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Probar postura squatty/elevador de pies en el inodoro.',
    marieQuote: 'La postura fisiológica en cuclillas endereza el músculo puborrectal facilitando una expulsión sin esfuerzo.',
    marieAudioText: 'Un pequeño taburete bajo tus pies en el baño eleva tus rodillas a 35 grados. Esta posición alinea el recto y evita hemorroides y esfuerzo innecesario.',
    tasks: [
      { id: 'd12-t1', title: 'Postura Squatty con Banquito', description: 'Eleva tus pies 15cm al ir al baño para abrir el ángulo anorrectal.', type: 'wellness', completed: false },
      { id: 'd12-t2', title: 'Dosis ColiPlus Nocturna', description: '1 porción disuelta en agua fresca.', type: 'supplement', completed: false },
      { id: 'd12-t3', title: 'Meta 2.2L de Agua', description: 'Consumo constante a lo largo de la jornada.', type: 'hydration', completed: false },
      { id: 'd12-t4', title: 'Cena Antiinflamatoria', description: 'Pescado blanco o pollo con puré de batata.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Nunca postergues el deseo evacuatorio matutino; el colon aprende hábitos con horarios estables.',
    recommendedRecipeId: 'rec-7'
  },
  {
    day: 13,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Inspeccionar el tracker de Bristol: buscando Tipo 3 o Tipo 4.',
    marieQuote: 'Las heces tipo salchicha suave y lisa indican que tu mucosa está recuperando su barrera de agua.',
    marieAudioText: 'Estamos a un día de la mitad del protocolo. Revisa tu registro de Bristol. Pasar de heces duras o dispersas a consistencia suave es la mejor confirmación clínica de tu progreso.',
    tasks: [
      { id: 'd13-t1', title: 'Registro Detallado en Bristol', description: 'Verifica tu consistencia y anota observaciones.', type: 'wellness', completed: false },
      { id: 'd13-t2', title: 'Dosis ColiPlus Diaria', description: 'Tu cucharada en agua fresca.', type: 'supplement', completed: false },
      { id: 'd13-t3', title: 'Crema Digestiva de Ahuyama', description: 'Almuerzo reconfortante y bajo en fermentación.', type: 'nutrition', completed: false },
      { id: 'd13-t4', title: 'Hidratación con Jamaica y Limón', description: '1 litro preparado para la tarde.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El noni presente en ColiPlus tiene propiedades antibacterianas selectivas que equilibran la flora nativa.',
    recommendedRecipeId: 'rec-3'
  },
  {
    day: 14,
    phaseNumber: 2,
    phaseTitle: 'Fase 2: Reparación de la Mucosa Digestiva',
    phaseSub: 'Días 8 al 14 • Sellado de barrera y regeneración tisular',
    dailyGoal: 'Cierre de Fase 2: la pared intestinal está renovada.',
    marieQuote: 'En dos semanas has renovado completamente el revestimiento epitelial de tu tracto digestivo.',
    marieAudioText: '¡Completaste 14 días! Mañana llegamos a la mitad exacta del camino. Tu mucosa ya tiene la fuerza para recibir alimentos más variados sin reaccionar con hinchazón.',
    tasks: [
      { id: 'd14-t1', title: 'Dosis ColiPlus Nocturna', description: 'Prepara tu cuerpo para la fase de repoblación bacteriana.', type: 'supplement', completed: false },
      { id: 'd14-t2', title: '2L de Agua Mínimo', description: 'Mantiene la hidratación tisular.', type: 'hydration', completed: false },
      { id: 'd14-t3', title: 'Caldo de Huesos Nutritivo', description: 'Última dosis intensiva de colágeno de Fase 2.', type: 'nutrition', completed: false },
      { id: 'd14-t4', title: 'Auto-Evaluación de Síntomas', description: 'Compara tu pesadez inicial con tu sensación de ligereza hoy.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La barrera mucosa sana previene la entrada de endotoxinas LPS al torrente sanguíneo, reduciendo la niebla mental.',
    recommendedRecipeId: 'rec-2'
  },

  // FASE 3: REPOBLACIÓN Y EQUILIBRIO DE LA MICROBIOTA (Días 15 - 21)
  {
    day: 15,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: '¡HITO DÍA 15! Mitad de camino y recarga preventiva de ColiPlus.',
    marieQuote: '¡Llegaste a la mitad del protocolo! Tu microbiota está lista para florecer con tus bacterias amigas.',
    marieAudioText: '¡Enhorabuena, hoy es el Día 15! Has transformado tu ritmo digestivo. En esta Fase 3, la fibra prebiótica de ColiPlus alimenta tus colonias benéficas para que produzcan butirato antiinflamatorio. Recuerda asegurar tu siguiente frasco en ColShopi para no pausar este hermoso impulso.',
    isMilestone: true,
    tasks: [
      { id: 'd15-t1', title: '¡Celebrar Hito Día 15!', description: 'Descarga o revisa tu reporte intermedio de transformación.', type: 'wellness', completed: false },
      { id: 'd15-t2', title: 'Dosis ColiPlus con Batido', description: '1 porción en batido verde o agua fresca.', type: 'supplement', completed: false },
      { id: 'd15-t3', title: 'Revisión de Frasco ColiPlus', description: 'Verifica cuántas porciones te quedan y pide tu pack con descuento VIP.', type: 'wellness', completed: false },
      { id: 'd15-t4', title: 'Introducir Kéfir o Probióticos', description: 'Prueba la receta de Kéfir con Papaya de la sección de recetas.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'El 15% de tu microbiota cambia positivamente cada 48 horas con el estímulo constante de fibra soluble.',
    recommendedRecipeId: 'rec-9'
  },
  {
    day: 16,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Aumentar variedad de colores en el plato (polifenoles prebióticos).',
    marieQuote: 'Cada color en tu plato alimenta una familia bacteriana diferente en tu colon.',
    marieAudioText: 'Hoy busca incluir al menos 3 colores vegetales en tu comida: verde de hojas o calabacín, naranja de zanahoria y morado de arándanos o jamaica.',
    tasks: [
      { id: 'd16-t1', title: 'Plato Arcoíris Digestivo', description: 'Tres colores naturales en tu almuerzo.', type: 'nutrition', completed: false },
      { id: 'd16-t2', title: 'Dosis ColiPlus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd16-t3', title: 'Agua de Jamaica Digestiva', description: '1 litro a lo largo de la tarde.', type: 'hydration', completed: false },
      { id: 'd16-t4', title: 'Paseo al Aire Libre 20 min', description: 'El contacto con la naturaleza diversifica el microbioma.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La diversidad del microbioma se correlaciona directamente con la longevidad y la claridad mental.',
    recommendedRecipeId: 'rec-12'
  },
  {
    day: 17,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Probar tomar ColiPlus en la mañana si tu tránsito ya está regularizado.',
    marieQuote: 'Si ya vas al baño diariamente por la mañana, probar la dosis matutina te dará energía saciante todo el día.',
    marieAudioText: 'Si tu estreñimiento ya se resolvió y tienes evacuaciones Bristol 4 por la mañana, puedes ensayar tomar ColiPlus en ayunas para potenciar la saciedad y el metabolismo.',
    tasks: [
      { id: 'd17-t1', title: 'Prueba Dosis en Ayunas', description: '1 porción en agua fresca al levantarte.', type: 'supplement', completed: false },
      { id: 'd17-t2', title: 'Desayuno Proteico Amigable', description: 'Huevos pochados con aguacate y pan de masa madre.', type: 'nutrition', completed: false },
      { id: 'd17-t3', title: 'Meta 2 Litros de Agua', description: 'Acompaña la fibra para máxima ligereza.', type: 'hydration', completed: false },
      { id: 'd17-t4', title: 'Calificar Vitalidad en Tracker', description: 'Anota tu nivel de energía de 1 a 5.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La saciedad inducida por la linaza y chía reduce el deseo involuntario de picar carbohidratos simples a las 4 pm.',
    recommendedRecipeId: 'rec-6'
  },
  {
    day: 18,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Control de la inflamación inducida por estrés: respiración en caja.',
    marieQuote: 'Cuando tu mente se calma, tu intestino recibe el 25% del flujo sanguíneo que necesita para regenerarse.',
    marieAudioText: 'El cortisol alto destruye bifidobacterias protectoras. Practica 4 minutos de respiración cuadrada antes de almorzar hoy.',
    tasks: [
      { id: 'd18-t1', title: 'Respiración en Caja (4x4x4x4)', description: 'Inhala en 4s, retén en 4s, exhala en 4s, espera en 4s. Repite 4 veces.', type: 'wellness', completed: false },
      { id: 'd18-t2', title: 'Dosis ColiPlus', description: 'Tu porción habitual.', type: 'supplement', completed: false },
      { id: 'd18-t3', title: 'Infusión de Manzanilla y Anís', description: 'Calma el tracto digestivo tras el día laboral.', type: 'hydration', completed: false },
      { id: 'd18-t4', title: 'Cena Liviana de Ahuyama', description: 'Crema tibia sin lácteos.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'El 90% de la serotonina corporal se sintetiza en las células enterocromafines del intestino.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 19,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Reincorporación gradual y tolerada de legumbres remojadas.',
    marieQuote: 'Con una mucosa sana y microbiota activa, tu cuerpo puede tolerar pequeñas porciones de lentejas bien cocidas.',
    marieAudioText: 'Hoy puedes probar media taza de lentejas remojadas durante 24 horas y cocinadas con laurel y comino. Observa cómo responde tu vientre.',
    tasks: [
      { id: 'd19-t1', title: 'Prueba de Tolerancia Moderada', description: 'Lentejas o garbanzos remojados con comino para evitar gases.', type: 'nutrition', completed: false },
      { id: 'd19-t2', title: 'Dosis ColiPlus', description: '1 porción en agua fresca.', type: 'supplement', completed: false },
      { id: 'd19-t3', title: 'Hidratación Reforzada (2.3L)', description: 'Las legumbres requieren abundante agua para su fibra.', type: 'hydration', completed: false },
      { id: 'd19-t4', title: 'Tracker Post-Comida', description: 'Monitorea si hubo alguna distensión o si la digestión fue ligera.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El remojo prolongado de legumbres elimina los oligosacáridos que no podemos digerir, minimizando fermentaciones.',
    recommendedRecipeId: 'rec-1'
  },
  {
    day: 20,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Dormir al menos 7 horas de calidad: el descanso del colon.',
    marieQuote: 'Mientras duermes en fase REM profunda, la microbiota nocturna se multiplica y sincroniza tu reloj circadiano.',
    marieAudioText: 'Día 20. El sueño profundo es cuando el colon reabsorbe agua con calma y optimiza el pH bacteriano. Prepárate para cerrar la Fase 3.',
    tasks: [
      { id: 'd20-t1', title: 'Higiene de Sueño Óptima', description: 'Cuarto oscuro, fresco y ventilado para 7 horas de sueño reparador.', type: 'wellness', completed: false },
      { id: 'd20-t2', title: 'Smoothie Nocturno ColiPlus', description: 'Prepara el smoothie con manzanilla fría y ColiPlus.', type: 'supplement', completed: false },
      { id: 'd20-t3', title: '2L de Agua al Día', description: 'Último vaso 1 hora antes de dormir para no interrumpir el sueño.', type: 'hydration', completed: false },
      { id: 'd20-t4', title: 'Cena Temprana sin Grasas Pesadas', description: 'Proteína suave con vegetales al vapor.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Los ácidos grasos de cadena corta (AGCC) producidos por ColiPlus atraviesan la barrera hematoencefálica promoviendo calma.',
    recommendedRecipeId: 'rec-8'
  },
  {
    day: 21,
    phaseNumber: 3,
    phaseTitle: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    phaseSub: 'Días 15 al 21 • Cultivo de flora benéfica y bifidobacterias',
    dailyGoal: 'Cierre de Fase 3: tu microbiota tiene una nueva firma bacteriana.',
    marieQuote: 'Tres semanas de consistencia han reescrito el equilibrio microbiano que tenías hace años.',
    marieAudioText: '¡Completaste la semana 3! Ahora entramos a la recta final: la consolidación y blindaje de hábitos para que estos resultados duren toda tu vida.',
    isMilestone: true,
    tasks: [
      { id: 'd21-t1', title: 'Chequeo de 3 Semanas', description: 'Visualiza en tus gráficas la caída de la curva de inflamación.', type: 'wellness', completed: false },
      { id: 'd21-t2', title: 'Dosis ColiPlus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd21-t3', title: 'Bowl de Avena con Arándanos', description: 'Desayuno prebiótico de consolidación.', type: 'nutrition', completed: false },
      { id: 'd21-t4', title: '2.5L de Hidratación Total', description: 'Mantén el flujo óptimo.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'En 21 días, la señalización intestinal al cerebro reduce la reactividad emocional y la somatización del estrés en la panza.',
    recommendedRecipeId: 'rec-5'
  },

  // FASE 4: CONSOLIDACIÓN, HÁBITOS SOSTENIBLES Y BLINDAJE (Días 22 - 30)
  {
    day: 22,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Fijar el horario de toma de ColiPlus como un hábito innegociable.',
    marieQuote: 'Los hábitos automáticos liberan fuerza de voluntad. Tu colon ya sabe qué esperar cada mañana o noche.',
    marieAudioText: 'Bienvenida a la Fase 4, la etapa de blindaje. Estos últimos 9 días sellarán tu transformación para que el vientre plano y la digestión ligera sean tu nuevo estado natural.',
    tasks: [
      { id: 'd22-t1', title: 'Anclaje de Hábito ColiPlus', description: 'Toma tu dosis en el horario exacto que mejor te funcionó (mañana o noche).', type: 'supplement', completed: false },
      { id: 'd22-t2', title: 'Desayuno de Masa Madre y Huevo', description: 'Energía sostenida y digestión limpia.', type: 'nutrition', completed: false },
      { id: 'd22-t3', title: '2 Litros de Agua Diarios', description: 'Hábito de hidratación incorporado.', type: 'hydration', completed: false },
      { id: 'd22-t4', title: 'Registro en Tracker', description: 'Califica digestión (liviana/regular/pesada).', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El cerebro tarda aproximadamente 25 días en fijar una nueva sinapsis de hábito higiénico-dietético.',
    recommendedRecipeId: 'rec-6'
  },
  {
    day: 23,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Aprender a gestionar eventos sociales y comidas fuera de casa.',
    marieQuote: 'No se trata de vivir en una burbuja, sino de saber elegir lo mejor para tu colon sin culpa.',
    marieAudioText: 'Si sales a comer fuera, pide la proteína a la plancha, cambia la fritura por papa cocida y pide una infusión caliente de menta al final.',
    tasks: [
      { id: 'd23-t1', title: 'Estrategia Digestiva Fuera de Casa', description: 'Evita bebidas heladas durante comidas copiosas.', type: 'nutrition', completed: false },
      { id: 'd23-t2', title: 'Dosis ColiPlus', description: 'Tu porción habitual.', type: 'supplement', completed: false },
      { id: 'd23-t3', title: 'Caminata Ligera 15 min', description: 'Tras la comida principal.', type: 'wellness', completed: false },
      { id: 'd23-t4', title: 'Infusión Digestiva Carminativa', description: 'Tras la cena.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'Las bebidas con hielo contraen los vasos sanguíneos del estómago frenando la acción de los jugos gástricos.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 24,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'El masaje abdominal I-L-U para motilidad del colon.',
    marieQuote: 'El masaje circular en el sentido de las agujas del reloj acompaña la dirección natural del colon.',
    marieAudioText: 'Acuéstate boca arriba y con un poco de crema o aceite, masajea tu abdomen formando las letras I, L y U invertida desde la derecha hacia la izquierda.',
    tasks: [
      { id: 'd24-t1', title: 'Masaje Abdominal I-L-U (5 min)', description: 'Sigue el trayecto del colon ascendente, transverso y descendente.', type: 'wellness', completed: false },
      { id: 'd24-t2', title: 'Dosis ColiPlus Nocturna', description: '1 porción en agua fresca.', type: 'supplement', completed: false },
      { id: 'd24-t3', title: 'Crema de Ahuyama y Jengibre', description: 'Cena saciante y libre de pesadez.', type: 'nutrition', completed: false },
      { id: 'd24-t4', title: '2L de Agua Pura', description: 'Constancia diaria.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El masaje mecánico despierta el reflejo neuromuscular de evacuación en el colon sigmoide.',
    recommendedRecipeId: 'rec-3'
  },
  {
    day: 25,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Planificar el mantenimiento continuo con ColiPlus.',
    marieQuote: 'La salud digestiva no termina en el día 30; es un estilo de vida que mantienes con una dosis preventiva diaria.',
    marieAudioText: 'Estamos a solo 5 días de tu graduación. Para proteger este resultado y evitar el rebote, tomar medio o un frasco mensual de ColiPlus como mantenimiento te mantendrá protegida.',
    tasks: [
      { id: 'd25-t1', title: 'Dosis ColiPlus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd25-t2', title: 'Revisar Opciones de Reorden', description: 'Aprovecha las promociones 2x3 o 3x5 de ColShopi para tu mantenimiento.', type: 'wellness', completed: false },
      { id: 'd25-t3', title: 'Agua de Jamaica con Menta', description: '1 litro fresco durante la jornada.', type: 'hydration', completed: false },
      { id: 'd25-t4', title: 'Pescado al Papillote con Romero', description: 'Almuerzo antiinflamatorio rico en omega 3.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'La linaza molida y el salvado de trigo aportan lignanos que protegen el colon de cambios inflamatorios crónicos.',
    recommendedRecipeId: 'rec-10'
  },
  {
    day: 26,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Optimizar la absorción de micronutrientes.',
    marieQuote: 'Con vellosidades limpias, cada vitamina y mineral de tu comida se aprovecha al 100%.',
    marieAudioText: 'Nota cómo tu piel luce más luminosa y tu energía matutina es mucho más constante. Un colon limpio se refleja en todo tu cuerpo.',
    tasks: [
      { id: 'd26-t1', title: 'Batido Verde con ColiPlus', description: 'Desayuno o merienda revitalizante.', type: 'nutrition', completed: false },
      { id: 'd26-t2', title: 'Dosis ColiPlus Integrada', description: '1 cucharada en tu preparación.', type: 'supplement', completed: false },
      { id: 'd26-t3', title: '2L de Agua Pura', description: 'Asegura la fluidez.', type: 'hydration', completed: false },
      { id: 'd26-t4', title: 'Registro de Estado de Ánimo', description: 'Anota tu calma mental y vitalidad en el tracker.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'La reducción de inflamación intestinal disminuye la activación de citoquinas proinflamatorias como TNF-alfa e IL-6.',
    recommendedRecipeId: 'rec-1'
  },
  {
    day: 27,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Reflexión sobre los alimentos que antes te caían mal.',
    marieQuote: 'Muchos alimentos no eran tus enemigos; simplemente tu mucosa estaba demasiado irritada para procesarlos.',
    marieAudioText: 'Hoy evalúa cómo se siente tu digestión con alimentos que hace un mes te generaban gases dolorosos. El sellado epitelial marca una diferencia radical.',
    tasks: [
      { id: 'd27-t1', title: 'Comida Equilibrada y Variada', description: 'Disfruta sin miedo y masticando con serenidad.', type: 'nutrition', completed: false },
      { id: 'd27-t2', title: 'Dosis ColiPlus Nocturna', description: '1 porción en agua fresca.', type: 'supplement', completed: false },
      { id: 'd27-t3', title: 'Paseo al Aire Libre 20 min', description: 'Hábito diario de movimiento.', type: 'wellness', completed: false },
      { id: 'd27-t4', title: 'Infusión Digestiva Relajante', description: 'Prepara tu descanso nocturno.', type: 'hydration', completed: false }
    ],
    digestiveTip: 'El té verde y la alcachofa de ColiPlus colaboran en la salud metabólica y hepática general.',
    recommendedRecipeId: 'rec-4'
  },
  {
    day: 28,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Consistencia de evacuaciones: consolidar el Bristol 4.',
    marieQuote: 'La regularidad matutina sin esfuerzo es el mayor signo de libertad y salud que tu cuerpo te regala.',
    marieAudioText: 'A solo dos días del final. Comprueba tu consistencia de Bristol. Deberías estar en Tipo 3 o 4 de manera consistente sin necesidad de laxantes irritantes.',
    tasks: [
      { id: 'd28-t1', title: 'Confirmación Bristol 4 en Tracker', description: 'Anota la facilidad y forma de tu visita al baño.', type: 'wellness', completed: false },
      { id: 'd28-t2', title: 'Dosis ColiPlus Diaria', description: '1 porción con agua fresca.', type: 'supplement', completed: false },
      { id: 'd28-t3', title: '2L de Hidratación Constante', description: 'Tu hábito ya está consolidado.', type: 'hydration', completed: false },
      { id: 'd28-t4', title: 'Kéfir o Avena Reposada', description: 'Merienda prebiótica saciante.', type: 'nutrition', completed: false }
    ],
    digestiveTip: 'Los laxantes convencionales generan dependencia atónica; ColiPlus entrena a tu colon con fibra viva respetuosa.',
    recommendedRecipeId: 'rec-5'
  },
  {
    day: 29,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: 'Víspera de graduación: preparar tu testimonio y métricas finales.',
    marieQuote: 'Mañana cerramos tus 30 días oficiales. Siéntete inmensamente orgullosa de tu dedicación y amor propio.',
    marieAudioText: 'Mañana recibirás tu Certificado Oficial de Victoria Digestiva firmado por mí y ColShopi. Hoy tómate un momento para felicitarte por priorizar tu salud.',
    tasks: [
      { id: 'd29-t1', title: 'Dosis ColiPlus Nocturna', description: 'Última noche de la fase inicial de 30 días.', type: 'supplement', completed: false },
      { id: 'd29-t2', title: 'Cena Suave y Temprana', description: 'Caldo de vegetales o pescado al vapor.', type: 'nutrition', completed: false },
      { id: 'd29-t3', title: '2L de Agua al Día', description: 'Base incondicional de tu bienestar.', type: 'hydration', completed: false },
      { id: 'd29-t4', title: 'Momento de Gratitud y Calma', description: '5 minutos recordando cómo te sentías en el Día 1.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'El agradecimiento y las emociones positivas aumentan el tono vagal reduciendo la hipersensibilidad visceral.',
    recommendedRecipeId: 'rec-2'
  },
  {
    day: 30,
    phaseNumber: 4,
    phaseTitle: 'Fase 4: Consolidación y Blindaje',
    phaseSub: 'Días 22 al 30 • Vientre plano y hábitos para toda la vida',
    dailyGoal: '¡DÍA 30: GRADUACIÓN Y VICTORIA DIGESTIVA! Descarga tu Diploma.',
    marieQuote: '¡Lo lograste! 30 días de constancia que transformaron tu colon, tu digestión y tu vitalidad diaria.',
    marieAudioText: '¡Felicidades, campeona! Hoy completas con éxito tu Protocolo de 30 Días con ColiPlus. Tu abdomen está desinflamado, tu microbiota equilibrada y tu tránsito regulado. En nombre de todo el equipo de ColShopi y el mío propio, te otorgamos tu Diploma Oficial de Victoria Digestiva. ¡Sigue cuidándote con amor y ColiPlus!',
    isMilestone: true,
    tasks: [
      { id: 'd30-t1', title: '¡Completar Día 30 y Celebrar!', description: 'Festeja con confeti y descarga tu Diploma Oficial en PDF.', type: 'wellness', completed: false },
      { id: 'd30-t2', title: 'Dosis ColiPlus de Graduación', description: '1 porción en agua o batido verde.', type: 'supplement', completed: false },
      { id: 'd30-t3', title: 'Descarga del Informe Completo', description: 'Guarda tu PDF con gráficas de evolución de 30 días.', type: 'wellness', completed: false },
      { id: 'd30-t4', title: 'Plan de Mantenimiento Continuo', description: 'Asegura tu frasco de ColiPlus para sostener tu bienestar.', type: 'wellness', completed: false }
    ],
    digestiveTip: 'Mantener una dosis diaria o interdiaria de ColiPlus te asegura 3g de fibra prebiótica para blindarte contra recaídas.',
    recommendedRecipeId: 'rec-1'
  }
];
