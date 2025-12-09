import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface CheckInModalProps {
    onClose: () => void;
}

export default function CheckInModal({ onClose }: CheckInModalProps) {
    const { goals, submitCheckIn } = useStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        victory: '',
        metGoal: true,
        failureAnalysis: '',
        nextGoal: '',
    });

    const lastGoal = goals[goals.length - 1];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitCheckIn(formData, lastGoal?.id);
        onClose();
    };

    const canProceed = () => {
        if (step === 1) return formData.victory.trim().length > 0;
        if (step === 2) return true;
        if (step === 3) {
            if (formData.metGoal) {
                // If met goal, we are showing the Next Goal input on step 3
                return formData.nextGoal.trim().length > 0;
            } else {
                // If failed, we are showing Failure Analysis
                return formData.failureAnalysis.trim().length > 0;
            }
        }
        if (step === 4) return formData.nextGoal.trim().length > 0;
        return false;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-2xl w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-codeflow-text">Check-In Semanal</h2>
                        <p className="text-sm text-codeflow-text-muted mt-1">
                            Paso {step} de 4
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-codeflow-text-muted hover:text-codeflow-text transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="h-2 bg-codeflow-hover rounded-full overflow-hidden">
                        <div
                            className="h-full bg-codeflow-accent transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Victory */}
                    {step === 1 && (
                        <div>
                            <label className="block text-lg font-semibold text-codeflow-text mb-3">
                                🎉 ¿Cuál fue tu victoria de la semana?
                            </label>
                            <textarea
                                value={formData.victory}
                                onChange={(e) => setFormData({ ...formData, victory: e.target.value })}
                                className="input-field w-full min-h-[120px]"
                                placeholder="Describe tu mayor logro esta semana..."
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Step 2: Met Goal */}
                    {step === 2 && (
                        <div>
                            <label className="block text-lg font-semibold text-codeflow-text mb-3">
                                ¿Cumpliste el objetivo de la semana pasada?
                            </label>
                            {lastGoal && (
                                <div className="card bg-codeflow-hover mb-4 p-3">
                                    <p className="text-sm text-codeflow-text-muted mb-1">Objetivo anterior:</p>
                                    <p className="text-codeflow-text font-medium">{lastGoal.goal}</p>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, metGoal: true })}
                                    className={`flex-1 py-4 rounded-lg border-2 transition-all ${formData.metGoal
                                        ? 'border-green-500 bg-green-500/20 text-green-400'
                                        : 'border-codeflow-border bg-codeflow-bg text-codeflow-text-muted hover:border-green-500/50'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">✅</div>
                                    <div className="font-semibold">¡Sí, lo logré!</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, metGoal: false })}
                                    className={`flex-1 py-4 rounded-lg border-2 transition-all ${!formData.metGoal
                                        ? 'border-red-500 bg-red-500/20 text-red-400'
                                        : 'border-codeflow-border bg-codeflow-bg text-codeflow-text-muted hover:border-red-500/50'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">❌</div>
                                    <div className="font-semibold">No, no pude</div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Failure Analysis */}
                    {step === 3 && !formData.metGoal && (
                        <div>
                            <label className="block text-lg font-semibold text-codeflow-text mb-3">
                                💭 ¿Qué pasó? (Análisis de Fallo)
                            </label>
                            <textarea
                                value={formData.failureAnalysis}
                                onChange={(e) => setFormData({ ...formData, failureAnalysis: e.target.value })}
                                className="input-field w-full min-h-[120px]"
                                placeholder="Explica por qué no cumpliste el objetivo y qué aprendiste..."
                                autoFocus
                            />
                            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                                <p className="text-sm text-red-300">
                                    ⚠️ Recuerda: Aplica penalización ($10.000 + 24hrs ban)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3 (if met goal) or Step 4: Next Goal */}
                    {((step === 3 && formData.metGoal) || step === 4) && (
                        <div>
                            <label className="block text-lg font-semibold text-codeflow-text mb-3">
                                🎯 ¿Cuál es tu objetivo para la próxima semana?
                            </label>
                            <input
                                type="text"
                                value={formData.nextGoal}
                                onChange={(e) => setFormData({ ...formData, nextGoal: e.target.value })}
                                className="input-field w-full"
                                placeholder="Ingresa tu objetivo para la próxima semana..."
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                Atrás
                            </button>
                        )}

                        {((step < 3) || (step === 3 && !formData.metGoal)) ? (
                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                disabled={!canProceed()}
                                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Siguiente
                                <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!canProceed()}
                                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Completar Check-In
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
