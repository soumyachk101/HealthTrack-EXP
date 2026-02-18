import { useState } from 'react';
import { API_URL } from '@/config';
import { Button } from '@/components/ui/button';

export default function DebugNetwork() {
    const [status, setStatus] = useState<string>('Idle');
    const [details, setDetails] = useState<string>('');

    const checkConnection = async () => {
        setStatus('Checking...');
        setDetails('');
        try {
            const res = await fetch(`${API_URL}/`, {
                method: 'GET',
                mode: 'cors',
            });
            const text = await res.text();
            setStatus(`Success: ${res.status} ${res.statusText}`);
            setDetails(text.slice(0, 100)); // First 100 chars
        } catch (err: any) {
            setStatus('Failed');
            setDetails(err.message + '\n' + JSON.stringify(err));
            console.error(err);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow-lg fixed bottom-4 right-4 z-50 max-w-sm">
            <h3 className="font-bold mb-2">Network Debugger</h3>
            <p className="text-xs mb-2">Target: {API_URL}</p>
            <Button onClick={checkConnection} size="sm">Test Connection</Button>
            <div className="mt-2 text-xs font-mono bg-slate-100 p-2 rounded">
                <div>Status: {status}</div>
                <div className="break-all">{details}</div>
            </div>
        </div>
    );
}
