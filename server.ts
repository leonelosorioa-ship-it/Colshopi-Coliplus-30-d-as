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

// Upload and persist Bianka's avatar image
app.post('/api/upload-avatar', (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Falta la imagen en base64' });
    }
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const fs = require('fs');
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, 'bianka.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'Bianka en Circulo.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'bianka.png'), buffer);

    // Also write to dist/ if dist folder exists (e.g. production build)
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, 'bianka.jpg'), buffer);
      fs.writeFileSync(path.join(distDir, 'Bianka en Circulo.jpg'), buffer);
      fs.writeFileSync(path.join(distDir, 'bianka.png'), buffer);
    }
    return res.json({ success: true, url: '/Bianka en Circulo.jpg' });
  } catch (error: any) {
    console.error('Error saving avatar:', error);
    return res.status(500).json({ error: error.message });
  }
});

// GET Bianka avatar if present on disk
app.get('/api/avatar', (req, res) => {
  const fs = require('fs');
  const possibleFiles = [
    path.join(process.cwd(), 'public', 'Bianka en Circulo.jpg'),
    path.join(process.cwd(), 'public', 'bianka.jpg'),
    path.join(process.cwd(), 'public', 'bianka.png')
  ];
  for (const file of possibleFiles) {
    if (fs.existsSync(file)) {
      return res.sendFile(file);
    }
  }
  res.status(404).send('No custom avatar found');
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

  const results = await Promise.allSettled(
    targetUsers.map(u => {
      if (u.pushSubscription) {
        const userTitle = (title || 'ColiFem 30D - Mensaje de Bianka 💚').replace(/{nombre}/gi, u.name || 'Hermosa');
        const userBody = (body || 'Recuerda tu dosis de Coli Plus y tu hidratación con ColShopi Tienda 💚').replace(/{nombre}/gi, u.name || 'Hermosa');
        const personalizedPayload = JSON.stringify({
          title: userTitle,
          body: userBody,
          icon: icon || '/icon-192.png',
          data: { url: url || '/' }
        });
        return webpush.sendNotification(u.pushSubscription, personalizedPayload);
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

// Lista Oficial y Secreta de los 50 Códigos VIP de ColShopi Tienda By Leps Digital
const SECRET_50_VIP_CODES = [
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

// Mapa de códigos reclamados (Uso único y exclusivo)
const claimedVipCodes: Map<string, { userId: string; userName: string; claimedAt: string }> = new Map();

// Endpoint estricto para validar código VIP de 6 dígitos
app.post('/api/validate-code', (req, res) => {
  const { code, userId } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      valid: false,
      error: 'Por favor ingresa tu código de activación de 6 dígitos.'
    });
  }

  const clean = code.trim();

  // Debe ser 6 dígitos numéricos
  if (!/^\d{6}$/.test(clean)) {
    return res.status(400).json({
      valid: false,
      error: `El código debe tener exactamente 6 dígitos numéricos (ingresaste ${clean.length}/6).`
    });
  }

  // Verifica que pertenezca a la lista autorizada de 50 códigos
  if (!SECRET_50_VIP_CODES.includes(clean)) {
    return res.status(400).json({
      valid: false,
      error: 'Código no reconocido o no autorizado. El acceso a ColiFem 30D es exclusivo para compradoras de ColShopi. Solicita tu código único de 6 dígitos a Bianka por WhatsApp.'
    });
  }

  // Verifica que no haya sido utilizado previamente (Uso único)
  const existingClaim = claimedVipCodes.get(clean);
  if (existingClaim && (!userId || existingClaim.userId !== userId)) {
    return res.status(400).json({
      valid: false,
      error: `Este código de 6 dígitos (${clean}) ya fue activado previamente por otra compradora. Cada código es de uso único y exclusivo. Por favor solicita tu código personal a Bianka por WhatsApp.`
    });
  }

  res.json({
    valid: true,
    code: clean,
    message: 'Código verificado con éxito. ¡Bienvenida a ColiFem 30D!'
  });
});

// Admin PIN validation
app.post('/api/admin/login', (req, res) => {
  const { email, pin } = req.body;
  const validEmail = 'contacto@colshopi.com';
  const cleanPin = String(pin || '').trim().toUpperCase();
  const isValidPin = cleanPin === '250816' || cleanPin === 'COLSHOPI2026' || cleanPin === 'ADMIN2026';

  if ((email?.toLowerCase() === validEmail || email?.toLowerCase().includes('admin') || email?.toLowerCase().includes('colshopi')) && isValidPin) {
    return res.json({
      success: true,
      role: 'SUPER_ADMIN',
      token: 'ADMIN-AUTH-COLSHOPI-2026',
      user: { email: validEmail, name: 'Administrador ColShopi' }
    });
  }

  res.status(401).json({ error: 'Credenciales inválidas. Verifica tu correo y el PIN de 6 dígitos (250816).' });
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
    name: data.name || 'Usuaria ColiFem',
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

  // Registrar el código como reclamado si pertenece a la lista VIP
  if (data.accessCode && SECRET_50_VIP_CODES.includes(data.accessCode.trim())) {
    claimedVipCodes.set(data.accessCode.trim(), {
      userId: id,
      userName: user.name,
      claimedAt: now
    });
  }

  res.json({ success: true, user });
});

// Admin VIP codes status
app.get('/api/admin/vip-codes', (req, res) => {
  const codesStatus = SECRET_50_VIP_CODES.map((code, index) => {
    const claim = claimedVipCodes.get(code);
    return {
      index: index + 1,
      code,
      isClaimed: !!claim,
      claimedBy: claim?.userName || null,
      claimedUserId: claim?.userId || null,
      claimedAt: claim?.claimedAt || null
    };
  });

  const totalCodes = SECRET_50_VIP_CODES.length;
  const totalClaimed = claimedVipCodes.size;
  const totalAvailable = totalCodes - totalClaimed;

  res.json({
    totalCodes,
    totalClaimed,
    totalAvailable,
    codes: codesStatus
  });
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
    packName: packName || 'Pack ColiFem',
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
Eres Bianka, la Guía de Bienestar y Hábitos Saludables de ColShopi Tienda By Leps Digital 💚 en la aplicación oficial "ColiFem 30D: Guía de Transformación Digestiva y Cuidado del Colon".
REGLA INQUEBRANTABLE DE IDENTIDAD:
NUNCA te presentes como médica ni como nutricionista clínica. Eres una guía de bienestar, hábitos saludables, alimentación consciente y digestión ligera respaldada por el equipo de ColShopi Tienda.
El producto funcional que acompaña este reto es "Coli Plus" (alimento en polvo de 450g, registro INVIMA NSA-0012423-2022, delicioso sabor natural a manzana verde, 34 kcal por porción, 3g de fibra prebiótica soluble e insoluble, endulzado con stevia natural sin azúcar añadida).
Su fórmula botánica contiene 8 superalimentos: linaza molida, salvado de trigo, noni, pitaya, flor de jamaica, alcachofa, semillas de chía, espirulina y té verde.
Modo de toma recomendado de Coli Plus:
- 1 cucharada dosificadora rasa (aprox. 18g) en un vaso de 250ml de agua fresca o infusión tibia.
- Momento estelar: 20 a 30 minutos después de cenar antes de dormir (la fibra y mucílagos trabajan mientras duermes, reparan la pared intestinal y facilitan una evacuación suave matutina sin cólicos).
- Alternativa matutina: En ayunas, si la meta es saciedad prolongada y acelerar digestiones pesadas durante el día.
- Se puede mezclar en batidos verdes o avena reposada.
- Siempre recordar beber mínimo 2 litros de agua (8 vasos) diarios para que la fibra mucilaginosa no se reseque.
- Para dudas sobre envíos, garantías o pedidos adicionales en Colombia, indícales el WhatsApp oficial de atención al cliente de ColShopi Tienda: +57 310 400 7428.

Perfil de la clienta actual:
Nombre: ${userProfile?.name || 'Amiga ColShopi'}
Ángulo digestivo: ${userProfile?.digestiveAngle || 'Hinchazón Abdominal y Gases'}
Día del programa: Día ${userProfile?.currentDay || 1}

Instrucciones de comunicación:
1. Responde con tono alegre, empático, muy cálido, motivador y profesional en español latinoamericano con acento afectuoso colombiano ("¡Hola hermosa!", "¡Hola ${userProfile?.name || 'linda'}!", con corazoncito verde 💚).
2. Da tips prácticos: respiración diafragmática, masticación lenta (20 masticadas), infusiones carminativas (manzanilla, jengibre, menta), caldos suaves y verduras cocidas al vapor.
3. Respuestas concisas, bien estructuradas en 2-3 párrafos breves con pasos accionables.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nPregunta de la usuaria: ${message}` }] }
        ]
      });

      const reply = response.text || '¡Hola hermosa! Recuerda tomar tu porción de Coli Plus en agua fresca y hacer 3 respiraciones profundas antes de comer para calmar tu digestión. ¡Estoy contigo en cada paso! 💚';
      return res.json({ reply });
    } catch (geminiError) {
      console.warn('Gemini API call failed, using Bianka knowledgebase fallback:', geminiError);
    }
  }

  // Knowledgebase Fallback for Bianka 💚
  const lower = message.toLowerCase();
  let reply = '';

  if (lower.includes('hora') || lower.includes('momento') || lower.includes('cuándo') || lower.includes('tomar') || lower.includes('dosis')) {
    reply = `¡Hola hermosa! 💚 Lo ideal es tomar tu porción de Coli Plus (1 cucharada en 250ml de agua fresca) en estos momentos clave según tu objetivo:
1. **En la noche (20-30 minutos después de cenar antes de dormir):** ¡Es el momento favorito de nuestras clientas! La linaza, pitaya y chía lubrican suavemente tu intestino mientras descansas para que despiertes con una evacuación natural y tu vientre plano.
2. **En ayunas:** Si tu prioridad es calmar la ansiedad por comer y acelerar una digestión lenta durante el día. ¡Acompáñalo siempre con tus 8 vasos de agua al día!`;
  } else if (lower.includes('gas') || lower.includes('inflam') || lower.includes('hinch') || lower.includes('dolor') || lower.includes('cólico')) {
    reply = `¡Te entiendo tanto, hermosa! Esa distensión puede ser agotadora. Aquí tienes mi ritual de rescate inmediato de ColShopi 💚:
1. Prepárate una infusión tibia de manzanilla con unas rodajas finas de jengibre o anís.
2. Siéntate cómoda y haz 5 minutos de respiración diafragmática: inhala inflando tu abdomen en 4 segundos y exhala despacio en 6 segundos. Esto envía una señal de calma directa a tu colon.
3. Evita gaseosas, chicles y ensaladas crudas duras por hoy. Esta noche tu Coli Plus aportará la fibra noble que tu flora necesita para desinflamar.`;
  } else if (lower.includes('leche') || lower.includes('jugo') || lower.includes('batido') || lower.includes('mezclar')) {
    reply = `¡Totalmente, hermosa! 💚 Coli Plus tiene un delicioso y suave sabor a manzana verde natural. Puedes disolverlo perfectamente en agua fresca, en leche vegetal sin azúcar (de almendras o coco), o licuarlo en tu batido verde matutino con espinaca y pepino. Solo recuerda beberlo pronto para disfrutar de su textura ligera y fresca.`;
  } else if (lower.includes('bristol') || lower.includes('evacua') || lower.includes('baño') || lower.includes('estreñ') || lower.includes('diarrea')) {
    reply = `La Escala de Bristol es nuestra mejor brújula digestiva 💚:
- **Tipos 1 y 2 (bolitas duras):** Tu colon te pide más lubricación. Sube a 8 vasos de agua y no olvides tu Coli Plus nocturno.
- **Tipos 3 y 4 (forma de salchicha suave y lisa):** ¡Es la meta dorada de ColiFem 30D! Significa tránsito perfecto y mucosa sana.
- **Tipos 5 a 7 (muy blandas o líquidas):** Tu colon está irritado; dale un respiro hoy con caldos calientes de verduras, arroz integral y agua tibia mientras tu microbiota se equilibra en Fase 2.`;
  } else if (lower.includes('whatsapp') || lower.includes('pedido') || lower.includes('comprar') || lower.includes('frasco') || lower.includes('colshopi')) {
    reply = `¡Con mucho gusto hermosa! 💚 Puedes solicitar tus frascos de Coli Plus o consultar cualquier duda sobre tu despacho directamente con nuestro equipo de atención de ColShopi Tienda en WhatsApp al **+57 310 400 7428**. ¡Hacemos envíos con pago contra entrega en toda Colombia!`;
  } else {
    reply = `¡Hola hermosa! Me alegra muchísimo saludarte 💚. Recuerda que cada porción de Coli Plus te brinda 3 gramos de fibra prebiótica pura con 8 superalimentos botánicos (linaza, alcachofa, pitaya, noni, flor de jamaica, chía, espirulina y té verde). Mastica cada bocado al menos 20 veces para facilitar el trabajo de tu estómago. ¿En qué molestia o duda digestiva te puedo acompañar hoy?`;
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
    console.log(`ColiFem 30D server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
