import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle2, Truck, Gift, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import { ProductPack, UserProfile } from '../types';
import { COLIPLUS_PACKS, WHATSAPP_CONTACT_NUMBER } from '../data/packagesData';

interface OrderModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, user, onClose }) => {
  const [selectedPack, setSelectedPack] = useState<ProductPack>(COLIPLUS_PACKS[1]); // Default to popular 2-pack
  const [shippingCity, setShippingCity] = useState('Bogotá / Medellín / Cali');
  const [shippingAddress, setShippingAddress] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.whatsapp || '');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
  };

  const handleCreateOrder = async () => {
    setIsProcessing(true);

    // Register order in backend
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'GUEST',
          userName: customerName.trim() || 'Cliente ColiFem',
          whatsapp: customerPhone.trim() || '+57 300 000 0000',
          packName: selectedPack.title,
          quantity: selectedPack.bottlesCount,
          totalCOP: selectedPack.priceCOP,
          bonusGift: selectedPack.bonusGift
        })
      });
    } catch (e) {
      console.warn('Backend order recording note:', e);
    }

    // Build structured WhatsApp message
    const message = encodeURIComponent(
`👋 ¡Hola ColShopi Tienda By Leps Digital! Quiero ordenar mi reposición de Coli Plus para mi Reto ColiFem 30D.

📦 *PACK SELECCIONADO:*
• ${selectedPack.title} (${selectedPack.subtitle})
• Precio Especial: ${formatCOP(selectedPack.priceCOP)}
• Obsequio: ${selectedPack.bonusGift}
• Envío: ${selectedPack.freeShipping ? 'GRATIS a toda Colombia 🚚' : 'Contraentrega'}

👤 *MIS DATOS DE ENTREGA:*
• Nombre: ${customerName || (user?.name || 'Cliente')}
• WhatsApp: ${customerPhone || (user?.whatsapp || '')}
• Ciudad: ${shippingCity}
• Dirección: ${shippingAddress || 'A coordinar por WhatsApp'}
• Código VIP: ${user?.vipCode || 'VIP-COLIFEM'}

Quedo atenta para coordinar el despacho y método de pago (contraentrega/transferencia). ¡Muchas gracias!`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_CONTACT_NUMBER.replace(/\+/g, '')}?text=${message}`;

    setTimeout(() => {
      setIsProcessing(false);
      window.open(whatsappUrl, '_blank');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-[#0F766E] to-[#10B981] p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-[#D1FAE5]">
              <Sparkles className="w-3 h-3 mr-1 text-[#FDE68A]" />
              Tarifa Preferencial para Miembros del Protocolo 30D
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Reorden & Packs de Coli Plus (450g)
            </h2>
            <p className="text-xs text-[#D1FAE5]">
              Garantiza la continuidad de tu bienestar digestivo con envío rápido a toda Colombia.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Pack Selection Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#334155] uppercase tracking-wider">
              Elige tu Combo de Bienestar:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {COLIPLUS_PACKS.map((pack) => {
                const isSelected = selectedPack.id === pack.id;
                return (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0F766E] bg-[#F0FDF4] shadow-xs'
                        : 'border-[#E2E8F0] bg-[#FAF6F0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    {/* Badge */}
                    {pack.badge && (
                      <div className="absolute -top-2.5 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#F59E0B] text-white shadow-xs">
                          {pack.badge}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#0F172A]">{pack.title}</h4>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#0F766E] bg-[#0F766E]' : 'border-[#CBD5E1]'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-[#64748B]">{pack.subtitle}</p>
                      
                      <div className="flex items-baseline space-x-2 pt-1">
                        <span className="text-lg font-extrabold text-[#0F766E] font-display">
                          {formatCOP(pack.priceCOP)}
                        </span>
                        <span className="text-xs text-[#94A3B8] line-through">
                          {formatCOP(pack.regularPriceCOP)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E2E8F0] space-y-1">
                      <div className="flex items-center text-[11px] text-[#92400E] font-semibold">
                        <Gift className="w-3.5 h-3.5 mr-1 text-[#D97706] shrink-0" />
                        <span className="truncate">{pack.bonusGift}</span>
                      </div>
                      <div className="flex items-center text-[10px] text-[#059669] font-medium">
                        <Truck className="w-3 h-3 mr-1" />
                        <span>{pack.freeShipping ? 'Envío Nacional Gratis' : 'Envío Contraentrega'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Shipping Inputs */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <h4 className="text-xs font-bold text-[#334155] uppercase tracking-wider flex items-center">
              <Truck className="w-3.5 h-3.5 mr-1.5 text-[#0F766E]" />
              Datos para Despacho en Colombia
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                  Nombre de quien recibe:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nombre y Apellido"
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                  Ciudad y Departamento:
                </label>
                <input
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="Ej. Cali, Valle del Cauca"
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                  Dirección y Barrio (Opcional):
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Ej. Calle 123 # 45-67 Apto 302, Barrio El Poblado"
                  className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF6F0] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#64748B]">Total a pagar:</span>
            <div className="text-2xl font-black text-[#0F172A] font-display">
              {formatCOP(selectedPack.priceCOP)}
            </div>
          </div>

          <button
            id="btn-confirm-whatsapp-order"
            onClick={handleCreateOrder}
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-linear-to-r from-[#059669] to-[#10B981] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isProcessing ? 'Procesando Pedido...' : 'Pedir por WhatsApp Directo'}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
