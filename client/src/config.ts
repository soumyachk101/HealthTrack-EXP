export const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname.includes('vercel.app') ? `https://${window.location.hostname.replace('client', 'server')}` : 'http://localhost:8000');
