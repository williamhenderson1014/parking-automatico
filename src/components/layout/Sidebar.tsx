'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogoIcon,
  DashboardIcon,
  EntryIcon,
  ExitIcon,
  PaymentIcon,
  DeviceIcon,
  ChartIcon,
  SettingsIcon,
  LogoutIcon,
  ParkingIcon,
} from '@/components/icons';

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Entrada', href: '/entrada', icon: EntryIcon },
  { name: 'Salida', href: '/salida', icon: ExitIcon },
  { name: 'Espacios', href: '/espacios', icon: ParkingIcon },
  { name: 'Pagos', href: '/pagos', icon: PaymentIcon },
  { name: 'Dispositivos', href: '/dispositivos', icon: DeviceIcon },
  { name: 'Reportes', href: '/reportes', icon: ChartIcon },
  { name: 'Configuración', href: '/configuracion', icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <Link href="/" className="flex items-center gap-3">
          <LogoIcon className="w-10 h-10" />
          <div>
            <span className="text-lg font-bold">
              Park<span className="text-accent-400">Auto</span>
            </span>
            <p className="text-xs text-dark-400">Sistema Automatizado</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-primary text-white'
                  : 'text-dark-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-dark-300 hover:bg-dark-800 hover:text-white transition-colors w-full">
          <LogoutIcon className="w-5 h-5" />
          Salir
        </button>
      </div>
    </aside>
  );
}
