import { Activity, Link2, Brain, Shield } from "lucide-react";

export default function FeaturesBento() {
    return (
        <section className="py-24 px-4 bg-transparent relative z-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-16">
                    <span className="text-xs font-bold tracking-widest text-teal-500 uppercase mb-2 block">System Capabilities</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Tangible Results.<br />
                        <span className="text-slate-400">Real Impact.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Highlighting Card 1 */}
                    <div className="skeuo-card p-8 md:p-10 md:col-span-2 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl skeuo-surface flex items-center justify-center mb-6">
                            <Activity className="w-8 h-8 text-teal-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Precision Vitals</h3>
                        <p className="text-slate-500 text-lg mb-8 max-w-2xl">
                            Medical-grade accuracy for monitoring your body's most critical signals in real-time.
                        </p>
                        <div className="skeuo-surface-inset rounded-2xl p-6 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-slate-700">Heart Rate Variance</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span className="text-sm font-bold text-slate-700">Blood Oxygen (SpO2)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-slate-700">Sleep Architecture</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="skeuo-card p-8 md:p-10 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl skeuo-surface flex items-center justify-center mb-6">
                            <Link2 className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Regimen</h3>
                        <p className="text-slate-500 text-base mb-8">
                            An intelligent assistant that manages your entire medication schedule and inventory.
                        </p>
                        <div className="skeuo-surface-inset rounded-2xl p-6 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Interaction Warnings</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Refill Predictions</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Family Sharing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="skeuo-card p-8 md:p-10 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl skeuo-surface flex items-center justify-center mb-6">
                            <Brain className="w-8 h-8 text-purple-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Neuro Insights</h3>
                        <p className="text-slate-500 text-base mb-8">
                            Understanding your mental state through behavioral patterns and AI analysis.
                        </p>
                        <div className="skeuo-surface-inset rounded-2xl p-6 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Mood correlations</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Stress triggers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <span className="text-xs font-bold text-slate-700">Focus metrics</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Highlighting Card 4 */}
                    <div className="skeuo-card p-8 md:p-10 md:col-span-2 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl skeuo-surface flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-teal-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Vault Security</h3>
                        <p className="text-slate-500 text-lg mb-8 max-w-2xl">
                            Your data is encrypted, decentralized, and yours. We facilitate sharing, we don't own it.
                        </p>
                        <div className="skeuo-surface-inset rounded-2xl p-6 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-slate-700">End-to-end Encryption</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span className="text-sm font-bold text-slate-700">HIPAA Compliant</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                    <span className="text-sm font-bold text-slate-700">Audit Logs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
