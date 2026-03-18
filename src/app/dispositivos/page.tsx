'use client';

import { useState } from 'react';
import {
  DeviceIcon,
  WifiIcon,
  WifiOffIcon,
  AlertIcon,
  RefreshIcon,
  SettingsIcon,
  BarrierIcon,
  QRCodeIcon,
  MonitorIcon,
  CameraIcon,
} from '@/components/icons';
import { iotDevices, getDeviceTypeLabel, formatDateTime } from '@/data/mockData';

export default function DispositivosPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; dot: string }> = {
      online: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
      offline: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
      error: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    };
    const labels: Record<string, string> = {
      online: 'En línea',
      offline: 'Desconectado',
      error: 'Error',
      maintenance: 'Mantenimiento',
    };
    return { ...styles[status], label: labels[status] || status };
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'entry_gate':
      case 'exit_gate':
        return BarrierIcon;
      case 'qr_reader':
        return QRCodeIcon;
      case 'display':
        return MonitorIcon;
      case 'camera':
        return CameraIcon;
      default:
        return DeviceIcon;
    }
  };

  const stats = {
    total: iotDevices.length,
    online: iotDevices.filter(d => d.status === 'online').length,
    offline: iotDevices.filter(d => d.status === 'offline').length,
    error: iotDevices.filter(d => d.status === 'error').length,
  };

  const devicesByType = {
    gates: iotDevices.filter(d => d.type === 'entry_gate' || d.type === 'exit_gate'),
    readers: iotDevices.filter(d => d.type === 'qr_reader'),
    displays: iotDevices.filter(d => d.type === 'display'),
    cameras: iotDevices.filter(d => d.type === 'camera'),
    sensors: iotDevices.filter(d => d.type === 'sensor'),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Dispositivos IoT</h1>
          <p className="text-dark-500 mt-1">Monitoreo de ESP32 y equipos conectados</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Actualizando...' : 'Actualizar Estado'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-dark-500 text-sm">Total Dispositivos</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-2">
            <WifiIcon className="w-5 h-5 text-green-600" />
            <p className="text-green-600 text-sm">En Línea</p>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-1">{stats.online}</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-2">
            <WifiOffIcon className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600 text-sm">Desconectados</p>
          </div>
          <p className="text-2xl font-bold text-gray-700 mt-1">{stats.offline}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center gap-2">
            <AlertIcon className="w-5 h-5 text-red-600" />
            <p className="text-red-600 text-sm">Con Error</p>
          </div>
          <p className="text-2xl font-bold text-red-700 mt-1">{stats.error}</p>
        </div>
      </div>

      {/* Alerts */}
      {stats.error > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Dispositivos con problemas</p>
              <p className="text-sm text-red-600 mt-1">
                {iotDevices.filter(d => d.status === 'error').map(d => d.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Devices by Category */}
      <div className="space-y-6">
        {/* Gates */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-dark-900 flex items-center gap-2">
              <BarrierIcon className="w-5 h-5 text-primary-600" />
              Barreras de Acceso
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {devicesByType.gates.map(device => {
              const Icon = getDeviceIcon(device.type);
              const badge = getStatusBadge(device.status);
              return (
                <div key={device.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bg}`}>
                        <Icon className={`w-6 h-6 ${badge.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{device.name}</p>
                        <p className="text-sm text-dark-500">{device.location} • {device.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <p className="text-xs text-dark-400 mt-1">v{device.firmwareVersion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QR Readers */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-dark-900 flex items-center gap-2">
              <QRCodeIcon className="w-5 h-5 text-primary-600" />
              Lectores QR
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {devicesByType.readers.map(device => {
              const Icon = getDeviceIcon(device.type);
              const badge = getStatusBadge(device.status);
              return (
                <div key={device.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bg}`}>
                        <Icon className={`w-6 h-6 ${badge.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{device.name}</p>
                        <p className="text-sm text-dark-500">{device.location} • {device.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <p className="text-xs text-dark-400 mt-1">v{device.firmwareVersion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cameras */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-dark-900 flex items-center gap-2">
              <CameraIcon className="w-5 h-5 text-primary-600" />
              Cámaras LPR
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {devicesByType.cameras.map(device => {
              const Icon = getDeviceIcon(device.type);
              const badge = getStatusBadge(device.status);
              return (
                <div key={device.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bg}`}>
                        <Icon className={`w-6 h-6 ${badge.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{device.name}</p>
                        <p className="text-sm text-dark-500">{device.location} • {device.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <p className="text-xs text-dark-400 mt-1">v{device.firmwareVersion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sensors */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-dark-900 flex items-center gap-2">
              <DeviceIcon className="w-5 h-5 text-primary-600" />
              Sensores de Ocupación
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {devicesByType.sensors.map(device => {
              const Icon = getDeviceIcon(device.type);
              const badge = getStatusBadge(device.status);
              return (
                <div key={device.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bg}`}>
                        <Icon className={`w-6 h-6 ${badge.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{device.name}</p>
                        <p className="text-sm text-dark-500">{device.location} • {device.ipAddress}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <p className="text-xs text-dark-400 mt-1">Último ping: {formatDateTime(device.lastPing)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
