import { useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useStore, type ProjectStatus } from '../store/useStore';
import KanbanColumn from '../components/Kanban/KanbanColumn';
import ProjectCard from '../components/Kanban/ProjectCard';
import AddProjectModal from '../components/Kanban/AddProjectModal';

const columns: ProjectStatus[] = ['Backlog', 'To Do', 'In Progress', 'Done'];

export default function ProjectsCRM() {
    const { projects, moveProject } = useStore();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId !== overId) {
            // Check if dropped over a column
            if (columns.includes(overId as ProjectStatus)) {
                moveProject(activeId, overId as ProjectStatus);
            } else {
                // Dropped over another project, find its status
                const overProject = projects.find((p) => p.id === overId);
                if (overProject) {
                    moveProject(activeId, overProject.status);
                }
            }
        }

        setActiveId(null);
    };

    const activeProject = activeId ? projects.find((p) => p.id === activeId) : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-codeflow-text">Proyectos CRM</h1>
                    <p className="text-codeflow-text-muted mt-1">Gestiona tus proyectos de desarrollo</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nuevo Proyecto
                </button>
            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-4 gap-6">
                    {columns.map((status) => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            projects={projects.filter((p) => p.status === status)}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeProject ? (
                        <div className="rotate-3 opacity-80">
                            <ProjectCard project={activeProject} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {/* Add Project Modal */}
            {isAddModalOpen && (
                <AddProjectModal onClose={() => setIsAddModalOpen(false)} />
            )}
        </div>
    );
}
