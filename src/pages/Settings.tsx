import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-codeflow-text">Configuración</h1>
                <p className="text-codeflow-text-muted mt-1">
                    Administra tus preferencias
                </p>
            </div>

            <div className="card flex flex-col items-center justify-center py-20 text-codeflow-text-muted">
                <SettingsIcon size={48} className="mb-4 text-codeflow-accent opacity-50" />
                <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
                <p>La configuración estará disponible en una futura actualización.</p>
            </div>
        </div>
    );
}
