import React, { useState, useEffect } from 'react'
import { Calendar, Clock, FileText, Users, Stethoscope, Settings, Home, Check, X, Video, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { getCookie } from "@/lib/csrf"
import { Link } from "react-router-dom"

const doctorNavItems = [
    { icon: Home, label: "Dashboard", href: "/doctor-dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: FileText, label: "Reports", href: "/doctor/reports" },
    { icon: Clock, label: "Schedule", href: "/doctor/schedule" },
    { icon: Settings, label: "Settings", href: "/doctor/settings" },
]

export default function DoctorDashboard() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState([
        { label: "Total Patients", value: "0", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Today's Appointments", value: "0", icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Pending Reports", value: "0", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Consultations", value: "0", icon: Stethoscope, color: "text-purple-500", bg: "bg-purple-500/10" },
    ])

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

    const fetchAppointments = React.useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_URL}/core/api/appointments/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (data.success) {
                setAppointments(data.appointments)
                // Update stats based on real data
                const today = new Date().toISOString().split('T')[0]
                const todayCount = data.appointments.filter((a: any) => a.date === today).length

                setStats(prev => prev.map(s => {
                    if (s.label === "Today's Appointments") return { ...s, value: todayCount.toString() }
                    if (s.label === "Consultations") return { ...s, value: data.appointments.length.toString() }
                    return s
                }))
            }
        } catch (err) {
            console.error("Failed to fetch appointments", err)
        } finally {
            setIsLoading(false)
        }
    }, [API_URL])

    useEffect(() => {
        fetchAppointments()
    }, [fetchAppointments])

    const handleAction = async (id: number, action: 'accept' | 'reject' | 'complete') => {
        try {
            const token = localStorage.getItem('token')
            const csrfToken = getCookie("csrftoken")

            const response = await fetch(`${API_URL}/core/api/appointments/${id}/action/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken || ''
                },
                body: JSON.stringify({ action })
            })

            const data = await response.json()
            if (data.success) {
                fetchAppointments() // Refresh list
            }
        } catch (err) {
            console.error("Action failed", err)
        }
    }

    const nextPatient = appointments.filter(a => a.status === 'confirmed')[0]

    return (
        <DashboardLayout sidebarItems={doctorNavItems}>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Hello, Doctor</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-border">
                        <img src="https://i.pravatar.cc/150?u=doctor" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                </div>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="skeuo-surface shadow-skeuo-inset-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-[#20B2AA]/80">{stat.label}</CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg} ${stat.color}`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-[#173836] animate-in fade-in slide-in-from-bottom-2">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Appointments Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="skeuo-surface shadow-skeuo-inset-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="font-bold text-[#173836]">Upcoming Appointments</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white rounded-xl">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 pt-4">
                                {isLoading ? (
                                    <div className="text-center text-[#20B2AA]/60 font-semibold py-8">Loading appointments...</div>
                                ) : appointments.length === 0 ? (
                                    <div className="text-center text-[#20B2AA]/60 font-semibold py-8">No appointments found.</div>
                                ) : (
                                    appointments.map((appt, idx) => (
                                        <div key={appt.id} className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-[#FDFBF7] shadow-skeuo-inset-sm border border-white/50 transition-colors", idx !== appointments.length - 1 && "mb-5")}>
                                            <div className="flex-shrink-0 hidden sm:block">
                                                <div className="h-14 w-14 flex flex-col items-center justify-center bg-[#20B2AA]/10 rounded-xl text-[#0F827A]">
                                                    <span className="text-sm font-black">{appt.date.split('-')[2]}</span>
                                                    <span className="text-[10px] font-bold uppercase">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 w-full">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-base font-bold text-[#173836] truncate">{appt.patient_name}</h4>
                                                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                                                        appt.status === 'pending' ? "bg-amber-500/10 text-amber-500" :
                                                            appt.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500" :
                                                                appt.status === 'completed' ? "bg-blue-500/10 text-blue-500" : "bg-muted text-muted-foreground"
                                                    )}>
                                                        {appt.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#20B2AA]/80 mb-2">
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {appt.date} {appt.time.substring(0, 5)}</span>
                                                    <span>•</span>
                                                    <span>{appt.type}</span>
                                                </div>
                                                <p className="text-sm font-medium text-[#173836]/80 mb-3">{appt.reason}</p>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    {appt.status === 'pending' && (
                                                        <>
                                                            <button onClick={() => handleAction(appt.id, 'accept')} className="btn-skeuo-primary h-8 px-3 text-xs flex items-center shadow-none rounded-[10px]">
                                                                <Check className="h-3 w-3 mr-1" /> Accept
                                                            </button>
                                                            <button onClick={() => handleAction(appt.id, 'reject')} className="h-8 px-3 text-xs font-bold text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 rounded-[10px] transition-colors flex items-center">
                                                                <X className="h-3 w-3 mr-1" /> Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {appt.status === 'confirmed' && appt.type === 'Video Consult' && (
                                                        <a href={appt.meeting_link} target="_blank" rel="noreferrer">
                                                            <button className="h-8 px-3 text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white rounded-[10px] transition-colors flex items-center shadow-md shadow-indigo-500/20">
                                                                <Video className="h-3 w-3 mr-1" /> Join Call
                                                            </button>
                                                        </a>
                                                    )}
                                                    {appt.status === 'confirmed' && (
                                                        <button onClick={() => handleAction(appt.id, 'complete')} className="h-8 px-3 text-xs font-bold text-[#0F827A] hover:text-white bg-[#20B2AA]/10 hover:bg-[#20B2AA] border border-[#20B2AA]/20 rounded-[10px] transition-colors">
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar area */}
                <div className="space-y-6">
                    {/* Next Appointment Card */}
                    {nextPatient ? (
                        <Card className="skeuo-surface shadow-skeuo-inset-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Users className="w-32 h-32 text-[#20B2AA]" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-[#0F827A] flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Next Patient
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-[#20B2AA]/10 flex items-center justify-center text-xl font-black text-[#0F827A] shadow-inner">
                                        {nextPatient.patient_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-[#173836]">{nextPatient.patient_name}</h3>
                                        <p className="text-[#20B2AA]/80 font-semibold text-sm">{nextPatient.reason}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-full btn-skeuo-primary h-11 text-sm font-bold">Start Visit</button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="skeuo-surface shadow-skeuo-inset-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-[#20B2AA]/80">Next Patient</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-6 space-y-4">
                                    <div className="w-12 h-12 bg-[#FDFBF7] shadow-skeuo-inset-sm border border-white/50 rounded-full flex items-center justify-center mx-auto text-[#20B2AA]/60">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#173836]">No upcoming patients</p>
                                        <p className="text-xs font-semibold text-[#20B2AA]/80 mt-1">Accept pending appointments to see them here.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-extrabold text-[#173836] drop-shadow-sm">Quick Actions</h3>
                        {[
                            { label: "Add Patient Record", href: "/doctor/patients/new", icon: Plus },
                            { label: "Write Prescription", href: "/doctor/prescriptions/new", icon: FileText },
                            { label: "Schedule Follow-up", href: "/doctor/schedule", icon: Calendar },
                        ].map((action) => (
                            <Link
                                key={action.label}
                                to={action.href}
                                className="flex items-center gap-4 p-4 rounded-xl skeuo-surface hover:shadow-skeuo-sm transition-all group group-active:scale-95"
                            >
                                <div className="h-10 w-10 rounded-full bg-[#FDFBF7] shadow-skeuo-inset-sm border border-white/50 flex items-center justify-center text-[#20B2AA] group-hover:text-[#0F827A] transition-colors">
                                    <action.icon className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-[#173836]">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
