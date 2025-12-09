import { Pencil, Trash2 } from 'lucide-react';
import type { Goal } from '../../store/useStore';

interface GoalsTableProps {
    goals: Goal[];
    onEdit: (goal: Goal) => void;
    onDelete: (id: string) => void;
}

const statusColors = {
    Approved: 'bg-green-500/20 text-green-400 border-green-500/50',
    Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Failed: 'bg-red-500/20 text-red-400 border-red-500/50',
};

const priorityColors = {
    High: 'bg-red-500/20 text-red-400 border-red-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Low: 'bg-green-500/20 text-green-400 border-green-500/50',
};

const ownerColors = {
    Franco: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    Rodrigo: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
};

export default function GoalsTable({ goals, onEdit, onDelete }: GoalsTableProps) {
    if (goals.length === 0) {
        return (
            <div className="card text-center py-12">
                <p className="text-codeflow-text-muted">
                    No hay objetivos aún. ¡Agrega tu primer objetivo o completa un check-in semanal!
                </p>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-codeflow-border">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Semana Del
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Objetivo
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Prioridad
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Responsable
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Estado
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-codeflow-text">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals.map((goal) => (
                            <tr
                                key={goal.id}
                                className="border-b border-codeflow-border/50 hover:bg-codeflow-hover/30 transition-colors"
                            >
                                <td className="py-3 px-4 text-sm text-codeflow-text-muted">
                                    {new Date(goal.weekOf).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-sm text-codeflow-text">
                                    {goal.goal}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`badge border ${priorityColors[goal.priority]}`}>
                                        {goal.priority}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`badge border ${ownerColors[goal.owner]}`}>
                                        {goal.owner}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`badge border ${statusColors[goal.status]}`}>
                                        {goal.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(goal)}
                                            className="p-2 text-codeflow-text-muted hover:text-codeflow-accent hover:bg-codeflow-accent/10 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(goal.id)}
                                            className="p-2 text-codeflow-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
