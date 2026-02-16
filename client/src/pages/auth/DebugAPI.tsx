import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_URL } from "@/config"

export default function DebugAPI() {
    const [status, setStatus] = useState<string>('Checking...')
    const [details, setDetails] = useState<string>('')

    const testConnection = async () => {
        setStatus('Testing...')
        setDetails('')
        
        try {
            // Test basic connection
            const response = await fetch(`${API_URL}/`, {
                method: 'GET',
                credentials: 'include'
            })
            
            if (response.ok) {
                setStatus('✅ Server Connected')
                setDetails(`Status: ${response.status} ${response.statusText}`)
            } else {
                setStatus('❌ Server Error')
                setDetails(`Status: ${response.status} ${response.statusText}`)
            }
        } catch (error: any) {
            setStatus('❌ Network Error')
            setDetails(`Error: ${error.message}`)
        }
    }

    const testLoginEndpoint = async () => {
        setStatus('Testing Login Endpoint...')
        setDetails('')
        
        try {
            const response = await fetch(`${API_URL}/accounts/api/login/`, {
                method: 'GET',
                credentials: 'include'
            })
            
            if (response.ok) {
                setStatus('✅ Login Endpoint OK')
                setDetails(`Status: ${response.status} ${response.statusText}`)
            } else {
                setStatus('❌ Login Endpoint Error')
                setDetails(`Status: ${response.status} ${response.statusText}`)
            }
        } catch (error: any) {
            setStatus('❌ Login Endpoint Network Error')
            setDetails(`Error: ${error.message}`)
        }
    }

    useEffect(() => {
        testConnection()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        API Debug Tool
                    </CardTitle>
                    <p className="text-center text-sm text-gray-500">
                        Current API URL: <code className="bg-gray-100 px-2 py-1 rounded">{API_URL}</code>
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-semibold mb-2">Status:</h3>
                        <p className={status.includes('✅') ? 'text-green-600' : status.includes('❌') ? 'text-red-600' : 'text-blue-600'}>
                            {status}
                        </p>
                        {details && (
                            <p className="text-sm text-gray-600 mt-2">
                                {details}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <Button onClick={testConnection} className="flex-1">
                            Test Connection
                        </Button>
                        <Button onClick={testLoginEndpoint} variant="outline" className="flex-1">
                            Test Login API
                        </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                        <p><strong>Debug Info:</strong></p>
                        <p>Window Location: {window.location.origin}</p>
                        <p>API URL: {API_URL}</p>
                        <p>Includes Vercel: {window.location.hostname.includes('vercel.app') ? 'Yes' : 'No'}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}