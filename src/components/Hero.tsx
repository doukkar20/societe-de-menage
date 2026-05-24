import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Check, Star } from "lucide-react";

export function Hero() {
  const scrollToCalculator = () => {
    const element = document.getElementById("calculateur");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAI = () => {
    const element = document.getElementById("assistant-ia");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Absolute Decorative Circles */}
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-cyan-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-sky-50/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Typography Block */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs px-3.5 py-1 rounded-full font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
            <span>Ménage & Conciergerie de Prestige à Paris</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight font-semibold text-slate-900 leading-tight">
            L'excellence hôtelière <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-sky-600 font-serif">
              au service de votre maison
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-lg leading-relaxed font-light">
            ÉclatNet réinvente les codes du ménage résidentiel régulier et du nettoyage de bureaux. Retrouvez des intérieurs sublimés par des gouvernants d'élite avec des produits 100% éco-responsables et certifiés.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToCalculator}
              className="bg-slate-900 text-white font-medium hover:bg-slate-800 text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2 group border border-slate-950"
            >
              <span>Calculer mon Devis</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToAI}
              className="bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 text-cyan-900 text-sm font-medium px-6 py-3.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Générer un plan IA</span>
            </button>
          </div>

          {/* Social Proof and trust factors */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-1 text-slate-900 font-serif font-semibold text-lg">
                <span>4.9</span>
                <span className="flex text-yellow-500"><Star className="w-4 h-4 fill-yellow-500" /></span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Note moyenne d'excellence</p>
            </div>
            <div>
              <div className="text-slate-900 font-serif font-semibold text-lg">100%</div>
              <p className="text-xs text-slate-400 mt-1">Intervenants salariés qualifiés</p>
            </div>
            <div>
              <div className="text-slate-900 font-serif font-semibold text-lg">-50%</div>
              <p className="text-xs text-slate-400 mt-1">Avantage fiscal immédiat</p>
            </div>
          </div>
        </div>

        {/* Right sunlit room Image canvas */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-16/11 group">
            {/* The beautiful generated sunlit villa */}
            <img
              src="/src/assets/images/hero_cleaning_1779645419120.png"
              alt="Intérieur parisien prestigieux brillant et propre ÉclatNet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />

            {/* Float badge inside image */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 border border-white/50 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 font-semibold block leading-none mb-1">
                  Assurance Prestige AXA
                </span>
                <p className="text-[11px] text-slate-600 font-normal leading-tight">
                  Biens couverts jusqu'à 1 000 000 € contre tout bris d'objet d'art ou dommages précieux.
                </p>
              </div>
            </div>
          </div>

          {/* Overlapping Absolute Check items */}
          <div className="absolute -top-4 -right-4 bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-xl hidden sm:flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold tracking-tight">Charte éco-responsable certifiée</span>
          </div>
        </div>
      </div>
    </section>
  );
}
