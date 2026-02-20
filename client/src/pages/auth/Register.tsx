import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCookie } from "@/lib/csrf"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [csrfToken, setCsrfToken] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        state: "",
        password: "",
        password2: "",
        role: "patient"
    })

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

    useEffect(() => {
        const token = getCookie("csrftoken")
        if (token) setCsrfToken(token)

        const searchParams = new URLSearchParams(window.location.search);
        const roleParam = searchParams.get('role');
        if (roleParam && ['patient', 'doctor', 'provider'].includes(roleParam)) {
            setFormData(prev => ({ ...prev, role: roleParam }));
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        if (formData.password !== formData.password2) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch(`${API_URL}/accounts/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    role: formData.role
                })
            })

            const data = await response.json()

            if (data.success) {
                if (data.otp_required) {
                    localStorage.setItem('verification_email', formData.email)
                    localStorage.setItem('verification_type', 'register')
                    navigate('/verify-otp')
                    return
                }
                localStorage.setItem('token', data.token)
                navigate('/dashboard')
            } else {
                setError(data.error || "Registration failed")
            }
        } catch (err) {
            setError("Network error. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const setRole = (role: string) => {
        setFormData(prev => ({ ...prev, role }))
    }

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh"
    ]

    return (
        <div className="min-h-screen bg-[url('/bg-grid.svg')] bg-[#FDFBF7] bg-grid-pattern selection:bg-[#20B2AA]/20 selection:text-[#0F827A] flex items-center justify-center p-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl"
            >
                <div className="skeuo-surface p-8 sm:p-12 relative overflow-hidden">
                    {/* Corner decorative light */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/60 rounded-full blur-2xl"></div>

                    <div className="text-center mb-10 flex flex-col items-center">
                        <img src="/Logo.png" alt="HealthTrack Logo" className="h-[28px] md:h-10 mb-6 drop-shadow-sm" />
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#173836] mb-3">
                            Create an Account
                        </h1>
                        <p className="text-[#20B2AA]/80 text-sm font-medium">
                            Join the unified health network today.
                        </p>
                    </div>

                    <div className="flex bg-[#FDFBF7] p-1.5 rounded-2xl shadow-skeuo-inset-md mb-8 relative z-10 w-full max-w-md mx-auto">
                        {['patient', 'doctor', 'provider'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={cn(
                                    "flex-1 py-3 text-sm font-bold rounded-xl capitalize transition-all duration-300",
                                    formData.role === r
                                        ? "bg-white text-[#0F827A] shadow-soft scale-[1.02]"
                                        : "text-[#20B2AA]/60 hover:text-[#0F827A]"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl font-medium text-center">
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#173836] ml-2">First Name</label>
                                <input
                                    name="first_name"
                                    type="text"
                                    placeholder="John"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="input-skeuo"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#173836] ml-2">Last Name</label>
                                <input
                                    name="last_name"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="input-skeuo"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#173836] ml-2">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-skeuo"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#173836] ml-2">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-skeuo"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#173836] ml-2">Region</label>
                            <div className="relative">
                                <select
                                    name="state"
                                    required
                                    className="input-skeuo appearance-none pr-10 cursor-pointer"
                                    value={formData.state}
                                    onChange={handleChange}
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230F827A' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px'
                                    }}
                                >
                                    <option value="" disabled className="text-[#20B2AA]/50">Select Region</option>
                                    {indianStates.map(state => (
                                        <option key={state} value={state} className="text-[#173836] font-medium">{state}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#173836] ml-2">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input-skeuo pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#20B2AA] hover:text-[#0F827A] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#173836] ml-2">Confirm</label>
                                <div className="relative">
                                    <input
                                        name="password2"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        className="input-skeuo pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#20B2AA] hover:text-[#0F827A] transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-6 pb-2 pl-2">
                            <input
                                id="terms" type="checkbox" required
                                className="mt-1 w-5 h-5 rounded border-[#20B2AA] text-[#0F827A] focus:ring-[#20B2AA] cursor-pointer"
                            />
                            <Label htmlFor="terms" className="text-sm text-[#20B2AA]/80 cursor-pointer leading-relaxed font-medium">
                                By continuing, you agree to HealthTrack's <a href="#" className="font-bold text-[#0F827A] hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-[#0F827A] hover:underline">Privacy Policy</a>.
                            </Label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-skeuo-primary h-14 text-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-sm font-medium text-[#20B2AA]/80 mt-10 relative z-10">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#0F827A] hover:text-[#20B2AA] font-bold transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
} 
