import React, { useState, useEffect } from 'react'
import { Clock, MapPin, DollarSign, CheckCircle, TrendingUp, Package, Home, Settings, Navigation, Bell } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { getCookie } from "@/lib/csrf"
import { Link } from "react-router-dom"

const providerNavItems = [
    { icon: Home, label: "Dashboard", href: "/provider-dashboard" },
    { icon: Package, label: "Services", href: "/provider/services" },
    { icon: MapPin, label: "Requests", href: "/provider/requests" },
    { icon: DollarSign, label: "Earnings", href: "/provider/earnings" },
    { icon: Clock, label: "History", href: "/provider/history" },
    { icon: Settings, label: "Settings", href: "/provider/settings" },
]

export default function ProviderDashboard() {
    const [requests, setRequests] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState([
        { label: "Pending Requests", value: "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Completed Jobs", value: "0", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Total Earnings", value: "$0", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Rating", value: "5.0", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
    ])
    const [isOnline, setIsOnline] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

    const fetchRequests = React.useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_URL}/core/api/service-requests/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (data.success) {
                setRequests(data.requests)
                // Update stats
                const pendingCount = data.requests.filter((r: any) => r.status === 'pending').length
                const completedCount = data.requests.filter((r: any) => r.status === 'completed').length
                const earnings = data.requests
                    .filter((r: any) => r.status === 'completed')
                    .reduce((acc: number, curr: any) => acc + parseFloat(curr.price), 0)

                setStats(prev => prev.map(s => {
                    if (s.label === "Pending Requests") return { ...s, value: pendingCount.toString() }
                    if (s.label === "Completed Jobs") return { ...s, value: completedCount.toString() }
                    if (s.label === "Total Earnings") return { ...s, value: `$${earnings.toFixed(2)}` }
                    return s
                }))
            }
        } catch (err) {
            console.error("Failed to fetch requests", err)
        } finally {
            setIsLoading(false)
        }
    }, [API_URL])

    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    const handleAction = async (id: number, action: 'accept' | 'decline' | 'complete') => {
        try {
            const token = localStorage.getItem('token')
            const csrfToken = getCookie("csrftoken")

            const response = await fetch(`${API_URL}/core/api/service-requests/${id}/action/`, {
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
                fetchRequests() // Refresh list
            }
        } catch (err) {
            console.error("Action failed", err)
        }
    }

    const activeRequest = requests.find(r => r.status === 'accepted')

    return (
        <DashboardLayout sidebarItems={providerNavItems}>
            <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#173836]">Provider Dashboard</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={cn("relative flex h-3 w-3")}>
                            {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B2AA] opacity-75"></span>}
                            <span className={cn("relative inline-flex rounded-full h-3 w-3", isOnline ? "bg-[#20B2AA]" : "bg-slate-400")}></span>
                        </span>
                        <p className="text-[#20B2AA]/80 font-semibold text-sm">{isOnline ? "Online and receiving requests" : "Currently offline"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-[#FDFBF7] shadow-skeuo-inset-sm p-1.5 rounded-2xl border border-white flex items-center gap-1">
                        <button
                            onClick={() => setIsOnline(true)}
                            className={cn("rounded-xl h-8 px-4 text-xs font-bold transition-all shadow-none", isOnline ? "bg-[#20B2AA] text-white shadow-md shadow-[#20B2AA]/20" : "text-[#173836]/60 hover:text-[#173836] hover:bg-slate-100")}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => setIsOnline(false)}
                            className={cn("rounded-xl h-8 px-4 text-xs font-bold transition-all shadow-none", !isOnline ? "bg-slate-500 text-white shadow-md shadow-slate-500/20" : "text-[#173836]/60 hover:text-[#173836] hover:bg-slate-100")}
                        >
                            Offline
                        </button>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#20B2AA]/10 overflow-hidden border-2 border-white shadow-skeuo-sm">
                        <img src="https://i.pravatar.cc/150?u=provider" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
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

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Available Requests Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="skeuo-surface shadow-skeuo-inset-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="font-bold text-[#173836]">Incoming Service Requests</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 border-[#20B2AA] text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white rounded-xl">Filter</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 pt-4">
                                {isLoading ? (
                                    <div className="text-center text-[#20B2AA]/60 font-semibold py-8">Loading requests...</div>
                                ) : requests.length === 0 ? (
                                    <div className="text-center text-[#20B2AA]/60 font-semibold py-8">No requests found.</div>
                                ) : (
                                    requests.map((req, idx) => (
                                        <div key={req.id} className={cn("flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-[#FDFBF7] shadow-skeuo-inset-sm border border-white/50 transition-colors", idx !== requests.length - 1 && "mb-5")}>
                                            <div className="flex-shrink-0">
                                                <div className="h-14 w-14 bg-[#20B2AA]/10 rounded-xl flex flex-col items-center justify-center text-[#0F827A]">
                                                    <span className="text-sm font-bold uppercase">{new Date(req.scheduled_date || req.created_at).toLocaleString('default', { month: 'short' })}</span>
                                                    <span className="text-lg font-black">{new Date(req.scheduled_date || req.created_at).getDate()}</span>
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-base font-bold text-[#173836] truncate">{req.service_name}</h3>
                                                    <div className="text-right flex flex-col items-end">
                                                        <span className="font-black text-lg text-[#0F827A]">${req.price}</span>
                                                        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1",
                                                            req.status === 'pending' ? "bg-amber-500/10 text-amber-500" :
                                                                req.status === 'accepted' ? "bg-blue-500/10 text-blue-500" :
                                                                    req.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                                                        )}>
                                                            {req.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-sm font-semibold text-[#20B2AA]/80 flex items-center gap-1.5 mt-1 mb-4">
                                                    <MapPin className="h-3.5 w-3.5" /> {req.address}
                                                </p>

                                                {/* Actions */}
                                                {req.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleAction(req.id, 'accept')} className="btn-skeuo-primary flex-1 h-9 text-xs rounded-xl flex items-center justify-center">
                                                            Accept
                                                        </button>
                                                        <button onClick={() => handleAction(req.id, 'decline')} className="flex-1 h-9 text-xs font-bold text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center">
                                                            Decline
                                                        </button>
                                                    </div>
                                                )}
                                                {req.status === 'accepted' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleAction(req.id, 'complete')} className="flex-1 h-9 text-xs font-bold bg-[#20B2AA] hover:bg-[#0F827A] text-white rounded-xl transition-colors flex items-center justify-center shadow-md shadow-[#20B2AA]/20">
                                                            <CheckCircle className="h-4 w-4 mr-2" /> Mark Completed
                                                        </button>
                                                    </div>
                                                )}
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
                    {/* Active Request Widget entirely replaces the old Driver sidebar */}
                    {activeRequest ? (
                        <Card className="skeuo-surface shadow-skeuo-inset-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Navigation className="w-32 h-32 text-[#20B2AA]" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-[#0F827A] flex items-center gap-2">
                                    <Bell className="w-4 h-4 animate-pulse" /> Active Job
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-extrabold text-[#173836] text-lg">{activeRequest.service_name}</h3>
                                        <p className="text-sm font-semibold text-[#20B2AA]/80 flex items-start gap-1 mt-1">
                                            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                            {activeRequest.address}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-slate-200/50">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm font-bold text-[#173836]">Expected Payout</span>
                                            <span className="font-black text-[#0F827A]">${activeRequest.price}</span>
                                        </div>
                                        <button className="w-full btn-skeuo-primary h-11 text-sm font-bold flex flex-row justify-center items-center" onClick={() => handleAction(activeRequest.id, 'complete')}>
                                            <CheckCircle className="w-4 h-4 mr-2" /> Complete Job
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="skeuo-surface shadow-skeuo-inset-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-[#20B2AA]/80">Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-6 space-y-4">
                                    <div className="w-12 h-12 bg-[#FDFBF7] shadow-skeuo-inset-sm border border-white/50 rounded-full flex items-center justify-center mx-auto text-[#20B2AA]/60">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#173836]">No active jobs</p>
                                        <p className="text-xs font-semibold text-[#20B2AA]/80 mt-1">Accept a pending request to get started.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-extrabold text-[#173836] drop-shadow-sm">Quick Actions</h3>
                        {[
                            { label: "Manage Services", href: "/provider/services", icon: Package },
                            { label: "Earnings Report", href: "/provider/earnings", icon: DollarSign },
                            { label: "Update Schedule", href: "/provider/settings", icon: Settings },
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
