export default function Footer() {
    return (
        <footer className="py-8 pb-12 border-t border-slate-200/50 relative z-10 mt-20">
            <div className="max-w-5xl mx-auto px-4 flex justify-center">
                <div className="skeuo-surface px-6 py-2 rounded-full flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>© 2026 HealthTrack+</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>v2.5.0 SKEUO</span>
                </div>
            </div>
        </footer>
    );
}
