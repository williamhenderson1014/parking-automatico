import {
  Vehicle,
  ParkingSpace,
  ParkingSession,
  Payment,
  IoTDevice,
  PricingTier,
  DashboardStats,
  AccessEvent,
} from '@/types';

// Vehicles
export const vehicles: Vehicle[] = [
  { id: 'v1', plate: 'AA123BB', type: 'car', color: 'Blanco', brand: 'Toyota', model: 'Corolla' },
  { id: 'v2', plate: 'CC456DD', type: 'car', color: 'Negro', brand: 'Ford', model: 'Focus' },
  { id: 'v3', plate: 'EE789FF', type: 'motorcycle', color: 'Rojo', brand: 'Honda', model: 'CB500' },
  { id: 'v4', plate: 'GG012HH', type: 'car', color: 'Gris', brand: 'Volkswagen', model: 'Golf' },
  { id: 'v5', plate: 'II345JJ', type: 'van', color: 'Blanco', brand: 'Fiat', model: 'Ducato' },
  { id: 'v6', plate: 'KK678LL', type: 'car', color: 'Azul', brand: 'Chevrolet', model: 'Cruze' },
  { id: 'v7', plate: 'MM901NN', type: 'truck', color: 'Amarillo', brand: 'Mercedes', model: 'Sprinter' },
  { id: 'v8', plate: 'OO234PP', type: 'car', color: 'Rojo', brand: 'Peugeot', model: '308' },
];

// Parking Spaces (3 floors, zones A-D)
export const parkingSpaces: ParkingSpace[] = [
  // Floor 1 - Zone A (cars)
  { id: 's1', number: '1A01', floor: 1, zone: 'A', status: 'occupied', vehicleId: 'v1', type: 'car' },
  { id: 's2', number: '1A02', floor: 1, zone: 'A', status: 'occupied', vehicleId: 'v2', type: 'car' },
  { id: 's3', number: '1A03', floor: 1, zone: 'A', status: 'available', type: 'car' },
  { id: 's4', number: '1A04', floor: 1, zone: 'A', status: 'available', type: 'car' },
  { id: 's5', number: '1A05', floor: 1, zone: 'A', status: 'maintenance', type: 'car' },
  // Floor 1 - Zone B (cars)
  { id: 's6', number: '1B01', floor: 1, zone: 'B', status: 'occupied', vehicleId: 'v4', type: 'car' },
  { id: 's7', number: '1B02', floor: 1, zone: 'B', status: 'available', type: 'car' },
  { id: 's8', number: '1B03', floor: 1, zone: 'B', status: 'reserved', type: 'car' },
  { id: 's9', number: '1B04', floor: 1, zone: 'B', status: 'available', type: 'car' },
  { id: 's10', number: '1B05', floor: 1, zone: 'B', status: 'available', type: 'car' },
  // Floor 1 - Zone C (motorcycles)
  { id: 's11', number: '1C01', floor: 1, zone: 'C', status: 'occupied', vehicleId: 'v3', type: 'motorcycle' },
  { id: 's12', number: '1C02', floor: 1, zone: 'C', status: 'available', type: 'motorcycle' },
  { id: 's13', number: '1C03', floor: 1, zone: 'C', status: 'available', type: 'motorcycle' },
  { id: 's14', number: '1C04', floor: 1, zone: 'C', status: 'available', type: 'motorcycle' },
  // Floor 1 - Zone D (vans/trucks)
  { id: 's15', number: '1D01', floor: 1, zone: 'D', status: 'occupied', vehicleId: 'v5', type: 'van' },
  { id: 's16', number: '1D02', floor: 1, zone: 'D', status: 'available', type: 'truck' },
  // Floor 2
  { id: 's17', number: '2A01', floor: 2, zone: 'A', status: 'occupied', vehicleId: 'v6', type: 'car' },
  { id: 's18', number: '2A02', floor: 2, zone: 'A', status: 'available', type: 'car' },
  { id: 's19', number: '2A03', floor: 2, zone: 'A', status: 'available', type: 'car' },
  { id: 's20', number: '2A04', floor: 2, zone: 'A', status: 'occupied', vehicleId: 'v8', type: 'car' },
  { id: 's21', number: '2B01', floor: 2, zone: 'B', status: 'available', type: 'car' },
  { id: 's22', number: '2B02', floor: 2, zone: 'B', status: 'available', type: 'car' },
  { id: 's23', number: '2B03', floor: 2, zone: 'B', status: 'available', type: 'car' },
  { id: 's24', number: '2B04', floor: 2, zone: 'B', status: 'occupied', vehicleId: 'v7', type: 'truck' },
  // Floor 3
  { id: 's25', number: '3A01', floor: 3, zone: 'A', status: 'available', type: 'car' },
  { id: 's26', number: '3A02', floor: 3, zone: 'A', status: 'available', type: 'car' },
  { id: 's27', number: '3A03', floor: 3, zone: 'A', status: 'available', type: 'car' },
  { id: 's28', number: '3A04', floor: 3, zone: 'A', status: 'available', type: 'car' },
  { id: 's29', number: '3B01', floor: 3, zone: 'B', status: 'available', type: 'car' },
  { id: 's30', number: '3B02', floor: 3, zone: 'B', status: 'available', type: 'car' },
];

// Active Parking Sessions
export const parkingSessions: ParkingSession[] = [
  {
    id: 'ps1',
    vehicleId: 'v1',
    vehiclePlate: 'AA123BB',
    vehicleType: 'car',
    spaceId: 's1',
    spaceNumber: '1A01',
    entryTime: '2026-03-18T08:30:00',
    status: 'active',
    qrCode: 'QR-PS1-AA123BB',
  },
  {
    id: 'ps2',
    vehicleId: 'v2',
    vehiclePlate: 'CC456DD',
    vehicleType: 'car',
    spaceId: 's2',
    spaceNumber: '1A02',
    entryTime: '2026-03-18T09:15:00',
    status: 'active',
    qrCode: 'QR-PS2-CC456DD',
  },
  {
    id: 'ps3',
    vehicleId: 'v3',
    vehiclePlate: 'EE789FF',
    vehicleType: 'motorcycle',
    spaceId: 's11',
    spaceNumber: '1C01',
    entryTime: '2026-03-18T10:00:00',
    status: 'pending_payment',
    duration: 180,
    amount: 450,
    qrCode: 'QR-PS3-EE789FF',
  },
  {
    id: 'ps4',
    vehicleId: 'v4',
    vehiclePlate: 'GG012HH',
    vehicleType: 'car',
    spaceId: 's6',
    spaceNumber: '1B01',
    entryTime: '2026-03-18T07:45:00',
    status: 'active',
    qrCode: 'QR-PS4-GG012HH',
  },
  {
    id: 'ps5',
    vehicleId: 'v5',
    vehiclePlate: 'II345JJ',
    vehicleType: 'van',
    spaceId: 's15',
    spaceNumber: '1D01',
    entryTime: '2026-03-18T11:30:00',
    status: 'active',
    qrCode: 'QR-PS5-II345JJ',
  },
  {
    id: 'ps6',
    vehicleId: 'v6',
    vehiclePlate: 'KK678LL',
    vehicleType: 'car',
    spaceId: 's17',
    spaceNumber: '2A01',
    entryTime: '2026-03-18T06:00:00',
    exitTime: '2026-03-18T12:30:00',
    duration: 390,
    amount: 2600,
    status: 'paid',
    qrCode: 'QR-PS6-KK678LL',
    paymentMethod: 'mercadopago',
  },
  {
    id: 'ps7',
    vehicleId: 'v7',
    vehiclePlate: 'MM901NN',
    vehicleType: 'truck',
    spaceId: 's24',
    spaceNumber: '2B04',
    entryTime: '2026-03-18T13:00:00',
    status: 'active',
    qrCode: 'QR-PS7-MM901NN',
  },
  {
    id: 'ps8',
    vehicleId: 'v8',
    vehiclePlate: 'OO234PP',
    vehicleType: 'car',
    spaceId: 's20',
    spaceNumber: '2A04',
    entryTime: '2026-03-18T14:15:00',
    status: 'active',
    qrCode: 'QR-PS8-OO234PP',
  },
];

// Payments
export const payments: Payment[] = [
  {
    id: 'pay1',
    sessionId: 'ps6',
    amount: 2600,
    method: 'mercadopago',
    status: 'completed',
    transactionId: 'MP-2026031812301234',
    createdAt: '2026-03-18T12:25:00',
    completedAt: '2026-03-18T12:26:00',
    vehiclePlate: 'KK678LL',
  },
  {
    id: 'pay2',
    sessionId: 'ps-old1',
    amount: 1800,
    method: 'mercadopago',
    status: 'completed',
    transactionId: 'MP-2026031710455678',
    createdAt: '2026-03-17T10:40:00',
    completedAt: '2026-03-17T10:41:00',
    vehiclePlate: 'XX999YY',
  },
  {
    id: 'pay3',
    sessionId: 'ps-old2',
    amount: 3200,
    method: 'credit_card',
    status: 'completed',
    transactionId: 'CC-2026031715229012',
    createdAt: '2026-03-17T15:20:00',
    completedAt: '2026-03-17T15:21:00',
    vehiclePlate: 'ZZ888WW',
  },
  {
    id: 'pay4',
    sessionId: 'ps3',
    amount: 450,
    method: 'mercadopago',
    status: 'pending',
    createdAt: '2026-03-18T13:00:00',
    vehiclePlate: 'EE789FF',
  },
];

// IoT Devices (ESP32)
export const iotDevices: IoTDevice[] = [
  {
    id: 'dev1',
    name: 'Barrera Entrada Principal',
    type: 'entry_gate',
    location: 'Entrada P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.101',
    firmwareVersion: '2.1.4',
  },
  {
    id: 'dev2',
    name: 'Barrera Salida Principal',
    type: 'exit_gate',
    location: 'Salida P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.102',
    firmwareVersion: '2.1.4',
  },
  {
    id: 'dev3',
    name: 'Lector QR Entrada',
    type: 'qr_reader',
    location: 'Entrada P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.103',
    firmwareVersion: '1.8.2',
  },
  {
    id: 'dev4',
    name: 'Lector QR Salida',
    type: 'qr_reader',
    location: 'Salida P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.104',
    firmwareVersion: '1.8.2',
  },
  {
    id: 'dev5',
    name: 'Pantalla Info Entrada',
    type: 'display',
    location: 'Entrada P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.105',
    firmwareVersion: '1.2.0',
  },
  {
    id: 'dev6',
    name: 'Cámara LPR Entrada',
    type: 'camera',
    location: 'Entrada P1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.106',
    firmwareVersion: '3.0.1',
  },
  {
    id: 'dev7',
    name: 'Cámara LPR Salida',
    type: 'camera',
    location: 'Salida P1',
    status: 'error',
    lastPing: '2026-03-18T13:45:00',
    ipAddress: '192.168.1.107',
    firmwareVersion: '3.0.1',
  },
  {
    id: 'dev8',
    name: 'Sensor Piso 1',
    type: 'sensor',
    location: 'Piso 1',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.108',
    firmwareVersion: '1.0.5',
  },
  {
    id: 'dev9',
    name: 'Sensor Piso 2',
    type: 'sensor',
    location: 'Piso 2',
    status: 'online',
    lastPing: '2026-03-18T14:30:00',
    ipAddress: '192.168.1.109',
    firmwareVersion: '1.0.5',
  },
  {
    id: 'dev10',
    name: 'Sensor Piso 3',
    type: 'sensor',
    location: 'Piso 3',
    status: 'offline',
    lastPing: '2026-03-18T10:00:00',
    ipAddress: '192.168.1.110',
    firmwareVersion: '1.0.5',
  },
];

// Pricing Tiers (in ARS pesos)
export const pricingTiers: PricingTier[] = [
  { id: 'pt1', name: 'Auto Standard', vehicleType: 'car', hourlyRate: 400, dailyMax: 3200, isActive: true },
  { id: 'pt2', name: 'Moto', vehicleType: 'motorcycle', hourlyRate: 150, dailyMax: 1200, isActive: true },
  { id: 'pt3', name: 'Camioneta/Van', vehicleType: 'van', hourlyRate: 500, dailyMax: 4000, isActive: true },
  { id: 'pt4', name: 'Camión', vehicleType: 'truck', hourlyRate: 600, dailyMax: 4800, isActive: true },
];

// Access Events (last 24 hours)
export const accessEvents: AccessEvent[] = [
  { id: 'ae1', type: 'entry', vehiclePlate: 'OO234PP', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T14:15:00', success: true },
  { id: 'ae2', type: 'entry', vehiclePlate: 'MM901NN', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T13:00:00', success: true },
  { id: 'ae3', type: 'payment', vehiclePlate: 'KK678LL', deviceId: 'dev4', deviceName: 'Lector QR Salida', timestamp: '2026-03-18T12:26:00', success: true },
  { id: 'ae4', type: 'exit', vehiclePlate: 'KK678LL', deviceId: 'dev2', deviceName: 'Barrera Salida Principal', timestamp: '2026-03-18T12:26:30', success: true },
  { id: 'ae5', type: 'entry', vehiclePlate: 'II345JJ', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T11:30:00', success: true },
  { id: 'ae6', type: 'entry', vehiclePlate: 'EE789FF', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T10:00:00', success: true },
  { id: 'ae7', type: 'entry', vehiclePlate: 'CC456DD', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T09:15:00', success: true },
  { id: 'ae8', type: 'entry', vehiclePlate: 'AA123BB', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T08:30:00', success: true },
  { id: 'ae9', type: 'gate_error', vehiclePlate: 'WW000XX', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T08:00:00', success: false, details: 'QR inválido' },
  { id: 'ae10', type: 'entry', vehiclePlate: 'GG012HH', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T07:45:00', success: true },
  { id: 'ae11', type: 'entry', vehiclePlate: 'KK678LL', deviceId: 'dev1', deviceName: 'Barrera Entrada Principal', timestamp: '2026-03-18T06:00:00', success: true },
];

// Dashboard Stats
export function getDashboardStats(): DashboardStats {
  const totalSpaces = parkingSpaces.length;
  const occupiedSpaces = parkingSpaces.filter(s => s.status === 'occupied').length;
  const availableSpaces = parkingSpaces.filter(s => s.status === 'available').length;

  const todayPayments = payments.filter(p => p.createdAt.startsWith('2026-03-18') && p.status === 'completed');
  const todayRevenue = todayPayments.reduce((sum, p) => sum + p.amount, 0);

  const todaySessions = parkingSessions.filter(s => s.entryTime.startsWith('2026-03-18')).length;

  const onlineDevices = iotDevices.filter(d => d.status === 'online').length;

  const completedSessions = parkingSessions.filter(s => s.duration);
  const avgDuration = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0) / completedSessions.length)
    : 0;

  return {
    totalSpaces,
    occupiedSpaces,
    availableSpaces,
    todayRevenue,
    todaySessions,
    activeDevices: onlineDevices,
    totalDevices: iotDevices.length,
    averageStayDuration: avgDuration,
  };
}

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getVehicleTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    car: 'Auto',
    motorcycle: 'Moto',
    van: 'Camioneta',
    truck: 'Camión',
  };
  return labels[type] || type;
}

export function getDeviceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    entry_gate: 'Barrera Entrada',
    exit_gate: 'Barrera Salida',
    qr_reader: 'Lector QR',
    display: 'Pantalla',
    camera: 'Cámara',
    sensor: 'Sensor',
  };
  return labels[type] || type;
}

export function getSpaceStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Disponible',
    occupied: 'Ocupado',
    reserved: 'Reservado',
    maintenance: 'Mantenimiento',
  };
  return labels[status] || status;
}

export function getSessionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Activo',
    pending_payment: 'Pago Pendiente',
    paid: 'Pagado',
    exited: 'Salió',
    cancelled: 'Cancelado',
  };
  return labels[status] || status;
}
