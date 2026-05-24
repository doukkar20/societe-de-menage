import { useState } from "react";
import { TESTIMONIALS_DATA, FAQS } from "../data";
import { Star, HelpCircle, ChevronDown } from "lucide-react";

export function Testimonials() {
  const [filterService, setFilterService] = useState<string>("all");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const filteredReviews = TESTIMONIALS_DATA.filter((r) => {
    if (filterService === "all") return true;
    return r.serviceId === filterService;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <section id="temoignages" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 block mb-2">
            Satisfaction Signature
          </span>
          <h2 className="text-4xl font-serif font-semibold tracking-tight text-slate-900 leading-tight">
            Ce que disent nos clients d'exception
          </h2>
          <p className="text-slate-500 font-light text-sm mt-3">
            Découvrez les témoignages certifiés d'ambassadeurs et de familles qui nous font confiance pour illuminer leur intérieur régulier.
          </p>

          {/* Testimonial Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterService("all")}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                filterService === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              Tous les Avis
            </button>
            <button
              onClick={() => setFilterService("premium-residential")}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                filterService === "premium-residential"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              Résidentiel d'Élite
            </button>
            <button
              onClick={() => setFilterService("grand-nettoyage")}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                filterService === "grand-nettoyage"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              Mise à Neuf / Grand Nettoyage
            </button>
            <button
              onClick={() => setFilterService("workspace-prestige")}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                filterService === "workspace-prestige"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              Bureaux & Pro
            </button>
          </div>
        </div>

        {/* Reviews Cards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {filteredReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex text-amber-500 gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs italic font-light leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Avatar details */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-50">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0"
                />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordeon structure */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
              <span>Réponses d'Experts</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-950">
              Questions Fréquentes
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center text-slate-900 font-serif font-semibold text-xs leading-normal cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-slate-600 font-light leading-relaxed border-t border-slate-50 pt-3 animate-fade-in block">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
