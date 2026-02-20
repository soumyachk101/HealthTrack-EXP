import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Heart, AlertCircle, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ProfileData {
    csrf_token: string
    user: {
        first_name: string
        last_name: string
        email: string
        phone: string
        city: string
        blood_group: string
        address: string
        emergency_contact: string
        emergency_phone: string
    }
    messages: Array<{
        tags: string
        message: string
    }>
}

export default function Profile() {
    const [data, setData] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                return
            }

            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
                const response = await fetch(`${API_URL}/api/profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                })

                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token')
                    navigate('/login')
                    return
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data')
                }

                const result = await response.json()
                setData(result)
            } catch (err: any) {
                if (err.name === 'AbortError') return
                console.error("Profile Fetch Error:", err)
                setError(err.message || "Failed to load profile")
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchData()
        return () => controller.abort()
    }, [navigate])

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Profile updates are coming soon!")
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading Profile...</div>
    if (error) return (
        <div className="min-h-screen bg-background flex items-center justify-center text-destructive flex-col gap-4">
            <AlertCircle className="h-10 w-10" />
            <p>{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
        </div>
    )

    return (
        <DashboardLayout>
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#173836]">My Profile</h1>
                <p className="text-[#20B2AA]/80 font-semibold mt-1">Manage your personal information</p>
            </header>

            <form onSubmit={handleSave}>
                <Card className="skeuo-surface shadow-skeuo-inset-sm border-0">
                    <CardHeader className="p-6 sm:p-8">
                        <CardTitle className="text-xl font-extrabold flex items-center gap-2 text-[#173836]">
                            <User className="h-5 w-5 text-[#20B2AA]" />
                            Personal Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 px-6 sm:px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#173836]">First Name</label>
                                <input type="text" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="first_name" defaultValue={data?.user.first_name} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#173836]">Last Name</label>
                                <input type="text" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="last_name" defaultValue={data?.user.last_name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 text-[#173836]">
                                    <Mail className="h-4 w-4 text-[#20B2AA]/60" /> Email
                                </label>
                                <input type="email" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none transition-all rounded-xl opacity-70 cursor-not-allowed bg-[#FDFBF7]" defaultValue={data?.user.email} disabled />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 text-[#173836]">
                                    <Phone className="h-4 w-4 text-[#20B2AA]/60" /> Phone
                                </label>
                                <input type="tel" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="phone" defaultValue={data?.user.phone} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 text-[#173836]">
                                    <MapPin className="h-4 w-4 text-[#20B2AA]/60" /> City
                                </label>
                                <input type="text" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="city" defaultValue={data?.user.city} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 text-[#173836]">
                                    <Heart className="h-4 w-4 text-rose-500" /> Blood Group
                                </label>
                                <select
                                    name="blood_group"
                                    className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%2320B2AA%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center]"
                                    defaultValue={data?.user.blood_group}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+ (A Positive)</option>
                                    <option value="A-">A- (A Negative)</option>
                                    <option value="B+">B+ (B Positive)</option>
                                    <option value="B-">B- (B Negative)</option>
                                    <option value="AB+">AB+ (AB Positive)</option>
                                    <option value="AB-">AB- (AB Negative)</option>
                                    <option value="O+">O+ (O Positive)</option>
                                    <option value="O-">O- (O Negative)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#173836]">Address</label>
                            <textarea
                                name="address"
                                className="input-skeuo w-full min-h-[80px] p-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl resize-y"
                                defaultValue={data?.user.address}
                            />
                        </div>

                        <div className="pt-6 mt-2 border-t border-slate-200/50">
                            <h3 className="text-lg font-extrabold mb-6 text-[#173836]">Emergency Contact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#173836]">Name</label>
                                    <input type="text" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="emergency_contact" defaultValue={data?.user.emergency_contact} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#173836]">Phone</label>
                                    <input type="tel" className="input-skeuo w-full h-11 px-4 text-sm font-medium outline-none border-[#20B2AA] focus:ring-2 focus:ring-[#20B2AA]/20 transition-all rounded-xl" name="emergency_phone" defaultValue={data?.user.emergency_phone} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end">
                            <button type="submit" className="btn-skeuo-primary h-11 px-6 text-sm flex items-center justify-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </DashboardLayout>
    )
}
