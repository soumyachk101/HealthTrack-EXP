import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from "lucide-react";

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none flex justify-center">
            <nav className={`pointer-events-auto nav-skeuo transition-all duration-300 flex items-center justify-between px-6 py-3 w-full max-w-[800px] ${scrolled ? 'py-2.5 scale-[0.98]' : ''}`}>
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-teal-600" />
                    </div>
                </Link>

                {/* Desktop Actions */}
                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <button className="btn-skeuo !px-5 !py-2 !text-sm">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="btn-skeuo-primary !px-5 !py-2 !text-sm">
                            Get Started
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
