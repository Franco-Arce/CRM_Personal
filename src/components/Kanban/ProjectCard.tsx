import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Project } from '../../store/useStore';

interface ProjectCardProps {
    project: Project;
}

const priorityColors = {
    High: 'bg-red-500/20 text-red-400 border-red-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Low: 'bg-green-500/20 text-green-400 border-green-500/50',
};

export default function ProjectCard({ project }: ProjectCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="card cursor-grab active:cursor-grabbing hover:shadow-xl transition-shadow group"
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="flex items-start gap-3"
            >
                <GripVertical
                    size={20}
                    className="text-codeflow-text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex-1 space-y-3">
                    {/* Title & Priority */}
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-codeflow-text leading-tight">
                            {project.title}
                        </h4>
                        <span className={`badge border ${priorityColors[project.priority]}`}>
                            {project.priority}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-codeflow-text-muted line-clamp-3">
                        {project.description}
                    </p>

                    {/* Stack */}
                    {project.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {project.stack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="badge bg-codeflow-accent/20 text-codeflow-accent text-xs"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="badge bg-codeflow-hover text-codeflow-text-muted text-xs"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
