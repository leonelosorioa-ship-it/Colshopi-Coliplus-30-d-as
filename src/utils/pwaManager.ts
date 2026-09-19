// PWA and Web Push Manager

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    // Purge outdated legacy caches from previous versions
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          if (key === 'coliplus-30d-v1') {
            caches.delete(key);
          }
        });
      }).catch(() => {});
    }

    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    
    // Proactively check for service worker updates on app load
    reg.update().catch(() => {});

    return reg;
  } catch (err) {
    console.warn('Service Worker registration warning:', err);
    return null;
  }
}

export async function subscribeToWebPush(userId: string): Promise<{ success: boolean; message: string }> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { success: false, message: 'Tu navegador no soporta notificaciones Web Push nativas.' };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return { success: false, message: 'Permiso de notificaciones rechazado por el usuario.' };
    }

    const reg = await navigator.serviceWorker.ready;

    // Fetch VAPID public key from backend
    const keyRes = await fetch('/api/push/vapid-public-key');
    const { publicKey } = await keyRes.json();

    if (!publicKey) {
      return { success: false, message: 'No se pudo obtener la clave VAPID del servidor.' };
    }

    const convertedVapidKey = urlBase64ToUint8Array(publicKey);
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    // Send subscription to server
    const subRes = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, subscription })
    });

    const subData = await subRes.json();
    return { success: true, message: subData.message || 'Suscripción Web Push activada con éxito.' };
  } catch (err: any) {
    console.warn('Push subscription error:', err);
    return { success: false, message: err.message || 'Error al suscribirse a notificaciones push.' };
  }
}

export async function isPushSubscribed(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return false;
  }
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    return !!sub;
  } catch (err) {
    return false;
  }
}

export async function unsubscribeFromWebPush(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await sub.unsubscribe();
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function showLocalNotification(title: string, body: string, icon = '/icon-192.png') {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon,
      badge: icon
    });
  }
}

export const pwaManager = {
  registerServiceWorker,
  subscribePush: subscribeToWebPush,
  unsubscribePush: unsubscribeFromWebPush,
  isSubscribed: isPushSubscribed,
  showLocalNotification
};

