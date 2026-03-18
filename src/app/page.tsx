'use client';

import Link from 'next/link';
import {
  ParkingIcon,
  CurrencyIcon,
  CarIcon,
  DeviceIcon,
  ClockIcon,
  ChevronRightIcon,
  AlertIcon,
  CheckCircleIcon,
  EntryIcon,
  ExitIcon,
  TrendUpIcon,
} from '@/components/icons';
import {
  getDashboardStats,
  parkingSessions,
  accessEvents,
  iotDevices,
  formatCurrency,
  formatTime,
  formatDuration,
  getSessionStatusLabel,
} from '@/data/mockData';

export default function Dashboard() {
  const stats = getDashboardStats();

  const statCards = [
    {
      title: 'Espacios Ocupados',
      value: `${stats.occupiedSpaces}/${stats.totalSpaces}`,
      subtitle: `${stats.availableSpaces} disponibles`,
      icon: ParkingIcon,
      color: 'primary',
      href: '/espacios',
    },
    {
      title: 'Ingresos Hoy',
      value: formatCurrency(stats.todayRevenue),
      subtitle: `${stats.todaySessions} sesiones`,
      icon: CurrencyIcon,
      color: 'success',
      href: '/pagos',
    },
    {
      title: 'Vehículos Activos',
      value: stats.occupiedSpaces.toString(),
      subtitle: `Tiempo promedio: ${formatDuration(stats.averageStayDuration)}`,
      icon: CarIcon,
      color: 'accent',
      href: '/entrada',
    },
    {
      title: 'Dispositivos',
      value: `${stats.activeDevices}/${stats.totalDevices}`,
      subtitle: stats.activeDevices === stats.totalDevices ? 'Todos online' : 'Revisar estado',
      icon: DeviceIcon,
      color: stats.activeDevices === stats.totalDevices ? 'primary' : 'accent',
      href: '/dispositivos',
    },
  ];

  const activeSessions = parkingSessions.filter(s => s.status === 'active' || s.status === 'pending_payment');
  const recentEvents = accessEvents.slice(0, 8);
  const deviceIssues = iotDevices.filter(d => d.status !== 'online');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      pending_payment: 'bg-yellow-100 text-yellow-700',
      paid: 'bg-blue-100 text-blue-700',
      exited: 'bg-gray-100 text-gray-700',
    };
    return { style: styles[status] || 'bg-gray-100 text-gray-700', label: getSessionStatusLabel(status) };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'entry': return EntryIcon;
      case 'exit': return ExitIcon;
      case 'payment': return CurrencyIcon;
      default: return AlertIcon;
    }
  };

  const getEventColor = (type: string, success: boolean) => {
    if (!success) return 'text-red-600 bg-red-50';
    switch (type) {
      case 'entry': return 'text-green-600 bg-green-50';
      case 'exit': return 'text-blue-600 bg-blue-50';
      case 'payment': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Dashboard</h1>
        <p className="text-dark-500 mt-1">Monitoreo en tiempo real del estacionamiento</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-dark-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-dark-900 mt-1">{stat.value}</p>
                <p className="text-sm text-dark-400 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      {deviceIssues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertIcon className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Alerta de Dispositivos</p>
              <p className="text-sm text-red-600">
                {deviceIssues.length} dispositivo(s) requieren atención: {deviceIssues.map(d => d.name).join(', ')}
              </p>
            </div>
            <Link href="/dispositivos" className="ml-auto text-red-700 font-medium text-sm hover:underline">
              Ver detalles
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-dark-900">Vehículos en Estacionamiento</h2>
            <Link href="/espacios" className="text-primary-600 text-sm font-medium hover:underline flex items-center gap-1">
              Ver todos <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {activeSessions.slice(0, 5).map((session) => {
              const badge = getStatusBadge(session.status);
              const entryDate = new Date(session.entryTime);
              const now = new Date();
              const duration = Math.floor((now.getTime() - entryDate.getTime()) / 60000);
              return (
                <div key={session.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <CarIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">{session.vehiclePlate}</p>
                        <div className="flex items-center gap-2 text-sm text-dark-500">
                          <span>Espacio {session.spaceNumber}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {formatDuration(duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.style}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
            {activeSessions.length === 0 && (
              <div className="p-8 text-center text-dark-500">
                No hay vehículos en el estacionamiento
              </div>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-dark-900">Eventos Recientes</h2>
            <Link href="/reportes" className="text-primary-600 text-sm font-medium hover:underline flex items-center gap-1">
              Ver todos <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEvents.map((event) => {
              const Icon = getEventIcon(event.type);
              const colorClass = getEventColor(event.type, event.success);
              return (
                <div key={event.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-dark-900">{event.vehiclePlate}</p>
                        {event.success ? (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertIcon className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-dark-500">{event.deviceName}</p>
                    </div>
                    <p className="text-sm text-dark-400">{formatTime(event.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-dark-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/entrada" className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <EntryIcon className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-700">Registrar Entrada</span>
          </Link>
          <Link href="/salida" className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <ExitIcon className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Procesar Salida</span>
          </Link>
          <Link href="/pagos" className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <CurrencyIcon className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Ver Pagos</span>
          </Link>
          <Link href="/reportes" className="flex flex-col items-center gap-2 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <TrendUpIcon className="w-8 h-8 text-dark-600" />
            <span className="text-sm font-medium text-dark-700">Reportes</span>
          </Link>
        </div>
      </div>

      {/* Occupancy Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dark-900">Ocupación por Zona</h2>
          <span className="text-sm text-dark-500">Tiempo real</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['A', 'B', 'C', 'D'].map((zone) => {
            const zoneSpaces = [
              { zone: 'A', total: 12, occupied: 4 },
              { zone: 'B', total: 10, occupied: 2 },
              { zone: 'C', total: 4, occupied: 1 },
              { zone: 'D', total: 4, occupied: 2 },
            ].find(z => z.zone === zone)!;
            const percentage = Math.round((zoneSpaces.occupied / zoneSpaces.total) * 100);
            return (
              <div key={zone} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-dark-900">Zona {zone}</span>
                  <span className="text-sm text-dark-500">{zoneSpaces.occupied}/{zoneSpaces.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-dark-400 mt-1">{percentage}% ocupado</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
