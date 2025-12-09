import { create } from 'zustand';

// Types
export type Priority = 'High' | 'Medium' | 'Low';
export type ProjectStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Done';
export type GoalStatus = 'Approved' | 'Pending' | 'Failed';
export type Owner = 'Franco' | 'Rodrigo';

export interface Project {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    tags: string[];
    stack: string[];
    status: ProjectStatus;
}

export interface Goal {
    id: string;
    goal: string;
    priority: Priority;
    owner: Owner;
    status: GoalStatus;
    weekOf: string;
}

export interface CheckIn {
    victory: string;
    metGoal: boolean;
    failureAnalysis?: string;
    nextGoal: string;
}

interface StoreState {
    // Projects
    projects: Project[];
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    moveProject: (id: string, newStatus: ProjectStatus) => void;

    // Goals
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
    submitCheckIn: (checkIn: CheckIn, previousGoalId?: string) => void;
}

// Initial seeded projects
const initialProjects: Project[] = [
    {
        id: '1',
        title: 'Detector de "Churn" de Clientes',
        description: 'Modelo de Machine Learning para analizar comportamiento de clientes (tickets soporte, retrasos pagos) y predecir bajas. BI Puro + Incident Management.',
        priority: 'High',
        tags: ['ML', 'BI', 'Analytics'],
        stack: ['Python', 'Scikit-learn', 'SQL'],
        status: 'Backlog',
    },
    {
        id: '2',
        title: 'Automatizador de Reportes ETL ("The Lazy Tool")',
        description: 'Herramienta para subir archivos "sucios" (Excel mal formateado), aplicar reglas de limpieza y devolver CSV limpio + PDF de calidad de datos. Servicio B2B.',
        priority: 'Medium',
        tags: ['ETL', 'Automation', 'B2B'],
        stack: ['Python', 'Pandas', 'PDF generation'],
        status: 'To Do',
    },
];

export const useStore = create<StoreState>((set) => ({
    // Projects state
    projects: initialProjects,

    addProject: (project) =>
        set((state) => ({
            projects: [
                ...state.projects,
                { ...project, id: Date.now().toString() },
            ],
        })),

    updateProject: (id, updates) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === id ? { ...p, ...updates } : p
            ),
        })),

    deleteProject: (id) =>
        set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
        })),

    moveProject: (id, newStatus) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === id ? { ...p, status: newStatus } : p
            ),
        })),

    // Goals state
    goals: [],

    addGoal: (goal) =>
        set((state) => ({
            goals: [...state.goals, { ...goal, id: Date.now().toString() }],
        })),

    updateGoal: (id, updates) =>
        set((state) => ({
            goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),

    deleteGoal: (id) =>
        set((state) => ({
            goals: state.goals.filter((g) => g.id !== id),
        })),

    submitCheckIn: (checkIn, previousGoalId) =>
        set((state) => {
            const updatedGoals = previousGoalId
                ? state.goals.map((g) =>
                    g.id === previousGoalId
                        ? { ...g, status: checkIn.metGoal ? 'Approved' as GoalStatus : 'Failed' as GoalStatus }
                        : g
                )
                : state.goals;

            // Calculate next Friday
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
            const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7; // If today is Friday, next Friday is 7 days away
            const nextFriday = new Date(today);
            nextFriday.setDate(today.getDate() + daysUntilFriday);

            const newGoal: Goal = {
                id: Date.now().toString(),
                goal: checkIn.nextGoal, // Ensure this is correctly passed
                priority: 'High',
                owner: 'Franco',
                status: 'Pending',
                weekOf: nextFriday.toISOString().split('T')[0],
            };

            return {
                goals: [...updatedGoals, newGoal],
            };
        }),
}));
