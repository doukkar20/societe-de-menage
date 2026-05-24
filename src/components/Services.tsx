import React, { useState } from "react";
import { SERVICES_DATA } from "../data";
import { Sparkles, Grid, Briefcase, Eye, ChevronDown, CheckCircle, Clock } from "lucide-react";

export function Services() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-cyan-600" />;
      case "Grid":
        return <Grid className="w-5 h-5 text-cyan-600" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-cyan-600" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-cyan-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-600" />;
    }
  };

  const handleToggleDetails = (id: string) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 block mb-2">
              L'Art du Nettoyage
            </span>
            <h2 className="text-4xl font-serif font-semibold tracking-tight text-slate-900 leading-tight">
              Prestations et rituels de soin exclusifs
            </h2>
          </div>
          <p className="text-slate-500 font-light text-sm max-w-sm">
            Chaque formule ÉclatNet s'appuie sur une charte qualité et une éthique rigoureuse basée sur la préservation de vos surfaces d'exception.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className="bg-slate-50 border border-slate-100/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="aspect-16/9 overflow-hidden relative group">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <div className="bg-white/95 backdrop-blur-xs px-3 py-1 text-slate-900 border border-white text-xs font-semibold rounded-lg">
                      Dès {service.basePricePerHour.toFixed(2)} € / h
                    </div>
                    <div className="bg-cyan-600/90 text-white text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-md">
                      Éligible Déduction 50%
                    </div>
                  </div>
                </div>

                {/* Content description block */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                        {getIconComponent(service.icon)}
                      </div>
                      <h3 className="font-serif font-semibold text-lg text-slate-900">{service.title}</h3>
                    </div>

                    <p className="text-slate-600 text-xs font-light leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Expandable full details box with pure React transitions */}
                    {isExpanded && (
                      <div className="pt-2 text-xs text-slate-500 font-light leading-relaxed animate-fade-in pl-2 border-l border-cyan-200 block">
                        {service.fullDescription}
                      </div>
                    )}
                  </div>

                  {/* Bullet Benefits Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/50">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Ce qui est inclus</span>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                      {service.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <span className="font-light">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trigger Action Toggle Button */}
                  <div className="pt-4 flex justify-between items-center text-xs">
                    <button
                      type="button"
                      onClick={() => handleToggleDetails(service.id)}
                      className="text-slate-700 hover:text-cyan-600 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? "Réduire les informations" : "Voir le descriptif détaillé"}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const calculatorSection = document.getElementById("calculateur");
                        if (calculatorSection) calculatorSection.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-xl border border-slate-950 cursor-pointer shadow-xs"
                    >
                      Estimer mon tarif
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
