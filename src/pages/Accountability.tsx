import { useState } from 'react';
import { Plus, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { useStore, type Goal } from '../store/useStore';
import GoalsTable from '../components/Accountability/GoalsTable';
import CheckInModal from '../components/Accountability/CheckInModal';
import AddGoalModal from '../components/Accountability/AddGoalModal';

export default function Accountability() {
    const { goals, deleteGoal } = useStore();
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);
    const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    const handleEdit = (goal: Goal) => {
        setEditingGoal(goal);
        setIsAddGoalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este objetivo?')) {
            deleteGoal(id);
        }
    };

    const handleCloseAddModal = () => {
        setIsAddGoalOpen(false);
        setEditingGoal(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-codeflow-text">El Contrato</h1>
                <p className="text-codeflow-text-muted mt-1">
                    Responsabilidad semanal y seguimiento de objetivos
                </p>
            </div>

            {/* Penalty Warning */}
            <div className="card border-l-4 border-red-500 bg-red-500/5">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-400 mb-1">
                            ⚠️ Penalización por Incumplimiento
                        </h3>
                        <p className="text-codeflow-text-muted">
                            Si no se cumple el objetivo semanal:
                            <span className="text-codeflow-text font-semibold ml-1">
                                $10.000 ARS + 24 horas sin redes sociales
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => setIsCheckInOpen(true)}
                    className="btn-primary flex-1 py-4 text-lg flex items-center justify-center gap-2"
                >
                    <ClipboardCheck size={24} />
                    Check-in Semanal
                </button>
                <button
                    onClick={() => setIsAddGoalOpen(true)}
                    className="btn-secondary flex-1 py-4 text-lg flex items-center justify-center gap-2"
                >
                    <Plus size={24} />
                    Agregar Objetivo
                </button>
            </div>

            {/* Goals Table */}
            <GoalsTable
                goals={goals}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modals */}
            {isCheckInOpen && <CheckInModal onClose={() => setIsCheckInOpen(false)} />}
            {isAddGoalOpen && (
                <AddGoalModal
                    onClose={handleCloseAddModal}
                    goalToEdit={editingGoal}
                />
            )}
        </div>
    );
}
