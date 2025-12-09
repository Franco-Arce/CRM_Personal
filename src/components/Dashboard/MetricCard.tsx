import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    className?: string;
}

export default function MetricCard({ title, value, icon: Icon, trend, className = '' }: MetricCardProps) {
    return (
        <div className={`card ${className}`}>
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-codeflow-accent/10 text-codeflow-accent">
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm text-codeflow-text-muted">{title}</p>
                    <h3 className="text-2xl font-bold text-codeflow-text">{value}</h3>
                    {trend && (
                        <p className="text-xs text-green-400 mt-1 font-medium">
                            {trend}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
