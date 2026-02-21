import { useState, useEffect } from "react"
import { ArrowRight, Activity, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { getCookie } from "@/lib/csrf"

export default function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [csrfToken, setCsrfToken] = useState<string>("")
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [role, setRole] = useState<'patient' | 'doctor' | 'provider'>('patient')
    const [error, setError] = useState<string | null>(null)

    // Assuming formData and handleChange are defined elsewhere or need to be added
    // For now, I'll add dummy ones to make the code syntactically correct based on usage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

    useEffect(() => {
        const token = getCookie("csrftoken")
        if (token) setCsrfToken(token)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/accounts/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (data.success) {
                if (data.otp_required) {
                    localStorage.setItem('verification_email', formData.username)
                    localStorage.setItem('verification_type', 'login')
                    navigate('/verify-otp')
                    return
                }
                localStorage.setItem('token', data.token)
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                }
                navigate('/dashboard')
            } else {
                setError(data.error || "Login failed")
            }
        } catch (err) {
            setError("Network error. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[url('/bg-grid.svg')] bg-[#FDFBF7] bg-grid-pattern selection:bg-[#20B2AA]/20 selection:text-[#0F827A] flex items-center justify-center p-4 py-12 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto rounded-[3rem] skeuo-premium-surface overflow-hidden flex flex-col md:flex-row relative z-10"
            >
                {/* Left Side: Form Area */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 relative flex flex-col justify-center">

                    <div className="mb-12 flex flex-col items-start relative z-10">
                        <img src="/Logo.png" alt="HealthTrack Logo" className="h-8 mb-8 drop-shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/')} />
                        <h1 className="text-4xl md:text-5xl font-black text-[#173836] mb-3 tracking-tighter">
                            Welcome Back.
                        </h1>
                        <p className="text-[#173836]/60 text-lg font-medium">
                            Enter your credentials to access your terminal.
                        </p>
                    </div>

                    <div className="flex bg-[#FDFBF7] p-2 rounded-[1.5rem] shadow-skeuo-premium-inset mb-10 relative z-10 border-t-2 border-l-2 border-white/60 border-b border-r border-[#d8d6d1]/20">
                        {['patient', 'doctor', 'provider'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r as "patient" | "doctor" | "provider")}
                                className={cn(
                                    "flex-1 py-3 text-sm font-bold rounded-xl capitalize transition-all duration-300",
                                    role === r
                                        ? "bg-white text-[#0F827A] shadow-skeuo-premium border border-white/60"
                                        : "text-[#173836]/50 hover:text-[#0F827A] hover:bg-white/30"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 mb-8 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl font-semibold shadow-sm text-center">
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#173836] ml-2 uppercase tracking-wider text-xs">Email or Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-skeuo-premium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-2 mr-2">
                                <label className="text-sm font-bold text-[#173836] uppercase tracking-wider text-xs">Password</label>
                                <a href="/forgot-password" className="text-sm font-bold text-[#20B2AA] hover:text-[#0F827A] transition-colors">Forgot Password?</a>
                            </div>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-skeuo-premium"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-skeuo-primary h-16 mt-8 flex items-center justify-center gap-2 text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authenticate"}
                            {!isLoading && <ArrowRight className="w-5 h-5 opacity-80" />}
                        </button>

                        <div className="text-center mt-8">
                            <span className="text-[#173836]/60 font-medium">Don't have an account? </span>
                            <a href="/register" className="text-[#20B2AA] font-bold hover:text-[#0F827A] transition-colors">Apply for Access</a>
                        </div>
                    </form>
                </div>

                {/* Right Side: Visual Branding Area */}
                <div className="hidden md:flex w-1/2 bg-[#20B2AA] relative overflow-hidden flex-col items-center justify-center p-12 lg:p-20 text-center">
                    {/* Inner Skeuomorphic Shadow for depth separation */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"></div>

                    {/* Dynamic Lighting Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.4),transparent)] z-0 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[#0F827A]/30 mix-blend-multiply"></div>

                    {/* Premium Graphic Element */}
                    <motion.div
                        initial={{ scale: 0.9, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 mb-12 z-10"
                    >
                        <div className="absolute inset-0 bg-[#173836]/20 rounded-[3rem] blur-2xl transform translate-y-8"></div>
                        <div className="relative w-full h-full bg-[#FDFBF7] border-4 border-white/40 rounded-[3rem] shadow-[20px_20px_40px_rgba(0,0,0,0.2),-10px_-10px_30px_rgba(255,255,255,0.3)] flex items-center justify-center hover:scale-105 transition-transform duration-700 ease-out group">
                            <Activity className="w-24 h-24 lg:w-32 lg:h-32 text-[#20B2AA] drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </motion.div>

                    <div className="space-y-6 relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                            HealthTrack OS <br />
                            <span className="text-[#FDFBF7]/90 font-medium text-3xl">Ultimate Edition</span>
                        </h2>
                        <p className="text-white/80 leading-relaxed text-lg lg:text-xl font-medium max-w-md mx-auto">
                            Experience the pinnacle of hospital administration and telemetry integration.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
