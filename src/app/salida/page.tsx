'use client';

import { useState } from 'react';
import {
  ExitIcon,
  QRCodeIcon,
  ScanIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyIcon,
  CarIcon,
  BarrierIcon,
} from '@/components/icons';
import { parkingSessions, formatCurrency, formatDuration, formatTime, getVehicleTypeLabel, pricingTiers } from '@/data/mockData';

export default function SalidaPage() {
  const [step, setStep] = useState<'scan' | 'payment' | 'processing' | 'success'>('scan');
  const [selectedSession, setSelectedSession] = useState<typeof parkingSessions[0] | null>(null);
  const [qrInput, setQrInput] = useState('');

  const calculateAmount = (session: typeof parkingSessions[0]) => {
    const entryTime = new Date(session.entryTime);
    const now = new Date();
    const minutes = Math.floor((now.getTime() - entryTime.getTime()) / 60000);
    const hours = Math.ceil(minutes / 60);
    const tier = pricingTiers.find(t => t.vehicleType === session.vehicleType);
    const hourlyRate = tier?.hourlyRate || 400;
    const dailyMax = tier?.dailyMax || 3200;
    return Math.min(hours * hourlyRate, dailyMax);
  };

  const handleScan = () => {
    // Simulate finding a session
    const activeSessions = parkingSessions.filter(s => s.status === 'active');
    if (activeSessions.length > 0) {
      const session = activeSessions[0];
      setSelectedSession(session);
      setStep('payment');
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const session = parkingSessions.find(
      s => (s.qrCode === qrInput || s.vehiclePlate === qrInput.toUpperCase()) && (s.status === 'active' || s.status === 'pending_payment')
    );
    if (session) {
      setSelectedSession(session);
      setStep('payment');
    }
  };

  const handlePayment = (method: string) => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleReset = () => {
    setStep('scan');
    setSelectedSession(null);
    setQrInput('');
  };

  const sessionDuration = selectedSession ?
    Math.floor((new Date().getTime() - new Date(selectedSession.entryTime).getTime()) / 60000) : 0;
  const amount = selectedSession ? calculateAmount(selectedSession) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Proceso de Salida</h1>
        <p className="text-dark-500 mt-1">Escanee el código QR o busque por patente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {step === 'scan' && (
            <div className="space-y-6">
              {/* QR Scanner Preview */}
              <div className="aspect-video bg-dark-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="relative z-10 text-center">
                  <QRCodeIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70">Lector QR Activo</p>
                  <p className="text-sm text-white/50 mt-1">Esperando escaneo...</p>
                </div>
                {/* Scan corners */}
                <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-blue-500" />
                <div className="absolute top-8 right-8 w-12 h-12 border-r-4 border-t-4 border-blue-500" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-l-4 border-b-4 border-blue-500" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-blue-500" />
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              >
                <ScanIcon className="w-6 h-6" />
                Escanear QR
              </button>

              {/* Manual Entry */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-dark-400">o buscar manualmente</span>
                </div>
              </div>

              <form onSubmit={handleManualSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">Código QR o Patente</label>
                  <input
                    type="text"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value.toUpperCase())}
                    placeholder="Ej: AA123BB o QR-PS1-AA123BB"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={qrInput.length < 4}
                  className="w-full bg-dark-800 text-white py-3 rounded-lg font-medium hover:bg-dark-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buscar Vehículo
                </button>
              </form>

              {/* Active Sessions Quick Select */}
              <div>
                <p className="text-sm font-medium text-dark-700 mb-3">Vehículos pendientes de salida:</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {parkingSessions.filter(s => s.status === 'active' || s.status === 'pending_payment').slice(0, 4).map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        setSelectedSession(session);
                        setStep('payment');
                      }}
                      className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <CarIcon className="w-5 h-5 text-dark-400" />
                        <div>
                          <p className="font-mono font-medium">{session.vehiclePlate}</p>
                          <p className="text-sm text-dark-500">Espacio {session.spaceNumber}</p>
                        </div>
                      </div>
                      <span className="text-sm text-dark-400">{formatTime(session.entryTime)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && selectedSession && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CurrencyIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-dark-900">Pago de Estacionamiento</h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Patente</span>
                  <span className="text-xl font-bold font-mono text-dark-900">{selectedSession.vehiclePlate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Tipo</span>
                  <span className="font-medium text-dark-900">{getVehicleTypeLabel(selectedSession.vehicleType)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Entrada</span>
                  <span className="font-medium text-dark-900">{formatTime(selectedSession.entryTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Duración</span>
                  <span className="font-medium text-dark-900 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {formatDuration(sessionDuration)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-dark-700 font-medium">Total a pagar</span>
                  <span className="text-2xl font-bold text-primary-600">{formatCurrency(amount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-dark-700">Seleccione método de pago:</p>
                <button
                  onClick={() => handlePayment('mercadopago')}
                  className="w-full p-4 bg-[#009ee3] text-white rounded-lg font-medium hover:bg-[#008bd1] transition-colors flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  Pagar con MercadoPago
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePayment('credit_card')}
                    className="p-3 bg-gray-100 text-dark-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Tarjeta Crédito
                  </button>
                  <button
                    onClick={() => handlePayment('debit_card')}
                    className="p-3 bg-gray-100 text-dark-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Tarjeta Débito
                  </button>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-gray-100 text-dark-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="space-y-6 text-center py-12">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CurrencyIcon className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-900">Procesando Pago</h2>
                <p className="text-dark-500 mt-1">Por favor espere...</p>
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {step === 'success' && selectedSession && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-900">Pago Exitoso</h2>
                <p className="text-dark-500 mt-1">La barrera se abrirá automáticamente</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <BarrierIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-700 font-medium">Barrera Abierta</p>
                <p className="text-sm text-green-600 mt-1">Puede salir del estacionamiento</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 max-w-xs mx-auto">
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Patente</span>
                  <span className="font-bold font-mono">{selectedSession.vehiclePlate}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-dark-500">Total pagado</span>
                  <span className="font-bold text-primary-600">{formatCurrency(amount)}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-gradient-primary text-white py-3 px-8 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Nueva Salida
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <ExitIcon className="w-5 h-5 text-blue-600" />
              Proceso de Salida
            </h3>
            <ol className="space-y-3 text-sm text-dark-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>El usuario escanea su código QR en la salida</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>El sistema calcula el tiempo y monto a pagar</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>El pago se realiza via MercadoPago o tarjeta</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span>La barrera se abre automáticamente</span>
              </li>
            </ol>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-dark-900 mb-4">Métodos de Pago</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#009ee3]/10 rounded-lg">
                <div className="w-10 h-10 bg-[#009ee3] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MP</span>
                </div>
                <div>
                  <p className="font-medium text-dark-900">MercadoPago</p>
                  <p className="text-sm text-dark-500">QR, Link de pago, Billetera</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <CurrencyIcon className="w-5 h-5 text-dark-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-900">Tarjetas</p>
                  <p className="text-sm text-dark-500">Crédito y Débito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
