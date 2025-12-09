import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore, type Priority, type ProjectStatus } from '../../store/useStore';

interface AddProjectModalProps {
    onClose: () => void;
}

export default function AddProjectModal({ onClose }: AddProjectModalProps) {
    const { addProject } = useStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium' as Priority,
        tags: '',
        stack: '',
        status: 'Backlog' as ProjectStatus,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addProject({
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
            stack: formData.stack.split(',').map((s) => s.trim()).filter(Boolean),
            status: formData.status,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-codeflow-text">Agregar Nuevo Proyecto</h2>
                    <button
                        onClick={onClose}
                        className="text-codeflow-text-muted hover:text-codeflow-text transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-codeflow-text mb-2">
                            Título del Proyecto *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input-field w-full"
                            placeholder="ej., Dashboard de Analítica de Clientes"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-codeflow-text mb-2">
                            Descripción *
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field w-full min-h-[100px]"
                            placeholder="Describe los objetivos y alcance del proyecto..."
                        />
                    </div>

                    {/* Priority & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-codeflow-text mb-2">
                                Prioridad
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                                className="input-field w-full"
                            >
                                <option value="Low">Baja</option>
                                <option value="Medium">Media</option>
                                <option value="High">Alta</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-codeflow-text mb-2">
                                Estado Inicial
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                                className="input-field w-full"
                            >
                                <option value="Backlog">Backlog</option>
                                <option value="To Do">Por Hacer</option>
                                <option value="In Progress">En Progreso</option>
                                <option value="Done">Hecho</option>
                            </select>
                        </div>
                    </div>

                    {/* Stack */}
                    <div>
                        <label className="block text-sm font-medium text-codeflow-text mb-2">
                            Tech Stack
                        </label>
                        <input
                            type="text"
                            value={formData.stack}
                            onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                            className="input-field w-full"
                            placeholder="Python, React, PostgreSQL (separado por comas)"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-codeflow-text mb-2">
                            Etiquetas
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="input-field w-full"
                            placeholder="ML, Analytics, B2B (separado por comas)"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="btn-primary flex-1">
                            Agregar Proyecto
                        </button>
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
