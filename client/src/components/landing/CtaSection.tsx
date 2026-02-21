import { Link } from 'react-router-dom';

export default function CtaSection() {
    return (
        <>
            {/* CTA SECTION */}
            <section className="py-32 px-4 relative z-10 flex justify-center">
                <div className="w-[600px] h-[600px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[300px] shadow-skeuo-premium pointer-events-none -z-10"></div>

                <div className="relative z-10 text-center flex flex-col items-center">
                    <h2 className="text-6xl md:text-8xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Ready?
                    </h2>
                    <p className="text-xl text-slate-500 font-medium mb-12">
                        Join the future of tangible health tracking.
                    </p>
                    <Link to="/register">
                        <button className="btn-skeuo-primary px-10 py-5 text-xl">
                            Create Free Account
                        </button>
                    </Link>
                </div>
            </section>

            {/* FAB (Floating Action Button) */}
            <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-skeuo-primary !p-0 flex items-center justify-center shadow-2xl z-50 group">
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="text-white font-bold text-xl relative z-10">+</span>
            </button>
        </>
    );
}
