import { ECO_INGREDIENTS } from "../data";
import { Leaf, Award, Compass, HeartPulse } from "lucide-react";

export function EcoCommitment() {
  return (
    <section id="eco-responsable" className="py-24 bg-slate-900 border-t border-slate-850 text-white relative overflow-hidden">
      {/* Absolute Decorative Vector elements */}
      <div className="absolute top-1/2 -left-36 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title block */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-cyan-950 border border-cyan-900 text-cyan-400 text-xs px-3.5 py-1 rounded-full font-medium">
            <Leaf className="w-3.5 h-3.5" />
            <span>Formulation Biologique & Biodégradable</span>
          </div>
          <h2 className="text-4xl font-serif tracking-tight font-semibold text-white">
            Notre Révolution Éco-Responsable
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
            Nous prouvons chaque jour que la propreté absolue ne requiert aucune chimie agressive. Nos protocoles d'entretien préservent à la fois la durabilité de vos surfaces délicates, la faune aquatique, et l'air respiré par vos enfants ou animaux de compagnie.
          </p>
        </div>

        {/* 4 core ingredients and formulations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ECO_INGREDIENTS.map((ingredient, idx) => (
            <div
              key={idx}
              className="bg-slate-850 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-cyan-800 transition-all duration-300 shadow-xs"
            >
              <div>
                <span className="font-mono text-2xl text-cyan-500 font-extralight block mb-3">0{idx + 1}</span>
                <h3 className="font-serif font-semibold text-base text-white mb-2">{ingredient.name}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {ingredient.description}
                </p>
              </div>

              {/* Tag badges */}
              <div className="flex flex-wrap gap-1 pt-2">
                {ingredient.properties.map((p, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-[9px] uppercase tracking-wider font-mono font-medium text-cyan-400 bg-cyan-950 border border-cyan-900/50 px-2 py-0.5 rounded-md"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Triple ecological pillars */}
        <div className="bg-slate-850 border border-slate-800 rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-3xl" />

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-900 flex items-center justify-center text-cyan-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-semibold text-sm">Santé & Air Pur</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Zéro formaldéhyde, zéro benzène, zéro perturbateurs endocriniens. Idéal pour les personnes allergiques, asthmatiques ou fragiles.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-900 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-semibold text-sm">Éthique d'Intervention</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Nos chiffons réutilisables tricotés ont des micro-poches hydrophiles brevetées capables de piéger 99% des bactéries sans solvants abrasifs.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-900 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-semibold text-sm">Zéro Déchet Actif</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Nous livrons nos agents de ménage avec des contenants verre consignés rechargeables et remplaçons le plastique par des matières recyclées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
