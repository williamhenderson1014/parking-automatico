'use client';

import { useState } from 'react';
import {
  EntryIcon,
  QRCodeIcon,
  CarIcon,
  ScanIcon,
  CheckCircleIcon,
  PrinterIcon,
  CameraIcon,
} from '@/components/icons';
import { pricingTiers, formatCurrency, getVehicleTypeLabel } from '@/data/mockData';

export default function EntradaPage() {
  const [step, setStep] = useState<'scan' | 'confirm' | 'success'>('scan');
  const [vehicleData, setVehicleData] = useState({
    plate: '',
    type: 'car' as 'car' | 'motorcycle' | 'van' | 'truck',
  });
  const [generatedQR, setGeneratedQR] = useState('');

  const handleScan = () => {
    // Simulate plate recognition
    const plates = ['AB123CD', 'EF456GH', 'IJ789KL', 'MN012OP'];
    const randomPlate = plates[Math.floor(Math.random() * plates.length)];
    setVehicleData({ ...vehicleData, plate: randomPlate });
    setStep('confirm');
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleData.plate.length >= 6) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    // Generate QR code
    const qrCode = `QR-${Date.now()}-${vehicleData.plate}`;
    setGeneratedQR(qrCode);
    setStep('success');
  };

  const handleReset = () => {
    setStep('scan');
    setVehicleData({ plate: '', type: 'car' });
    setGeneratedQR('');
  };

  const selectedTier = pricingTiers.find(t => t.vehicleType === vehicleData.type);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Registro de Entrada</h1>
        <p className="text-dark-500 mt-1">Escanee la patente o ingrese manualmente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {step === 'scan' && (
            <div className="space-y-6">
              {/* Camera Preview */}
              <div className="aspect-video bg-dark-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="relative z-10 text-center">
                  <CameraIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70">Cámara LPR Activa</p>
                  <p className="text-sm text-white/50 mt-1">Esperando vehículo...</p>
                </div>
                {/* Scan overlay */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-2 border-green-500 rounded-lg h-16 animate-pulse" />
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              >
                <ScanIcon className="w-6 h-6" />
                Escanear Patente
              </button>

              {/* Manual Entry */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-dark-400">o ingrese manualmente</span>
                </div>
              </div>

              <form onSubmit={handleManualEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">Patente</label>
                  <input
                    type="text"
                    value={vehicleData.plate}
                    onChange={(e) => setVehicleData({ ...vehicleData, plate: e.target.value.toUpperCase() })}
                    placeholder="Ej: AA123BB"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg font-mono text-center"
                    maxLength={7}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">Tipo de Vehículo</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['car', 'motorcycle', 'van', 'truck'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVehicleData({ ...vehicleData, type })}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          vehicleData.type === type
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CarIcon className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-xs font-medium">{getVehicleTypeLabel(type)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={vehicleData.plate.length < 6}
                  className="w-full bg-dark-800 text-white py-3 rounded-lg font-medium hover:bg-dark-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </form>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarIcon className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-dark-900">Confirmar Entrada</h2>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Patente</span>
                  <span className="text-2xl font-bold font-mono text-dark-900">{vehicleData.plate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Tipo</span>
                  <span className="font-medium text-dark-900">{getVehicleTypeLabel(vehicleData.type)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Tarifa por hora</span>
                  <span className="font-medium text-dark-900">{formatCurrency(selectedTier?.hourlyRate || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Máximo diario</span>
                  <span className="font-medium text-dark-900">{formatCurrency(selectedTier?.dailyMax || 0)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 text-dark-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Confirmar Entrada
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-900">Entrada Registrada</h2>
                <p className="text-dark-500 mt-1">El vehículo ha ingresado correctamente</p>
              </div>

              {/* QR Code Display */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mx-auto max-w-xs">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QRCodeIcon className="w-32 h-32 text-dark-900" />
                </div>
                <p className="text-sm text-dark-500 font-mono">{generatedQR}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 max-w-xs mx-auto">
                <div className="flex justify-between items-center">
                  <span className="text-dark-500">Patente</span>
                  <span className="font-bold font-mono">{vehicleData.plate}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-dark-500">Hora de entrada</span>
                  <span className="font-medium">{new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-xs mx-auto">
                <button className="flex-1 bg-gray-100 text-dark-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <PrinterIcon className="w-5 h-5" />
                  Imprimir
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Nueva Entrada
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-dark-900 mb-4 flex items-center gap-2">
              <EntryIcon className="w-5 h-5 text-primary-600" />
              Proceso de Entrada
            </h3>
            <ol className="space-y-3 text-sm text-dark-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>El vehículo se posiciona frente a la cámara LPR</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>El sistema reconoce automáticamente la patente</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>Se genera un código QR único para el vehículo</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span>La barrera se abre automáticamente</span>
              </li>
            </ol>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-dark-900 mb-4">Tarifas Vigentes</h3>
            <div className="space-y-3">
              {pricingTiers.filter(t => t.isActive).map((tier) => (
                <div key={tier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-dark-900">{tier.name}</p>
                    <p className="text-sm text-dark-500">Máx: {formatCurrency(tier.dailyMax)}/día</p>
                  </div>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(tier.hourlyRate)}/h</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
