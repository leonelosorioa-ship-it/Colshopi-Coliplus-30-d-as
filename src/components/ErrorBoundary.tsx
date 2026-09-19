import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      if (typeof window !== 'undefined' && 'caches' in window) {
        window.caches.keys().then((names) => {
          names.forEach((name) => window.caches.delete(name));
        }).finally(() => {
          window.location.reload();
        });
        return;
      }
    } catch (e) {
      // fallback
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] text-[#0F766E] flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8 text-[#0F766E]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0F172A] font-display">
                Restableciendo ColiFem 30D 💚
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Hubo una pequeña interrupción al sincronizar tu sesión. Tu información guardada está protegida.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Recargar Aplicación</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
