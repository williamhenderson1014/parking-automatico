'use client';

import { useState } from 'react';
import {
  ChartIcon,
  DownloadIcon,
  CalendarIcon,
  TrendUpIcon,
  CarIcon,
  CurrencyIcon,
  ClockIcon,
} from '@/components/icons';
import { payments, parkingSessions, formatCurrency, formatDuration } from '@/data/mockData';

export default function ReportesPage() {
  const [dateRange, setDateRange] = useState('today');

  // Mock report data
  const reportData = {
    revenue: {
      today: 2600,
      week: 45800,
      month: 198500,
    },
    sessions: {
      today: 8,
      week: 156,
      month: 687,
    },
    avgDuration: {
      today: 245,
      week: 198,
      month: 215,
    },
    occupancyRate: {
      today: 30,
      week: 45,
      month: 52,
    },
  };

  const hourlyData = [
    { hour: '06:00', entries: 2, exits: 0, revenue: 0 },
    { hour: '07:00', entries: 5, exits: 1, revenue: 400 },
    { hour: '08:00', entries: 8, exits: 2, revenue: 800 },
    { hour: '09:00', entries: 6, exits: 3, revenue: 1200 },
    { hour: '10:00', entries: 4, exits: 4, revenue: 1600 },
    { hour: '11:00', entries: 3, exits: 5, revenue: 2000 },
    { hour: '12:00', entries: 5, exits: 6, revenue: 2600 },
    { hour: '13:00', entries: 4, exits: 3, revenue: 2800 },
    { hour: '14:00', entries: 3, exits: 2, revenue: 3000 },
  ];

  const topVehicleTypes = [
    { type: 'Auto', count: 145, percentage: 72 },
    { type: 'Moto', count: 32, percentage: 16 },
    { type: 'Camioneta', count: 18, percentage: 9 },
    { type: 'Camión', count: 6, percentage: 3 },
  ];

  const paymentMethods = [
    { method: 'MercadoPago', count: 98, amount: 125400, percentage: 63 },
    { method: 'Tarjeta Crédito', count: 45, amount: 58200, percentage: 29 },
    { method: 'Tarjeta Débito', count: 13, amount: 14900, percentage: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Reportes y Estadísticas</h1>
          <p className="text-dark-500 mt-1">Análisis de operaciones del estacionamiento</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
            </select>
            <CalendarIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>
          <button className="bg-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <DownloadIcon className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CurrencyIcon className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-dark-500 text-sm">Ingresos</span>
          </div>
          <p className="text-2xl font-bold text-dark-900">
            {formatCurrency(reportData.revenue[dateRange as keyof typeof reportData.revenue])}
          </p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendUpIcon className="w-4 h-4" />
            +12% vs período anterior
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-dark-500 text-sm">Sesiones</span>
          </div>
          <p className="text-2xl font-bold text-dark-900">
            {reportData.sessions[dateRange as keyof typeof reportData.sessions]}
          </p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendUpIcon className="w-4 h-4" />
            +8% vs período anterior
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-dark-500 text-sm">Duración Promedio</span>
          </div>
          <p className="text-2xl font-bold text-dark-900">
            {formatDuration(reportData.avgDuration[dateRange as keyof typeof reportData.avgDuration])}
          </p>
          <p className="text-sm text-dark-400 mt-1">Por sesión</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ChartIcon className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-dark-500 text-sm">Ocupación</span>
          </div>
          <p className="text-2xl font-bold text-dark-900">
            {reportData.occupancyRate[dateRange as keyof typeof reportData.occupancyRate]}%
          </p>
          <p className="text-sm text-dark-400 mt-1">Promedio del período</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-dark-900 mb-6">Actividad por Hora</h3>
          <div className="space-y-3">
            {hourlyData.map((data) => (
              <div key={data.hour} className="flex items-center gap-4">
                <span className="text-sm text-dark-500 w-12">{data.hour}</span>
                <div className="flex-1 flex gap-2">
                  <div
                    className="h-6 bg-green-200 rounded"
                    style={{ width: `${(data.entries / 10) * 100}%` }}
                    title={`${data.entries} entradas`}
                  />
                  <div
                    className="h-6 bg-blue-200 rounded"
                    style={{ width: `${(data.exits / 10) * 100}%` }}
                    title={`${data.exits} salidas`}
                  />
                </div>
                <span className="text-sm font-medium text-dark-700 w-20 text-right">
                  {formatCurrency(data.revenue)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded" />
              <span className="text-sm text-dark-500">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 rounded" />
              <span className="text-sm text-dark-500">Salidas</span>
            </div>
          </div>
        </div>

        {/* Vehicle Types */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-dark-900 mb-6">Distribución por Tipo de Vehículo</h3>
          <div className="space-y-4">
            {topVehicleTypes.map((item) => (
              <div key={item.type}>
                <div className="flex justify-between mb-2">
                  <span className="text-dark-700 font-medium">{item.type}</span>
                  <span className="text-dark-500">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 bg-gradient-primary rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-dark-900 mb-6">Métodos de Pago</h3>
          <div className="space-y-4">
            {paymentMethods.map((item) => (
              <div key={item.method} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-dark-900">{item.method}</p>
                  <p className="text-sm text-dark-500">{item.count} transacciones</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark-900">{formatCurrency(item.amount)}</p>
                  <p className="text-sm text-dark-500">{item.percentage}% del total</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-dark-900 mb-6">Horas Pico</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-green-600 text-sm font-medium">Mayor Ocupación</p>
              <p className="text-2xl font-bold text-green-700 mt-1">08:00 - 10:00</p>
              <p className="text-sm text-green-600 mt-1">85% ocupación promedio</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-600 text-sm font-medium">Mayor Recaudación</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">12:00 - 14:00</p>
              <p className="text-sm text-blue-600 mt-1">{formatCurrency(35000)}/hora</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-purple-600 text-sm font-medium">Más Entradas</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">07:00 - 09:00</p>
              <p className="text-sm text-purple-600 mt-1">45 vehículos/hora</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <p className="text-orange-600 text-sm font-medium">Más Salidas</p>
              <p className="text-2xl font-bold text-orange-700 mt-1">17:00 - 19:00</p>
              <p className="text-sm text-orange-600 mt-1">52 vehículos/hora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
