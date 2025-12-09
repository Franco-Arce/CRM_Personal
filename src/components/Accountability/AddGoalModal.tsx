import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useStore, type Priority, type Owner, type Goal } from '../../store/useStore';

interface AddGoalModalProps {
    onClose: () => void;
    goalToEdit?: Goal | null;
}

export default function AddGoalModal({ onClose, goalToEdit }: AddGoalModalProps) {
    const { addGoal, updateGoal } = useStore();
    const [formData, setFormData] = useState({
        goal: '',
        priority: 'High' as Priority,
        owner: 'Franco' as Owner,
    });

    useEffect(() => {
        if (goalToEdit) {
            setFormData({
                goal: goalToEdit.goal,
                priority: goalToEdit.priority,
                owner: goalToEdit.owner,
            });
        }
    }, [goalToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (goalToEdit) {
            updateGoal(goalToEdit.id, {
                goal: formData.goal,
                priority: formData.priority,
                owner: formData.owner,
            });
        } else {
            addGoal({
                goal: formData.goal,
                priority: formData.priority,
                owner: formData.owner,
                status: 'Pending',
                weekOf: new Date().toISOString().split('T')[0],
            });
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-codeflow-text">
                        {goalToEdit ? 'Editar Objetivo' : 'Nuevo Objetivo'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-codeflow-text-muted hover:text-codeflow-text transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-codeflow-text-muted mb-1">
                            Objetivo
                        </label>
                        <input
                            type="text"
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                            className="input-field w-full"
                            placeholder="Ej: Completar curso de Docker"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-codeflow-text-muted mb-1">
                                Prioridad
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                                className="input-field w-full"
                            >
                                <option value="High">Alta</option>
                                <option value="Medium">Media</option>
                                <option value="Low">Baja</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-codeflow-text-muted mb-1">
                                Responsable
                            </label>
                            <select
                                value={formData.owner}
                                onChange={(e) => setFormData({ ...formData, owner: e.target.value as Owner })}
                                className="input-field w-full"
                            >
                                <option value="Franco">Franco</option>
                                <option value="Rodrigo">Rodrigo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1"
                        >
                            {goalToEdit ? 'Guardar Cambios' : 'Guardar Objetivo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
