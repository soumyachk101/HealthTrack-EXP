import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Activity, ArrowRight, Shield, Brain, Menu, X, Pill, HeartPulse
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'

export default function Landing() {
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const features = [
        {
            icon: HeartPulse,
            title: "Real-time Telemetry",
            desc: "Continuous monitoring of vitals with millisecond precision and historical trend analysis.",
            color: "text-rose-500",
            bg: "bg-rose-500/10",
        },
        {
            icon: Pill,
            title: "Automated Regimens",
            desc: "Smart prediction and management of medical inventory with active interaction safeguards.",
            color: "text-teal-600",
            bg: "bg-teal-600/10",
        },
        {
            icon: Brain,
            title: "Cognitive Insights",
            desc: "Machine-learning driven correlation between your physiological data and behavioral patterns.",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            icon: Shield,
            title: "Bank-Grade Vault",
            desc: "Your medical history secured by military-grade encryption with decentralized access controls.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        }
    ]

    return (
        <div className="min-h-screen bg-[url('/bg-grid.svg')] bg-[#FDFBF7] bg-grid-pattern selection:bg-[#20B2AA]/20 selection:text-[#0F827A] overflow-x-hidden relative">

            {/* NAV - Skeuomorphic Premium Pill */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-500"
            >
                <nav className={cn(
                    "relative flex items-center justify-between transition-all duration-500",
                    scrolled
                        ? "px-5 py-2.5 w-full max-w-4xl rounded-[2.5rem] bg-[#FDFBF7]/95 shadow-[15px_15px_30px_rgba(0,0,0,0.08),-15px_-15px_30px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.8)] border border-white/60 backdrop-blur-xl"
                        : "px-6 py-4 w-full max-w-5xl rounded-[3rem] bg-transparent"
                )}>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <img src="/Logo.png" alt="HealthTrack Logo" className={cn("w-auto object-contain transition-all duration-500 group-hover:scale-105", scrolled ? "h-[28px]" : "h-[36px]")} />
                    </div>

                    <div className="hidden md:flex items-center gap-4 p-1.5 rounded-[1.5rem]">
                        <Link to="/login">
                            <button className="px-6 py-2.5 rounded-xl font-bold transition-all duration-200 ease-out text-[#173836]/70 hover:text-[#0F827A] hover:bg-white/50">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-skeuo-primary px-6 py-2.5">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-12 h-12 rounded-2xl bg-[#FDFBF7] shadow-skeuo-premium border border-white/60 flex items-center justify-center text-[#173836] active:shadow-skeuo-premium-inset active:scale-95 transition-all"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
                        className="absolute top-full left-0 right-0 mt-4 overflow-hidden md:hidden rounded-[2.5rem] skeuo-premium-surface"
                    >
                        <div className="p-4 flex flex-col gap-3">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full justify-center btn-skeuo">Sign In</button>
                            </Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full justify-center btn-skeuo-primary shadow-md">Get Started</button>
                            </Link>
                        </div>
                    </motion.div>
                </nav>
            </motion.header>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 z-10 min-h-screen flex flex-col justify-center items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8 relative">
                        {/* Ultra-Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDFBF7] shadow-skeuo-premium-inset border-t-2 border-l-2 border-white/60 border-b-2 border-r-2 border-[#d8d6d1]/20 text-[#0F827A] text-sm font-bold mx-auto tracking-wide"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B2AA] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#20B2AA] shadow-[0_0_8px_rgba(32,178,170,0.8)]"></span>
                            </span>
                            HealthTrack OS v4.0 Ultimate
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#173836] via-[#173836]/90 to-[#20B2AA] leading-[1.05] drop-shadow-sm pb-2"
                        >
                            Crystal Clear <br />
                            Healthcare.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-2xl text-[#173836]/70 max-w-2xl mx-auto leading-relaxed font-semibold"
                        >
                            The unified platform for patients, doctors, and providers. Unparalleled transparency packed in a beautiful interface.
                        </motion.p>

                        {/* Action Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto bg-[#FDFBF7] shadow-skeuo-premium-inset p-4 rounded-[2.5rem] border-t-2 border-l-2 border-white/60 border-b border-r border-[#d8d6d1]/20"
                        >
                            <Link to="/register" className="w-full sm:w-auto flex-1">
                                <button className="btn-skeuo-primary w-full h-16 text-lg flex items-center justify-center group">
                                    Patient Sign Up
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <div className="flex w-full sm:w-auto gap-3 flex-1">
                                <Link to="/register?role=doctor" className="flex-1">
                                    <button className="btn-skeuo w-full h-16 text-center flex items-center justify-center">
                                        Doctor
                                    </button>
                                </Link>
                                <Link to="/register?role=provider" className="flex-1">
                                    <button className="btn-skeuo w-full h-16 text-center flex items-center justify-center">
                                        Provider
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Glass Mockup Graphic */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-28 w-full max-w-6xl mx-auto px-4 relative z-20"
                >
                    <div className="rounded-[3rem] bg-[#FDFBF7] shadow-skeuo-premium border border-white/60 p-4 md:p-6 relative overflow-hidden group animate-blob-float">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:animate-[shimmer_2s_infinite] transition-all"></div>

                        <div className="rounded-[2.5rem] bg-[#FDFBF7] overflow-hidden shadow-skeuo-premium-inset aspect-[16/9] md:aspect-[21/9] flex flex-col relative border-t-[3px] border-l-[3px] border-white/60 border-b-2 border-r-2 border-[#d8d6d1]/20">
                            {/* App Header Mock */}
                            <div className="h-14 bg-[#FDFBF7] border-b border-[#d8d6d1]/30 flex items-center px-6 gap-4 shadow-sm relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-skeuo-inset-sm"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-skeuo-inset-sm"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-skeuo-inset-sm"></div>
                                </div>
                                <div className="h-6 w-48 bg-[#FDFBF7] shadow-skeuo-inset-sm rounded-full border border-white/50"></div>
                            </div>

                            {/* App Content Mock */}
                            <div className="flex-1 p-6 md:p-8 grid grid-cols-12 gap-6 relative bg-slate-50/30">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent)] -z-10"></div>

                                <div className="col-span-3 space-y-4 hidden md:block">
                                    <div className="h-40 w-full bg-[#FDFBF7] shadow-skeuo-sm rounded-[1.5rem] border border-white/50 p-4">
                                        <div className="w-12 h-12 rounded-full bg-[#20B2AA]/20 shadow-skeuo-inset-sm mb-4 border border-white/50"></div>
                                        <div className="h-4 w-3/4 bg-slate-200/60 shadow-skeuo-inset-sm rounded-full mb-3"></div>
                                        <div className="h-4 w-1/2 bg-slate-200/60 shadow-skeuo-inset-sm rounded-full"></div>
                                    </div>
                                    <div className="h-12 w-full bg-[#FDFBF7] shadow-skeuo-sm rounded-xl border border-white/50"></div>
                                    <div className="h-12 w-full bg-[#FDFBF7] shadow-skeuo-sm rounded-xl border border-white/50"></div>
                                </div>
                                <div className="col-span-12 md:col-span-9 grid grid-cols-3 gap-6">
                                    <div className="col-span-3 md:col-span-2 bg-[#FDFBF7] shadow-skeuo-sm border border-white/50 rounded-[1.5rem] p-6 h-64 flex flex-col justify-between">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="h-8 w-32 bg-slate-200/60 shadow-skeuo-inset-sm rounded-lg"></div>
                                            <div className="w-10 h-10 rounded-full bg-[#FDFBF7] shadow-skeuo-sm border border-white/50"></div>
                                        </div>
                                        <div className="flex items-end gap-3 h-32">
                                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                                <div key={i} className="flex-1 bg-slate-100 shadow-skeuo-inset-sm rounded-full relative overflow-hidden border border-white/50">
                                                    <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#20B2AA] rounded-full shadow-inner"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-3 md:col-span-1 border border-white/50 bg-[#FDFBF7] shadow-skeuo-sm rounded-[1.5rem] p-6 h-64 flex flex-col items-center justify-center">
                                        <div className="w-24 h-24 rounded-full border-[6px] border-[#FDFBF7] shadow-skeuo-sm flex items-center justify-center bg-[#FDFBF7] shadow-skeuo-inset-sm relative">
                                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                                <circle cx="42" cy="42" r="38" fill="none" stroke="#20B2AA" strokeWidth="6" strokeDasharray="238" strokeDashoffset="47" className="mr-8"></circle>
                                            </svg>
                                            <span className="text-2xl font-black text-[#173836]">98%</span>
                                        </div>
                                        <div className="h-5 w-24 bg-slate-200/60 shadow-skeuo-inset-sm rounded-full mt-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section >

            {/* FEATURES SECTION (SKEUO BENTO) */}
            < section className="py-32 md:py-48 relative z-10" >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mb-20 text-center mx-auto">
                        <span className="px-5 py-2 rounded-full bg-[#FDFBF7] shadow-skeuo-premium-inset border-t-2 border-l-2 border-white/60 border-b border-r border-[#d8d6d1]/20 text-[#0F827A] font-bold tracking-widest text-xs mb-8 inline-block uppercase">The Engine</span>
                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#173836] to-[#173836]/80 mb-6 tracking-tighter">
                            Engineered for <span className="text-[#20B2AA]">Scale.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                key={idx}
                                className={cn(
                                    "p-10 skeuo-premium-surface hover:-translate-y-2 hover:animate-skeuo-pulse transition-all duration-500 group relative overflow-hidden",
                                    idx === 0 || idx === 3 ? "lg:col-span-2" : "lg:col-span-2"
                                )}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className={cn("w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 bg-[#FDFBF7] shadow-skeuo-premium-inset border-t-2 border-l-2 border-white/60 border-b border-r border-[#d8d6d1]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-[#0F827A] relative z-10")}>
                                    <feature.icon className="w-10 h-10 drop-shadow-md" />
                                </div>
                                <h3 className="text-3xl font-bold text-[#173836] mb-4 relative z-10 tracking-tight">{feature.title}</h3>
                                <p className="text-[#173836]/70 leading-relaxed font-medium text-lg relative z-10">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA SECTION */}
            < section className="py-32 md:py-48 relative overflow-hidden z-10" >
                <div className="container mx-auto px-4 relative text-center">

                    <div className="skeuo-premium-surface p-16 md:p-24 max-w-5xl mx-auto flex flex-col items-center relative overflow-hidden group hover:animate-skeuo-pulse cursor-pointer">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.6),transparent)] opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

                        <h2 className="text-5xl md:text-7xl font-black text-[#173836] mb-8 tracking-tighter relative z-10">
                            Ready for the future?
                        </h2>
                        <p className="text-2xl md:text-3xl text-[#173836]/70 max-w-3xl mx-auto mb-12 font-medium relative z-10">
                            Join thousands of patients and practitioners already inside the network.
                        </p>
                        <Link to="/register" className="relative z-10">
                            <button className="btn-skeuo-primary px-14 h-20 text-2xl flex items-center justify-center rounded-[1.5rem] shadow-[10px_10px_20px_#d8d6d1,-10px_-10px_20px_#ffffff] hover:scale-105 transition-all duration-300">
                                Create Free Account
                            </button>
                        </Link>
                    </div>
                </div>
            </section >

            {/* FOOTER */}
            < footer className="py-8 relative z-10 bg-[#FDFBF7] shadow-skeuo-sm border-t border-white/50" >
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-2">
                    <div className="text-[#173836]/60 text-sm font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#20B2AA]" />
                        © 2026 HealthTrack Platform. Powered by Skeuomorphism.
                    </div>
                </div>
            </footer >
        </div >
    )
} 
