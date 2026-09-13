import express from 'express';
import path from 'path';
import webpush from 'web-push';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// VAPID keys setup for Web Push
// Generate or use deterministic fallback keys
let vapidKeys: { publicKey: string; privateKey: string };
try {
  vapidKeys = webpush.generateVAPIDKeys();
} catch (e) {
  // Fallback keys if generation fails
  vapidKeys = {
    publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5NMPH8',
    privateKey: 'private-fallback-key-placeholder'
  };
}

try {
  webpush.setVapidDetails(
    'mailto:contacto@colshopi.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
} catch (err) {
  console.warn('VAPID setup warning (will operate in dev notification mode):', err);
}

// In-Memory Database with pre-seeded realistic users
interface UserRecord {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  ageRange: string;
  accessCode: string;
  digestiveAngle: string;
  symptoms: string[];
  currentDay: number;
  completedDays: number[];
  checkIns: Record<number, {
    date: string;
    tookSupplement: boolean;
    waterLiters: number;
    antiInflammatoryMeal: boolean;
    bloatingScore: number; // 1-5
    energyScore: number; // 1-5
    digestionType: 'liviana' | 'regular' | 'pesada';
    bristolType: number; // 1-7
    notes?: string;
  }>;
  pushSubscription?: webpush.PushSubscription | null;
  createdAt: string;
  lastActive: string;
}

const usersDb: Map<string, UserRecord> = new Map();

// Seed initial realistic users for demo & admin testing
const seedUsers: UserRecord[] = [
  {
    id: 'VIP-7041',
    name: 'Carolina Montoya',
    whatsapp: '+57 312 456 7890',
    email: 'carolina.m@gmail.com',
    ageRange: '35-44',
    accessCode: 'COLI30',
    digestiveAngle: 'Inflamación constante y gases',
    symptoms: ['Distensión abdominal después de comer', 'Gases dolorosos', 'Pesadez estomacal'],
    currentDay: 16,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    checkIns: {
      1: { date: '2026-08-28', tookSupplement: true, waterLiters: 2.1, antiInflammatoryMeal: true, bloatingScore: 5, energyScore: 2, digestionType: 'pesada', bristolType: 1 },
      7: { date: '2026-09-03', tookSupplement: true, waterLiters: 2.2, antiInflammatoryMeal: true, bloatingScore: 3, energyScore: 3, digestionType: 'regular', bristolType: 3 },
      14: { date: '2026-09-10', tookSupplement: true, waterLiters: 2.4, antiInflammatoryMeal: true, bloatingScore: 2, energyScore: 4, digestionType: 'liviana', bristolType: 4 },
      15: { date: '2026-09-11', tookSupplement: true, waterLiters: 2.5, antiInflammatoryMeal: true, bloatingScore: 1, energyScore: 5, digestionType: 'liviana', bristolType: 4 }
    },
    pushSubscription: null,
    createdAt: '2026-08-28T10:00:00Z',
    lastActive: '2026-09-12T14:30:00Z'
  },
  {
    id: 'VIP-8912',
    name: 'Martha Liliana Gómez',
    whatsapp: '+57 300 892 1144',
    email: 'marthagomez@hotmail.com',
    ageRange: '45-54',
    accessCode: 'VIP2026',
    digestiveAngle: 'Estreñimiento severo',
    symptoms: ['Evacuaciones cada 3 días', 'Heces secas y duras', 'Dolor cólico'],
    currentDay: 8,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
    checkIns: {
      1: { date: '2026-09-05', tookSupplement: true, waterLiters: 1.8, antiInflammatoryMeal: true, bloatingScore: 4, energyScore: 2, digestionType: 'pesada', bristolType: 2 },
      7: { date: '2026-09-11', tookSupplement: true, waterLiters: 2.2, antiInflammatoryMeal: true, bloatingScore: 2, energyScore: 4, digestionType: 'liviana', bristolType: 4 }
    },
    pushSubscription: null,
    createdAt: '2026-09-05T08:15:00Z',
    lastActive: '2026-09-12T16:00:00Z'
  },
  {
    id: 'VIP-3105',
    name: 'Andrés Felipe Restrepo',
    whatsapp: '+57 318 644 9012',
    email: 'andres.restrepo@outlook.com',
    ageRange: '25-34',
    accessCode: 'COLI30',
    digestiveAngle: 'Digestión pesada e intolerancias',
    symptoms: ['Somnolencia postprandial', 'Intolerancia a lácteos y grasas', 'Sensación de nudo estomacal'],
    currentDay: 4,
    completedDays: [1, 2, 3, 4],
    checkIns: {
      1: { date: '2026-09-09', tookSupplement: true, waterLiters: 2.0, antiInflammatoryMeal: true, bloatingScore: 4, energyScore: 3, digestionType: 'pesada', bristolType: 5 },
      4: { date: '2026-09-12', tookSupplement: true, waterLiters: 2.1, antiInflammatoryMeal: true, bloatingScore: 2, energyScore: 4, digestionType: 'liviana', bristolType: 4 }
    },
    pushSubscription: null,
    createdAt: '2026-09-09T11:20:00Z',
    lastActive: '2026-09-12T18:00:00Z'
  }
];

seedUsers.forEach(u => usersDb.set(u.id, u));

// Orders tracking DB
interface OrderRecord {
  orderId: string;
  userId: string;
  userName: string;
  whatsapp: string;
  packName: string;
  quantity: number;
  totalCOP: number;
  bonusGift: string;
  status: 'Iniciado por WhatsApp' | 'Confirmado' | 'Entregado';
  createdAt: string;
}

const ordersDb: OrderRecord[] = [
  {
    orderId: 'ORD-9821',
    userId: 'VIP-7041',
    userName: 'Carolina Montoya',
    whatsapp: '+57 312 456 7890',
    packName: 'Pack 2 Frascos (Paga 2 Lleva 3)',
    quantity: 3,
    totalCOP: 151800,
    bonusGift: 'Guía Antigases FODMAP + Envío Gratis',
    status: 'Iniciado por WhatsApp',
    createdAt: '2026-09-11T16:20:00Z'
  }
];

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), totalUsers: usersDb.size });
});

// Push VAPID Public Key
app.get('/api/push/vapid-public-key', (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

// Push Subscribe
app.post('/api/push/subscribe', (req, res) => {
  const { userId, subscription } = req.body;
  if (!userId || !subscription) {
    return res.status(400).json({ error: 'Faltan parámetros userId o subscription' });
  }

  const user = usersDb.get(userId);
  if (user) {
    user.pushSubscription = subscription;
    user.lastActive = new Date().toISOString();
  }

  res.json({ success: true, message: 'Dispositivo suscrito a notificaciones Web Push exitosamente.' });
});

// Push Send (Admin Console or Trigger)
app.post('/api/push/send', async (req, res) => {
  const { title, body, icon, url, filterPhase, filterAngle, targetUserId } = req.body;

  let targetUsers = Array.from(usersDb.values()).filter(u => u.pushSubscription);

  if (targetUserId) {
    targetUsers = targetUsers.filter(u => u.id === targetUserId);
  } else {
    if (filterAngle && filterAngle !== 'all') {
      targetUsers = targetUsers.filter(u => u.digestiveAngle === filterAngle);
    }
    if (filterPhase && filterPhase !== 'all') {
      const phaseNum = parseInt(filterPhase);
      targetUsers = targetUsers.filter(u => {
        const userPhase = Math.ceil(u.currentDay / 7.5);
        return userPhase === phaseNum;
      });
    }
  }

  const payload = JSON.stringify({
    title: title || 'ColiPlus 30D - Mensaje de Marié',
    body: body || 'Recuerda tu protocolo de bienestar digestivo y tu toma de ColiPlus.',
    icon: icon || '/icon-192.png',
    data: { url: url || '/' }
  });

  const results = await Promise.allSettled(
    targetUsers.map(u => {
      if (u.pushSubscription) {
        return webpush.sendNotification(u.pushSubscription, payload);
      }
      return Promise.reject('No subscription');
    })
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  res.json({
    success: true,
    totalTargeted: targetUsers.length,
    successful,
    failed,
    message: `Notificaciones enviadas. Exitosas: ${successful}, Fallidas: ${failed}`
  });
});

// Admin PIN validation
app.post('/api/admin/login', (req, res) => {
  const { email, pin } = req.body;
  const validEmail = 'contacto@colshopi.com';
  const validPin = '250816';

  if ((email?.toLowerCase() === validEmail || email?.includes('admin')) && pin === validPin) {
    return res.json({
      success: true,
      role: 'SUPER_ADMIN',
      token: 'ADMIN-AUTH-COLSHOPI-2026',
      user: { email: validEmail, name: 'Administrador ColShopi' }
    });
  }

  res.status(401).json({ error: 'Credenciales inválidas. Verifica tu correo y el PIN de 6 dígitos.' });
});

// Get all users (Admin)
app.get('/api/users', (req, res) => {
  const list = Array.from(usersDb.values()).map(u => ({
    ...u,
    hasPush: !!u.pushSubscription
  }));
  res.json({ users: list });
});

// Get or register user
app.post('/api/users', (req, res) => {
  const data = req.body;
  const id = data.id || `VIP-${Math.floor(1000 + Math.random() * 9000)}`;

  const existing = usersDb.get(id);
  const now = new Date().toISOString();

  const user: UserRecord = {
    id,
    name: data.name || 'Usuaria ColiPlus',
    whatsapp: data.whatsapp || '+57 300 000 0000',
    email: data.email || 'cliente@colshopi.com',
    ageRange: data.ageRange || '25-34',
    accessCode: data.accessCode || 'COLI30',
    digestiveAngle: data.digestiveAngle || 'Inflamación constante y gases',
    symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
    currentDay: data.currentDay || existing?.currentDay || 1,
    completedDays: Array.isArray(data.completedDays) ? data.completedDays : (existing?.completedDays || [1]),
    checkIns: data.checkIns || existing?.checkIns || {},
    pushSubscription: existing?.pushSubscription || null,
    createdAt: existing?.createdAt || now,
    lastActive: now
  };

  usersDb.set(id, user);
  res.json({ success: true, user });
});

// Update day progress
app.post('/api/users/:id/progress', (req, res) => {
  const { id } = req.params;
  const { day, checkIn, complete } = req.body;

  const user = usersDb.get(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (day) {
    if (complete && !user.completedDays.includes(day)) {
      user.completedDays.push(day);
      user.completedDays.sort((a, b) => a - b);
    }
    if (day > user.currentDay) {
      user.currentDay = day;
    }
    if (checkIn) {
      user.checkIns[day] = checkIn;
    }
  }
  user.lastActive = new Date().toISOString();

  res.json({ success: true, user });
});

// Orders creation
app.post('/api/orders', (req, res) => {
  const { userId, userName, whatsapp, packName, quantity, totalCOP, bonusGift } = req.body;
  const newOrder: OrderRecord = {
    orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: userId || 'GUEST',
    userName: userName || 'Cliente ColShopi',
    whatsapp: whatsapp || '+57 300 000 0000',
    packName: packName || 'Pack ColiPlus',
    quantity: quantity || 1,
    totalCOP: totalCOP || 89000,
    bonusGift: bonusGift || 'Obsequio ColShopi',
    status: 'Iniciado por WhatsApp',
    createdAt: new Date().toISOString()
  };

  ordersDb.unshift(newOrder);
  res.json({ success: true, order: newOrder });
});

// Get orders (Admin)
app.get('/api/orders', (req, res) => {
  res.json({ orders: ordersDb });
});

// Admin Metrics
app.get('/api/admin/metrics', (req, res) => {
  const users = Array.from(usersDb.values());
  const totalUsers = users.length;
  const pushSubscribers = users.filter(u => !!u.pushSubscription).length;

  const avgDaysCompleted = totalUsers > 0
    ? (users.reduce((acc, u) => acc + u.completedDays.length, 0) / totalUsers).toFixed(1)
    : 0;

  const retentionDay15 = users.filter(u => u.completedDays.includes(15)).length;
  const retentionRate = totalUsers > 0
    ? Math.round((retentionDay15 / totalUsers) * 100)
    : 85;

  const angleDistribution: Record<string, number> = {};
  users.forEach(u => {
    angleDistribution[u.digestiveAngle] = (angleDistribution[u.digestiveAngle] || 0) + 1;
  });

  res.json({
    totalUsers,
    pushSubscribers,
    avgDaysCompleted: Number(avgDaysCompleted),
    retentionRate,
    angleDistribution,
    recentOrdersCount: ordersDb.length
  });
});

// Chatbot endpoint with Marié (Gemini or expert protocol fallback)
app.post('/api/chat', async (req, res) => {
  const { message, userProfile, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  // Check if Gemini API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
Eres Marié, la mentora y nutricionista especialista en microbiota, salud intestinal y el eje intestino-cerebro del programa "ColiPlus 30D" de la marca ColShopi By Leps Digital.
El producto ColiPlus es un alimento en polvo de 450g (sabor natural a manzana verde, registro INVIMA NSA-0012423-2022, 34 kcal por porción, 3g de fibra prebiótica soluble e insoluble, sin azúcar añadida) formulado con 8 superalimentos: linaza molida, salvado de trigo, noni, pitaya, flor de jamaica, alcachofa, semillas de chía, espirulina y té verde.
Modo de uso recomendado:
- Para regular el tránsito matutino y desinflamar durante la noche: Tomar 1 cucharada dosificadora en un vaso de agua fresca o infusión tibia 30 minutos antes de dormir.
- Para energía metabólica y control de ansiedad por comer: Tomar en ayunas al levantarse.
- Se puede mezclar en batidos o avena.
- Es clave acompañarlo con al menos 2 litros de agua diarios para que la fibra soluble haga su efecto mucilaginoso lubricante.
Perfil de la usuaria actual:
Nombre: ${userProfile?.name || 'Amiga'}
Ángulo digestivo principal: ${userProfile?.digestiveAngle || 'Inflamación y gases'}
Día del programa: Día ${userProfile?.currentDay || 1}

Instrucciones:
1. Responde siempre con tono cálido, empático, profesional y motivador en español neutro/latinoamericano con acento cercano de Colombia ("Hola linda", "Hola hermosa", o "Hola ${userProfile?.name || ''}").
2. Brinda consejos concretos: tiempos de toma, respiración diafragmática para el nervio vago, combinación de comidas bajas en FODMAPs, alimentos recomendados (calabaza, jengibre, papaya, kéfir) y qué evitar en crisis.
3. Máximo 2-3 párrafos concisos y un consejo de acción claro.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nPregunta de la usuaria: ${message}` }] }
        ]
      });

      const reply = response.text || 'Hola querida, recuerda que tomar tu ColiPlus en agua fresca y respirar profundamente antes de comer ayuda a activar tu nervio vago para una digestión perfecta.';
      return res.json({ reply });
    } catch (geminiError) {
      console.warn('Gemini API call failed, using clinical digestive knowledgebase fallback:', geminiError);
    }
  }

  // Clinical Knowledgebase Fallback for Marié
  const lower = message.toLowerCase();
  let reply = '';

  if (lower.includes('hora') || lower.includes('momento') || lower.includes('cuándo') || lower.includes('tomar') || lower.includes('dosis')) {
    reply = `¡Hola querida! Lo ideal es tomar tu porción de ColiPlus (1 cucharada en 250ml de agua) en dos momentos clave según tu objetivo:
1. **En la noche (30 minutos antes de dormir):** Es ideal si sufres de estreñimiento o pesadez matutina. La linaza, pitaya y chía trabajan mientras duermes y facilitan una evacuación suave y predecible al despertar.
2. **En ayunas:** Si tu prioridad es activar el metabolismo y calmar la ansiedad por picoteo durante el día. ¡Asegúrate de beber tus 2L de agua durante la jornada!`;
  } else if (lower.includes('gas') || lower.includes('inflam') || lower.includes('hinch') || lower.includes('dolor')) {
    reply = `Te entiendo perfectamente, esa distensión puede ser muy incómoda. En este momento te recomiendo:
1. Preparar una infusión tibia de manzanilla con un toque de jengibre o anís estrellado.
2. Realizar 5 minutos de respiración diafragmática lenta (inhalar en 4 segundos inflando el abdomen y exhalar en 6 segundos) para calmar el nervio vago.
3. Evita bebidas carbonatadas, chicles, legumbres mal cocidas o lácteos por hoy. ColiPlus aportará los prebióticos que tu flora necesita para fermentar adecuadamente sin exceso de gas.`;
  } else if (lower.includes('leche') || lower.includes('jugo') || lower.includes('mezclar')) {
    reply = `¡Claro que sí! ColiPlus tiene un suave y delicioso sabor a manzana verde natural. Puedes disolverlo perfectamente en agua fresca, en leche vegetal (almendras o coco sin azúcar), o agregarlo a tu batido verde matutino con espinaca y pepino. Solo recuerda tomarlo inmediatamente después de mezclar para disfrutar de su textura ligera.`;
  } else if (lower.includes('bristol') || lower.includes('evacua') || lower.includes('baño') || lower.includes('diarrea') || lower.includes('estreñ')) {
    reply = `La escala de Bristol es nuestra mejor brújula digestiva:
- **Tipos 1 y 2 (bolitas duras o grumos):** Indican tránsito lento y deshidratación de la materia fecal. Necesitas aumentar agua y tu ColiPlus nocturno.
- **Tipos 3 y 4 (forma de salchicha suave y lisa):** ¡Es el estado ideal y la meta del protocolo ColiPlus!
- **Tipos 5 a 7 (pastosa o líquida):** Indican irritación o disbiosis rápida. En ese caso prioriza el caldo de verduras, arroz integral y alimentos astringentes mientras tu mucosa se repara en Fase 2.`;
  } else {
    reply = `¡Hola! Me alegra mucho que me consultes. Para apoyar tu colon hoy, recuerda que cada porción de ColiPlus te aporta 3 gramos de fibra prebiótica pura con alcachofa, pitaya, flor de jamaica y espirulina. Combínalo siempre con una masticación consciente (al menos 20 masticadas por bocado) para que las enzimas salivares ayuden a tu estómago. ¿Tienes alguna molestia puntual que quieras que revisemos?`;
  }

  res.json({ reply });
});

// --- SERVER START & VITE MIDDLEWARE ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ColiPlus 30D server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
