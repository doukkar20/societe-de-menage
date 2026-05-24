import { useState, useEffect } from "react";
import { Sparkles, Calendar, HelpCircle, Phone, Award } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo with sparkles */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md transition-transform group-hover:scale-105">
            É
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-slate-900 block leading-none">
              ÉclatNet
            </span>
            <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">
              Prestige & pureté
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          <button
            onClick={() => scrollToSection("accueil")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            Nos Services
          </button>
          <button
            onClick={() => scrollToSection("calculateur")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            Calculateur Devis
          </button>
          <button
            onClick={() => scrollToSection("assistant-ia")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-600" />
            <span>Assistant IA</span>
          </button>
          <button
            onClick={() => scrollToSection("eco-responsable")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            Révolution Éco
          </button>
          <button
            onClick={() => scrollToSection("temoignages")}
            className="text-xs font-medium text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            Avis
          </button>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+33180402010"
            className="hidden lg:flex items-center gap-2 font-mono text-xs font-medium text-slate-800 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 px-3.5 py-2 rounded-xl transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-600" />
            <span>01 80 40 20 10</span>
          </a>
          <button
            onClick={() => scrollToSection("calculateur")}
            className="bg-slate-900 border border-slate-950 text-white hover:bg-slate-800 text-xs font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Estimation Gratuite</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
