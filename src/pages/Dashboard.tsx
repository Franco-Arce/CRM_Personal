import { TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import MetricCard from '../components/Dashboard/MetricCard';

export default function Dashboard() {
    const { projects, goals } = useStore();

    const inProgressProjects = projects.filter((p) => p.status === 'In Progress');
    const completedProjects = projects.filter((p) => p.status === 'Done');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-codeflow-text">Dashboard</h1>
                <p className="text-codeflow-text-muted mt-1">
                    Bienvenido de nuevo, Franco & Rodrigo
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Proyectos Activos"
                    value={inProgressProjects.length}
                    icon={TrendingUp}
                />
                <MetricCard
                    title="Objetivos Semanales"
                    value={goals.filter((g) => g.status === 'Pending').length}
                    icon={Target}
                />
                <MetricCard
                    title="Proyectos Completados"
                    value={completedProjects.length}
                    icon={CheckCircle2}
                />
            </div>

            {/* Recent Activity / Goals Snapshot */}
            <div className="card">
                <h2 className="text-xl font-bold text-codeflow-text mb-4">
                    Objetivos de la Semana
                </h2>
                {goals.length > 0 ? (
                    <div className="space-y-4">
                        {goals.slice(0, 3).map((goal) => (
                            <div
                                key={goal.id}
                                className="flex items-center justify-between p-4 bg-codeflow-hover rounded-lg border border-codeflow-border"
                            >
                                <div>
                                    <p className="font-medium text-codeflow-text">{goal.goal}</p>
                                    <p className="text-sm text-codeflow-text-muted">
                                        Responsable: {goal.owner}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${goal.status === 'Approved'
                                        ? 'bg-green-500/20 text-green-400'
                                        : goal.status === 'Failed'
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}
                                >
                                    {goal.status === 'Approved' ? 'Aprobado' : goal.status === 'Failed' ? 'Fallido' : 'Pendiente'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-codeflow-text-muted text-center py-8">
                        No hay objetivos activos. ¡Configura tus objetivos semanales en la sección El Contrato!
                    </p>
                )}
            </div>
        </div>
    );
}
