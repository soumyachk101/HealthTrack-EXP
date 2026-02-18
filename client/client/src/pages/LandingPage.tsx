import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Activity, ArrowRight, Pill, Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useTransform, useSpring } from 'framer-motion'

// --- Magnetic Button Component ---


// --- Card Stack Item ---


export default function Landing() {
    const [scrolled, setScrolled] = useState(false)

    // Smooth Mouse parallax (kept subtle for skeuo)
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set((clientX - centerX) / centerX);
            mouseY.set((clientY - centerY) / centerY);
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const rotateX = useTransform(mouseY, [-1, 1], [5, -5]); // Reduced rotation for cleaner look
    const rotateY = useTransform(mouseX, [-1, 1], [-5, 5]);

    // Features Data - Skeuomorphic Icons & Colors
    const features = [
        {
            icon: Activity,
            title: "Precision Vitals",
            desc: "Medical-grade accuracy for monitoring your body's most critical signals in real-time.",
            points: ["Heart Rate Variance", "Blood Oxygen (SpO2)", "Sleep Architecture"],
            color: "text-teal-600",
        },
        {
            icon: Pill,
            title: "Smart Regimen",
            desc: "An intelligent assistant that manages your entire medication schedule and inventory.",
            points: ["Interaction Warnings", "Refill Predictions", "Family Sharing"],
            color: "text-blue-600",
        },
        {
            icon: Brain,
            title: "Neuro Insights",
            desc: "Understanding your mental state through behavioral patterns and AI analysis.",
            points: ["Mood correlations", "Stress triggers", "Focus metrics"],
            color: "text-purple-600",
        },
        {
            icon: Shield,
            title: "Vault Security",
            desc: "Your data is encrypted, decentralized, and yours. We facilitate sharing, we don't own it.",
            points: ["End-to-end Encryption", "HIPAA Compliant", "Audit Logs"],
            color: "text-emerald-600",
        }
    ]

    return (
        <div className="min-h-screen bg-[#EFF6FF] text-slate-700 font-sans selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden relative">

            {/* TEXTURE OVERLAY */}
            <div className="bg-texture"></div>

            {/* NAV - Floating Skeuomorphic Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none px-4">
                <motion.nav
                    initial={{ y: -100, width: "90%" }}
                    animate={{ y: 0, width: scrolled ? "min(400px, 90%)" : "min(600px, 95%)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={cn(
                        "pointer-events-auto h-20 rounded-2xl flex items-center justify-between px-4 transition-all duration-300",
                        scrolled
                            ? "bg-[#EFF6FF]/90 backdrop-blur-md shadow-skeuo-md border border-white/50"
                            : "bg-[#EFF6FF] shadow-skeuo-lg border border-white/50"
                    )}
                >
                    <div className="flex items-center gap-3 pl-2">
                        <div className="w-10 h-10 rounded-full bg-[#EFF6FF] shadow-skeuo-sm flex items-center justify-center text-teal-600 border border-white/50 active:shadow-skeuo-inset-sm transition-shadow cursor-pointer">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className={cn("font-bold text-slate-700 text-lg tracking-tight transition-opacity duration-300 hidden sm:inline", scrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                            HealthTrack<span className="text-teal-500">+</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 pr-1">
                        <Link to="/login">
                            <button className="btn-skeuo text-xs sm:text-sm px-4 sm:px-6 py-2.5">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-skeuo-primary text-xs sm:text-sm px-4 sm:px-6 py-2.5 whitespace-nowrap">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </motion.nav>
            </header>

            {/* HERO */}
            <section className="relative pt-28 sm:pt-48 pb-20 sm:pb-32 z-10 min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">

                {/* DECORATIVE BACKGROUND ELEMENTS (Skeuomorphic Shapes) */}
                <div className="absolute top-20 sm:top-40 left-[-5%] sm:left-[10%] w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#EFF6FF] shadow-skeuo-md opacity-60 animate-blob-float"></div>
                <div className="absolute top-40 sm:top-60 right-[-5%] sm:right-[15%] w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-[#EFF6FF] shadow-skeuo-convex opacity-50 animate-blob-float" style={{ animationDelay: '-2s' }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-6 sm:space-y-10"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#EFF6FF] shadow-skeuo-inset-sm border-b border-white/50 mb-2 sm:mb-4 cursor-default">
                        <span className="flex h-3 w-3 rounded-full bg-teal-500 shadow-[2px_2px_4px_#cdcaca,-2px_-2px_4px_#ffffff]"></span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">System Online</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-800 leading-[1.1] drop-shadow-sm px-2">
                        Design Your <br className="hidden sm:block" />
                        <span className="text-teal-600 relative inline-block mt-1 sm:mt-0">
                            Health Future
                            {/* Underline Highlight */}
                            <svg className="absolute w-full h-2 sm:h-3 -bottom-1 left-0 text-teal-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium px-2">
                        Experience the feel of premium healthcare.
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mx-1 px-2 text-teal-600 font-bold relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-teal-100/50 after:-z-10"
                        >
                            Tactile
                        </motion.span>
                        tracking for your body and mind.
                    </p>

                    <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center">
                        <Link to="/register" className="w-full sm:w-auto">
                            <button className="btn-skeuo-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 w-full sm:min-w-[200px] flex items-center justify-center gap-3 group">
                                Patient Sign Up
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                        <div className="flex gap-4 w-full sm:w-auto justify-center">
                            <Link to="/register?role=doctor">
                                <button className="btn-skeuo text-xs sm:text-sm px-4 sm:px-6">
                                    Doctor Join
                                </button>
                            </Link>
                            <Link to="/register?role=provider">
                                <button className="btn-skeuo text-xs sm:text-sm px-4 sm:px-6">
                                    Provider Join
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* 3D FLOATING MOCKUP - SKEUOMORPHIC TABLET */}
                {/* Hidden on very small screens or simplified? Keeping it but scaling it down */}
                <motion.div
                    style={{ rotateX, rotateY, perspective: 1000 }}
                    className="mt-12 sm:mt-32 w-full max-w-5xl mx-auto relative group z-20 px-2 sm:px-0"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 10 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="rounded-[2rem] sm:rounded-[3rem] bg-[#EFF6FF] p-0 sm:p-6 shadow-none sm:shadow-[20px_20px_60px_#cad4e0,-20px_-20px_60px_#ffffff] border-none sm:border border-white/80"
                    >
                        {/* Physical Bezel - Hidden on Mobile for cleaner look */}
                        <div className="rounded-[1.5rem] sm:rounded-[2.5rem] bg-transparent sm:bg-[#e0eafc] p-0 sm:p-2 shadow-none sm:shadow-inner border-none sm:border border-slate-200">
                            {/* Screen */}
                            <div className="rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden bg-[#EFF6FF] aspect-[9/16] sm:aspect-[16/9] flex flex-col shadow-[inset_2px_2px_10px_rgba(0,0,0,0.05)] border border-white relative">
                                {/* Header Bar */}
                                <div className="h-12 sm:h-16 bg-[#EFF6FF] border-b border-slate-200/60 flex items-center px-4 sm:px-8 gap-4 shadow-sm z-10 shrink-0">
                                    <div className="flex gap-2 sm:gap-3">
                                        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-400 shadow-sm"></div>
                                        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                                        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-400 shadow-sm"></div>
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="w-32 sm:w-64 h-8 sm:h-10 bg-[#EFF6FF] rounded-lg shadow-skeuo-inset-sm flex items-center justify-center text-[10px] sm:text-xs text-slate-400 font-bold tracking-wide">HEALTH_TRACK_OS</div>
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 p-4 sm:p-8 bg-[#F8FAFC] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 relative overflow-y-auto sm:overflow-hidden">
                                    {/* Texture on Screen */}
                                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                                    {/* Sidebar (Hidden on mobile) */}
                                    <div className="col-span-1 hidden md:flex flex-col gap-6 items-center pt-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] shadow-skeuo-md flex items-center justify-center text-teal-600"><Activity className="w-6 h-6" /></div>
                                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] shadow-skeuo-sm flex items-center justify-center text-slate-400 hover:text-teal-500 transition-colors"><Shield className="w-5 h-5" /></div>
                                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] shadow-skeuo-sm flex items-center justify-center text-slate-400 hover:text-teal-500 transition-colors"><Pill className="w-5 h-5" /></div>
                                    </div>

                                    {/* Main Widget Area */}
                                    <div className="col-span-1 sm:col-span-12 md:col-span-11 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 z-10 p-2">
                                        {/* Big Widget */}
                                        <div className="col-span-1 sm:col-span-2 bg-[#EFF6FF] rounded-3xl p-4 sm:p-8 shadow-skeuo-lg border border-white/60 relative overflow-hidden">
                                            <div className="flex justify-between items-center mb-4 sm:mb-8">
                                                <h3 className="text-lg sm:text-2xl font-bold text-slate-700">Heart Rhythm</h3>
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EFF6FF] shadow-skeuo-convex flex items-center justify-center text-slate-400">
                                                    <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                            </div>
                                            {/* Graph Simulation */}
                                            <div className="flex items-end gap-1 sm:gap-3 h-24 sm:h-40 px-1 sm:px-2 pb-2">
                                                {[30, 50, 45, 80, 60, 90, 55, 70, 40].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-[#EFF6FF] rounded-full shadow-skeuo-inset-sm relative overflow-hidden group">
                                                        <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-teal-500 rounded-full opacity-80 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Small Widget */}
                                        <div className="col-span-1 bg-[#EFF6FF] rounded-3xl p-6 sm:p-8 shadow-skeuo-convex border border-white/60 flex flex-row sm:flex-col justify-between items-center text-center gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EFF6FF] shadow-skeuo-md flex items-center justify-center text-teal-500 mb-2 sm:mb-4 border border-white">
                                                    <span className="text-xl sm:text-2xl font-bold">98</span>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-center">
                                                <div className="text-slate-800 font-bold text-base sm:text-lg">Wellness Score</div>
                                                <div className="text-slate-400 text-xs sm:text-sm mt-1">Excellent Condition</div>
                                            </div>
                                            <button className="sm:mt-6 w-auto sm:w-full px-4 py-2 sm:py-3 rounded-xl bg-[#EFF6FF] shadow-skeuo-sm text-xs sm:text-sm font-bold text-teal-600 active:shadow-skeuo-inset-sm transition-all whitespace-nowrap">
                                                View Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* FEATURES */}
            <section className="py-20 sm:py-32 px-4 container mx-auto relative z-10">
                <div className="mb-16 sm:mb-24 md:pl-12 text-center md:text-left">
                    <span className="text-teal-600 font-bold uppercase text-xs mb-4 block tracking-widest shadow-none">System Capabilities</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800">
                        Tangible Results. <br />
                        <span className="text-slate-400">Real Impact.</span>
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10">
                    {features.map((feature, i) => (
                        <div key={i} className={cn(
                            "card-skeuo card-skeuo-hover group",
                            i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                        )}>
                            <div className="flex flex-col h-full justify-between">
                                <div className="mb-8 p-2">
                                    <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-skeuo-floating bg-[#EFF6FF] border border-white", feature.color)}>
                                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                                </div>
                                <div className="space-y-4 bg-[#F8FAFC]/50 p-4 sm:p-6 rounded-2xl shadow-skeuo-inset-sm border-b border-white">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        {feature.points.map((pt: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                                <div className={cn("w-2 h-2 rounded-full shadow-sm bg-teal-400")}></div>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TRUST SECTION REMOVED AS PER REQUEST */}

            {/* FINAL CTA */}
            <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-[#EFF6FF]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white shadow-skeuo-md opacity-40"></div>
                </div>

                <div className="relative z-10 space-y-6 sm:space-y-10">
                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-800 tracking-tight drop-shadow-sm">Ready?</h2>
                    <p className="text-lg sm:text-2xl text-slate-500 font-light">Join the future of tangible health tracking.</p>
                    <Link to="/register">
                        <button className="btn-skeuo-primary text-2xl px-12 py-6 rounded-2xl shadow-skeuo-lg hover:shadow-skeuo-floating transition-all transform hover:-translate-y-1">
                            Create Free Account
                        </button>
                    </Link>
                </div>
            </section>

            {/* SIMPLE FOOTER */}
            <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-200 bg-[#EFF6FF]">
                <div className="inline-block px-4 sm:px-6 py-2 rounded-full shadow-skeuo-inset-sm bg-[#EFF6FF]">
                    <p className="font-semibold text-xs sm:text-base">© 2026 HealthTrack+</p>
                </div>
            </footer>
        </div>
    )
}
