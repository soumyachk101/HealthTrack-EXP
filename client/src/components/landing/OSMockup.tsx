import { Activity, Link2, Brain } from 'lucide-react';

export default function OSMockup() {
    return (
        <div className="mt-24 w-full max-w-5xl mx-auto relative perspective-[2000px]">
            <div className="skeuo-surface rounded-[40px] p-6 border-4 border-white transform rotate-x-[5deg] shadow-skeuo-premium mx-4 sm:mx-0">
                {/* OS Header */}
                <div className="flex items-center gap-2 mb-6 ml-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-400 skeuo-inset-sm"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 skeuo-inset-sm"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-400 skeuo-inset-sm"></div>
                </div>

                {/* OS Body Layout */}
                <div className="flex flex-col md:flex-row gap-6 h-[400px] md:h-[500px]">
                    {/* Sidebar Controls */}
                    <div className="flex flex-row md:flex-col gap-4 justify-center md:justify-start">
                        <button className="w-14 h-14 rounded-full skeuo-surface flex items-center justify-center text-teal-500 active:skeuo-surface-inset transition-all group">
                            <Activity className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 rounded-full skeuo-surface flex items-center justify-center text-slate-400 active:skeuo-surface-inset transition-all group">
                            <Link2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-14 h-14 rounded-full skeuo-surface flex items-center justify-center text-slate-400 active:skeuo-surface-inset transition-all group">
                            <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 skeuo-surface-inset rounded-[30px] p-6 md:p-10 flex flex-col md:flex-row gap-6 relative overflow-hidden bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23cbd5e1\' fill-opacity=\'0.2\'/%3E%3C/svg%3E')]">
                        {/* Heart Chart Block */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-800">Heart</h3>
                                <div className="w-10 h-10 rounded-full skeuo-surface flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>
                            {/* Chart Placeholder (Inset Line) */}
                            {/* This represents the smooth graph line area */}
                            <div className="w-full h-32 md:h-48 mt-4 relative">
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0,50 Q25,30 50,70 T100,50 L100,100 L0,100 Z" fill="url(#blue-grad)" fillOpacity="0.1" />
                                    <path d="M0,50 Q25,30 50,70 T100,50" fill="transparent" stroke="#14b8a6" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#14b8a6" />
                                            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Score Block */}
                        <div className="w-full md:w-64 flex flex-col gap-6">
                            <div className="w-full h-40 skeuo-surface rounded-[30px] flex items-center justify-center flex-col relative overflow-hidden">
                                {/* Subtle glow behind score */}
                                <div className="absolute inset-0 bg-teal-500/5 blur-xl"></div>
                                <span className="text-4xl font-extrabold text-teal-600 block leading-none">98</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Score</span>
                                <span className="text-sm font-medium text-slate-500 mt-1">Excellent</span>
                            </div>
                            <div className="flex-1 skeuo-surface rounded-[30px] flex items-center justify-center p-4">
                                <button className="btn-skeuo w-full !text-teal-600">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
