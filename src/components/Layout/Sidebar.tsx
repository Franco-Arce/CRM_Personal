import { LayoutDashboard, FolderKanban, ShieldCheck, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Proyectos', href: '/projects', icon: FolderKanban },
    { name: 'El Contrato', href: '/accountability', icon: ShieldCheck },
    { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-codeflow-sidebar h-screen fixed left-0 top-0 flex flex-col border-r border-codeflow-border">
            {/* Branding */}
            <div className="p-6 border-b border-codeflow-border">
                <h1 className="text-2xl font-bold text-codeflow-accent">CodeFlow HQ</h1>
                <p className="text-sm text-codeflow-text-muted mt-1">Data & Dev Hub</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-codeflow-accent text-white shadow-lg'
                                : 'text-codeflow-text-muted hover:bg-codeflow-hover hover:text-codeflow-text'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-codeflow-border">
                <p className="text-xs text-codeflow-text-muted text-center">
                    Franco & Rodrigo © 2025
                </p>
            </div>
        </div>
    );
}
