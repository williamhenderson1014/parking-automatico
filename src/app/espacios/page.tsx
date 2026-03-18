'use client';

import { useState } from 'react';
import {
  ParkingIcon,
  CarIcon,
  FilterIcon,
  ChevronDownIcon,
} from '@/components/icons';
import { parkingSpaces, parkingSessions, getSpaceStatusLabel, getVehicleTypeLabel, formatTime } from '@/data/mockData';

export default function EspaciosPage() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const floors = [1, 2, 3];
  const zones = ['A', 'B', 'C', 'D'];
  const types = ['car', 'motorcycle', 'van', 'truck'];

  const filteredSpaces = parkingSpaces.filter(space => {
    if (selectedFloor && space.floor !== selectedFloor) return false;
    if (selectedZone && space.zone !== selectedZone) return false;
    if (selectedType && space.type !== selectedType) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300 text-green-700';
      case 'occupied': return 'bg-red-100 border-red-300 text-red-700';
      case 'reserved': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'maintenance': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getSpaceVehicle = (spaceId: string) => {
    const session = parkingSessions.find(s => s.spaceId === spaceId && s.status === 'active');
    return session;
  };

  const stats = {
    total: parkingSpaces.length,
    available: parkingSpaces.filter(s => s.status === 'available').length,
    occupied: parkingSpaces.filter(s => s.status === 'occupied').length,
    reserved: parkingSpaces.filter(s => s.status === 'reserved').length,
    maintenance: parkingSpaces.filter(s => s.status === 'maintenance').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Mapa de Espacios</h1>
          <p className="text-dark-500 mt-1">Vista en tiempo real de la ocupación</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-dark-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-600 text-sm">Disponibles</p>
          <p className="text-2xl font-bold text-green-700">{stats.available}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-red-600 text-sm">Ocupados</p>
          <p className="text-2xl font-bold text-red-700">{stats.occupied}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-600 text-sm">Reservados</p>
          <p className="text-2xl font-bold text-blue-700">{stats.reserved}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-yellow-600 text-sm">Mantenimiento</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.maintenance}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <FilterIcon className="w-5 h-5 text-dark-400" />
          <span className="font-medium text-dark-700">Filtros</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Floor Filter */}
          <div className="relative">
            <select
              value={selectedFloor || ''}
              onChange={(e) => setSelectedFloor(e.target.value ? Number(e.target.value) : null)}
              className="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los pisos</option>
              {floors.map(floor => (
                <option key={floor} value={floor}>Piso {floor}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>

          {/* Zone Filter */}
          <div className="relative">
            <select
              value={selectedZone || ''}
              onChange={(e) => setSelectedZone(e.target.value || null)}
              className="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todas las zonas</option>
              {zones.map(zone => (
                <option key={zone} value={zone}>Zona {zone}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{getVehicleTypeLabel(type)}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>

          {(selectedFloor || selectedZone || selectedType) && (
            <button
              onClick={() => {
                setSelectedFloor(null);
                setSelectedZone(null);
                setSelectedType(null);
              }}
              className="text-sm text-primary-600 font-medium hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Floor View */}
      {floors.map(floor => {
        const floorSpaces = filteredSpaces.filter(s => s.floor === floor);
        if (floorSpaces.length === 0) return null;

        return (
          <div key={floor} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-dark-900 flex items-center gap-2">
                <ParkingIcon className="w-5 h-5 text-primary-600" />
                Piso {floor}
                <span className="text-sm font-normal text-dark-500 ml-2">
                  {floorSpaces.filter(s => s.status === 'available').length} disponibles de {floorSpaces.length}
                </span>
              </h3>
            </div>

            <div className="p-6">
              {zones.map(zone => {
                const zoneSpaces = floorSpaces.filter(s => s.zone === zone);
                if (zoneSpaces.length === 0) return null;

                return (
                  <div key={zone} className="mb-6 last:mb-0">
                    <h4 className="text-sm font-medium text-dark-500 mb-3">Zona {zone}</h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                      {zoneSpaces.map(space => {
                        const vehicle = getSpaceVehicle(space.id);
                        return (
                          <div
                            key={space.id}
                            className={`relative p-3 rounded-lg border-2 ${getStatusColor(space.status)} cursor-pointer hover:shadow-md transition-shadow group`}
                          >
                            <div className="text-center">
                              <span className="text-xs font-bold">{space.number}</span>
                              {space.status === 'occupied' && vehicle && (
                                <div className="mt-1">
                                  <CarIcon className="w-4 h-4 mx-auto" />
                                </div>
                              )}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-dark-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              <p className="font-medium">{space.number}</p>
                              <p>{getSpaceStatusLabel(space.status)}</p>
                              <p>{getVehicleTypeLabel(space.type)}</p>
                              {vehicle && (
                                <>
                                  <p className="font-mono mt-1">{vehicle.vehiclePlate}</p>
                                  <p>Desde: {formatTime(vehicle.entryTime)}</p>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <p className="text-sm font-medium text-dark-700 mb-3">Leyenda</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300" />
            <span className="text-sm text-dark-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-100 border-2 border-red-300" />
            <span className="text-sm text-dark-600">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-100 border-2 border-blue-300" />
            <span className="text-sm text-dark-600">Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-100 border-2 border-yellow-300" />
            <span className="text-sm text-dark-600">Mantenimiento</span>
          </div>
        </div>
      </div>
    </div>
  );
}
