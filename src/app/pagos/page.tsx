'use client';

import { useState } from 'react';
import {
  PaymentIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertIcon,
  ChevronDownIcon,
} from '@/components/icons';
import { payments, formatCurrency, formatDateTime } from '@/data/mockData';

export default function PagosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [methodFilter, setMethodFilter] = useState<string | null>(null);

  const filteredPayments = payments.filter(payment => {
    if (searchQuery && !payment.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter && payment.status !== statusFilter) return false;
    if (methodFilter && payment.method !== methodFilter) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: typeof CheckCircleIcon }> = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircleIcon },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: ClockIcon },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: ClockIcon },
      failed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertIcon },
      refunded: { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertIcon },
    };
    const labels: Record<string, string> = {
      completed: 'Completado',
      pending: 'Pendiente',
      processing: 'Procesando',
      failed: 'Fallido',
      refunded: 'Reembolsado',
    };
    return { ...styles[status], label: labels[status] || status };
  };

  const getMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      mercadopago: 'MercadoPago',
      credit_card: 'Tarjeta Crédito',
      debit_card: 'Tarjeta Débito',
      cash: 'Efectivo',
    };
    return labels[method] || method;
  };

  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    completed: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    count: payments.length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Historial de Pagos</h1>
          <p className="text-dark-500 mt-1">Gestión de transacciones y cobros</p>
        </div>
        <button className="bg-white border border-gray-200 text-dark-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
          <DownloadIcon className="w-5 h-5" />
          Exportar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-dark-500 text-sm">Total Recaudado</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">{formatCurrency(stats.total)}</p>
          <p className="text-sm text-dark-400 mt-1">{stats.count} transacciones</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <p className="text-green-600 text-sm">Completados</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(stats.completed)}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <p className="text-yellow-600 text-sm">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">{formatCurrency(stats.pending)}</p>
        </div>
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
          <p className="text-primary-600 text-sm">MercadoPago</p>
          <p className="text-2xl font-bold text-primary-700 mt-1">
            {formatCurrency(payments.filter(p => p.method === 'mercadopago' && p.status === 'completed').reduce((sum, p) => sum + p.amount, 0))}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por patente o ID transacción..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter || ''}
              onChange={(e) => setStatusFilter(e.target.value || null)}
              className="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los estados</option>
              <option value="completed">Completado</option>
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="failed">Fallido</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>

          {/* Method Filter */}
          <div className="relative">
            <select
              value={methodFilter || ''}
              onChange={(e) => setMethodFilter(e.target.value || null)}
              className="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los métodos</option>
              <option value="mercadopago">MercadoPago</option>
              <option value="credit_card">Tarjeta Crédito</option>
              <option value="debit_card">Tarjeta Débito</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">ID Transacción</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">Patente</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">Método</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">Monto</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-700">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => {
                const badge = getStatusBadge(payment.status);
                const Icon = badge.icon;
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-dark-600">
                        {payment.transactionId || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-dark-900">{payment.vehiclePlate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-dark-600">{getMethodLabel(payment.method)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-dark-900">{formatCurrency(payment.amount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <Icon className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-dark-500">{formatDateTime(payment.createdAt)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <PaymentIcon className="w-12 h-12 text-dark-300 mx-auto mb-3" />
            <p className="text-dark-500">No se encontraron pagos</p>
          </div>
        )}
      </div>
    </div>
  );
}
