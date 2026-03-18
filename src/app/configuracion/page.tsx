'use client';

import { useState } from 'react';
import {
  SettingsIcon,
  CurrencyIcon,
  DeviceIcon,
  BellIcon,
  CarIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@/components/icons';
import { pricingTiers, formatCurrency } from '@/data/mockData';

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('tarifas');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'tarifas', name: 'Tarifas', icon: CurrencyIcon },
    { id: 'horarios', name: 'Horarios', icon: ClockIcon },
    { id: 'dispositivos', name: 'Dispositivos', icon: DeviceIcon },
    { id: 'notificaciones', name: 'Notificaciones', icon: BellIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Configuración</h1>
          <p className="text-dark-500 mt-1">Ajustes del sistema de estacionamiento</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="font-medium">Cambios guardados</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-dark-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'tarifas' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark-900 mb-6">Configuración de Tarifas</h2>

              <div className="space-y-6">
                {pricingTiers.map((tier, index) => (
                  <div key={tier.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CarIcon className="w-6 h-6 text-primary-600" />
                        <span className="font-semibold text-dark-900">{tier.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={tier.isActive} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        <span className="ml-2 text-sm text-dark-500">Activa</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">Tarifa por hora</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">$</span>
                          <input
                            type="number"
                            defaultValue={tier.hourlyRate}
                            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">Máximo diario</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">$</span>
                          <input
                            type="number"
                            defaultValue={tier.dailyMax}
                            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'horarios' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark-900 mb-6">Horarios de Operación</h2>

              <div className="space-y-4">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <span className="w-24 font-medium text-dark-900">{day}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        defaultValue="06:00"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="text-dark-400">a</span>
                      <input
                        type="time"
                        defaultValue="23:00"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={day !== 'Domingo'} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-6"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'dispositivos' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark-900 mb-6">Configuración de Dispositivos</h2>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-medium text-dark-900 mb-4">Barreras de Acceso</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-600">Tiempo de apertura automática</span>
                      <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500">
                        <option value="5">5 segundos</option>
                        <option value="10">10 segundos</option>
                        <option value="15">15 segundos</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-600">Sensor de presencia</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-medium text-dark-900 mb-4">Cámaras LPR</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-600">Sensibilidad de reconocimiento</span>
                      <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500">
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-600">Guardar imágenes</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notificaciones' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-dark-900 mb-6">Configuración de Notificaciones</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-dark-900">Alertas de dispositivos</p>
                    <p className="text-sm text-dark-500">Recibir notificaciones cuando un dispositivo falle</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-dark-900">Resumen diario</p>
                    <p className="text-sm text-dark-500">Recibir resumen de operaciones al final del día</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-dark-900">Alertas de ocupación</p>
                    <p className="text-sm text-dark-500">Notificar cuando la ocupación supere el 90%</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-dark-900">Pagos fallidos</p>
                    <p className="text-sm text-dark-500">Notificar cuando un pago falle</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-dark-700 mb-2">Email de notificaciones</label>
                  <input
                    type="email"
                    defaultValue="admin@parkingauto.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
