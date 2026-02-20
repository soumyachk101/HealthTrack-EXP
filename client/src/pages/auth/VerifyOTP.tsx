import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/csrf"
import { Loader2, Mail, ArrowRight, CornerDownLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function VerifyOTP() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [csrfToken, setCsrfToken] = useState<string>("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState<string>("")
    const [verificationType, setVerificationType] = useState<string>("login")

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

    useEffect(() => {
        const token = getCookie("csrftoken")
        if (token) setCsrfToken(token)

        const storedEmail = localStorage.getItem('verification_email')
        const storedType = localStorage.getItem('verification_type')
        if (storedEmail) setEmail(storedEmail)
        if (storedType) setVerificationType(storedType)

        if (!storedEmail) {
            navigate('/login')
        }
    }, [navigate])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return // Prevent multiple chars

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto focus next
        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        if (e.key === 'Enter' && otp.every(digit => digit !== "")) {
            handleSubmit(e as any)
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text/plain').slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const newOtp = [...otp]
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i]
        }
        setOtp(newOtp)

        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join("")

        if (otpCode.length !== 6) {
            setError("Please enter all 6 digits")
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/accounts/api/verify-otp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    otp: otpCode,
                    type: verificationType
                })
            })

            const data = await response.json()

            if (data.success) {
                localStorage.removeItem('verification_email')
                localStorage.removeItem('verification_type')

                if (data.token) {
                    localStorage.setItem('token', data.token)
                }

                let targetPath = '/dashboard';
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    if (data.user.role === 'doctor') {
                        targetPath = '/doctor-dashboard';
                    } else if (data.user.role === 'provider') {
                        targetPath = '/provider-dashboard';
                    }
                }

                navigate(targetPath)
            } else {
                setError(data.error || "Invalid OTP")
                setOtp(["", "", "", "", "", ""])
                inputRefs.current[0]?.focus()
            }
        } catch (err) {
            setError("Network error. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[url('/bg-grid.svg')] bg-[#FDFBF7] bg-grid-pattern selection:bg-[#20B2AA]/20 selection:text-[#0F827A] flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="skeuo-surface p-8 sm:p-12 relative overflow-hidden">
                    {/* Corner decorative light */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/60 rounded-full blur-2xl"></div>

                    <div className="text-center mb-10 flex flex-col items-center">
                        <img src="/Logo.png" alt="HealthTrack Logo" className="h-[28px] md:h-10 mb-6 drop-shadow-sm" />
                        <h1 className="text-3xl font-extrabold text-[#173836] mb-3">
                            Check Your Email
                        </h1>
                        <p className="text-[#20B2AA]/80 text-sm font-medium">
                            We've sent a 6-digit verification code to
                        </p>
                        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-[#FDFBF7] rounded-xl shadow-skeuo-inset-sm border border-slate-200/50">
                            <Mail className="w-4 h-4 text-[#20B2AA]" />
                            <span className="text-[#173836] font-bold text-sm">{email}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {error && (
                            <div className="p-4 mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl font-medium text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between gap-2 sm:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={cn(
                                        "w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-xl outline-none transition-all duration-300",
                                        "input-skeuo",
                                        digit !== "" && "border-[#20B2AA] ring-2 ring-[#20B2AA]/20"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || otp.some(d => d === "")}
                            className="w-full btn-skeuo-primary h-14 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                "Verify Account"
                            )}
                            {!isLoading && otp.every(d => d !== "") && <ArrowRight className="w-5 h-5 ml-1 opacity-80" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center flex flex-col items-center gap-5 relative z-10">
                        <p className="text-[#20B2AA]/80 text-sm font-medium">
                            Didn't receive the code?{" "}
                            <button type="button" className="text-[#0F827A] font-bold hover:underline cursor-pointer transition-colors">
                                Resend
                            </button>
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#20B2AA]/60 hover:text-[#0F827A] transition-colors"
                        >
                            <CornerDownLeft className="w-4 h-4" />
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 
