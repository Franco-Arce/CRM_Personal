import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Project, ProjectStatus } from '../../store/useStore';
import ProjectCard from './ProjectCard';

interface KanbanColumnProps {
    status: ProjectStatus;
    projects: Project[];
}

export default function KanbanColumn({ status, projects }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    // Safety check to ensure projects is always an array
    const safeProjects = projects || [];

    return (
        <div className="flex flex-col h-full">
            {/* Column Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-codeflow-text">{status}</h3>
                    <span className="badge bg-codeflow-hover text-codeflow-text-muted">
                        {safeProjects.length}
                    </span>
                </div>
                <div className="h-1 bg-codeflow-accent rounded-full mt-2" />
            </div>

            {/* Cards Container */}
            <div
                ref={setNodeRef}
                className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg bg-codeflow-bg/50"
            >
                <SortableContext
                    items={safeProjects.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {safeProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </SortableContext>

                {safeProjects.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-codeflow-text-muted text-sm">
                        Sin proyectos
                    </div>
                )}
            </div>
        </div>
    );
}
