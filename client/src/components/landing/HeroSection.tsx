import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <main className="relative pt-[140px] pb-20 px-4 flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                {/* Top Badge */}
                <div className="mb-6 flex items-center gap-2 skeuo-surface px-4 py-1.5 rounded-full border border-white/80 shadow-skeuo-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">System Online v2.5</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                    Design Your <br className="hidden md:block" /> Health Future
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                    Experience the feel of premium healthcare. Tactile tracking for your body and mind.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/register">
                        <button className="btn-skeuo-primary px-8 py-4 text-lg w-full sm:w-auto">
                            Patient Sign Up
                        </button>
                    </Link>
                    <Link to="/book-demo">
                        <button className="btn-skeuo px-8 py-4 text-lg w-full sm:w-auto">
                            Doctor Join
                        </button>
                    </Link>
                    <Link to="/book-demo">
                        <button className="btn-skeuo px-8 py-4 text-lg w-full sm:w-auto">
                            Provider Join
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
