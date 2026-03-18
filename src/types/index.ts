// Vehicle Types
export type VehicleType = 'car' | 'motorcycle' | 'truck' | 'van';

export interface Vehicle {
  id: string;
  plate: string;
  type: VehicleType;
  color?: string;
  brand?: string;
  model?: string;
}

// Parking Space
export type SpaceStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface ParkingSpace {
  id: string;
  number: string;
  floor: number;
  zone: string;
  status: SpaceStatus;
  vehicleId?: string;
  type: VehicleType;
}

// Parking Session
export type SessionStatus = 'active' | 'pending_payment' | 'paid' | 'exited' | 'cancelled';

export interface ParkingSession {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleType: VehicleType;
  spaceId: string;
  spaceNumber: string;
  entryTime: string;
  exitTime?: string;
  duration?: number; // in minutes
  amount?: number;
  status: SessionStatus;
  qrCode: string;
  paymentMethod?: string;
}

// Payment
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'mercadopago' | 'cash' | 'credit_card' | 'debit_card';

export interface Payment {
  id: string;
  sessionId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
  vehiclePlate: string;
}

// IoT Device (ESP32)
export type DeviceType = 'entry_gate' | 'exit_gate' | 'qr_reader' | 'display' | 'camera' | 'sensor';
export type DeviceStatus = 'online' | 'offline' | 'error' | 'maintenance';

export interface IoTDevice {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  status: DeviceStatus;
  lastPing: string;
  ipAddress: string;
  firmwareVersion: string;
  batteryLevel?: number;
}

// Pricing
export interface PricingTier {
  id: string;
  name: string;
  vehicleType: VehicleType;
  hourlyRate: number;
  dailyMax: number;
  isActive: boolean;
}

// Statistics
export interface DashboardStats {
  totalSpaces: number;
  occupiedSpaces: number;
  availableSpaces: number;
  todayRevenue: number;
  todaySessions: number;
  activeDevices: number;
  totalDevices: number;
  averageStayDuration: number;
}

// Access Events
export type AccessEventType = 'entry' | 'exit' | 'payment' | 'gate_open' | 'gate_error';

export interface AccessEvent {
  id: string;
  type: AccessEventType;
  vehiclePlate: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  success: boolean;
  details?: string;
}
