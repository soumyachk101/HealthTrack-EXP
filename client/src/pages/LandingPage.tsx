import NavBar from '../components/landing/NavBar';
import HeroSection from '../components/landing/HeroSection';
import OSMockup from '../components/landing/OSMockup';
import FeaturesBento from '../components/landing/FeaturesBento';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#eff6ff] font-sans antialiased text-slate-800 relative overflow-x-hidden selection:bg-teal-500/30">

            {/* Subtle radial glows for edge lighting */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none"></div>

            <NavBar />
            <HeroSection />
            <OSMockup />
            <FeaturesBento />
            <CtaSection />
            <Footer />
        </div>
    );
}
