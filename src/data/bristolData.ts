import { BristolTypeInfo } from '../types';

export const BRISTOL_SCALE: BristolTypeInfo[] = [
  {
    type: 1,
    title: 'Tipo 1: Terrones duros separados',
    description: 'Trozos duros separados, como nueces pequeñas o bolitas de oveja. Dificultad severa para evacuar.',
    status: 'Estreñimiento severo',
    color: '#991B1B',
    recommendation: 'Aumenta tu ingesta de agua a 2.5L hoy y toma tu porción de ColiPlus en agua tibia antes de dormir. Añade una cucharadita de aceite de oliva crudo al almuerzo.'
  },
  {
    type: 2,
    title: 'Tipo 2: Forma de salchicha grumosa',
    description: 'Forma alargada pero con bultos y superficie fragmentada. Evacuación con esfuerzo.',
    status: 'Estreñimiento leve',
    color: '#C2410C',
    recommendation: 'La fibra soluble de ColiPlus (linaza y pitaya) comenzará a hidratar el bolo fecal. Camina 15 minutos después de almorzar.'
  },
  {
    type: 3,
    title: 'Tipo 3: Salchicha con grietas superficiales',
    description: 'Forma cilíndrica con pequeñas grietas en la superficie. Evacuación normal con leve esfuerzo.',
    status: 'Ideal y saludable',
    color: '#059669',
    recommendation: '¡Muy buen avance! Estás muy cerca de la consistencia óptima. Mantén tu rutina de hidratación constante.'
  },
  {
    type: 4,
    title: 'Tipo 4: Salchicha suave y lisa',
    description: 'Forma de serpiente o salchicha dorada, lisa, elástica y fácil de expulsar sin esfuerzo ni residuos.',
    status: 'Ideal y saludable',
    color: '#10B981',
    recommendation: '¡El estándar de oro de la salud intestinal! Tu microbiota y mucosa están en equilibrio sinérgico.'
  },
  {
    type: 5,
    title: 'Tipo 5: Trozos blandos con bordes claros',
    description: 'Porciones suaves separadas que se expulsan fácilmente pero carecen de forma sólida consistente.',
    status: 'Tendencia a diarrea',
    color: '#D97706',
    recommendation: 'Reduce temporalmente frutas crudas muy maduras y toma ColiPlus con una porción de avena cocida o arroz integral para dar volumen al bolo.'
  },
  {
    type: 6,
    title: 'Tipo 6: Trozos pastosos o esponjosos',
    description: 'Bordes desgarrados, heces esponjosas y acuosas. Sensación de irritación intestinal.',
    status: 'Inflamación o urgencia',
    color: '#EA580C',
    recommendation: 'Toma el caldo antiinflamatorio de la sección de recetas, evita lácteos y frituras por 48 horas.'
  },
  {
    type: 7,
    title: 'Tipo 7: Acuosa sin partes sólidas',
    description: 'Totalmente líquida. Evacuación explosiva o urgente.',
    status: 'Inflamación o urgencia',
    color: '#DC2626',
    recommendation: 'Hidratación con suero o agua con limón y pizca de sal marina. Si persiste por más de 3 días consulta a tu médico.'
  }
];
