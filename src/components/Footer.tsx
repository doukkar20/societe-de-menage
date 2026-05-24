import { Award, Mail, Phone, MapPin, Building, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Brand Information Column */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-serif font-bold text-xs">
              É
            </div>
            <div>
              <span className="font-serif text-base font-bold text-white tracking-tight block leading-none">
                ÉclatNet
              </span>
              <span className="text-[8px] font-mono tracking-wider uppercase text-slate-500">
                Prestige & pureté
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
            Première conciergerie et société de ménage d'élite certifiée éco-responsable. Formés selon les normes exigeantes des gouvernants de grande hôtellerie de palace, nous offrons un bien-être d'exception chez vous.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-800 px-3 py-1 rounded-lg text-cyan-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantie AXA Pro 1M€</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-800 px-3 py-1 rounded-lg text-sky-400 font-medium">
              <Building className="w-4 h-4" />
              <span>Agrément SAP</span>
            </div>
          </div>
        </div>

        {/* Links Column 1: Services */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Nos Prestations</h4>
          <ul className="space-y-2 text-xs font-normal">
            <li>
              <a href="#services" className="hover:text-cyan-400 transition-colors">
                Ménage Régulier d'Élite
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition-colors">
                Grand Nettoyage de Printemps
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition-colors">
                Nettoyage de Vitres Spécialisé
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition-colors">
                Espaces Corporatifs & Bureaux
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition-colors">
                Conciergerie Airbnb & Saisonnier
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Contacts */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Contact & Agence</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <a href="tel:+33180402010" className="text-slate-200 font-semibold hover:text-cyan-400 block transition-colors">
                  01 80 40 20 10
                </a>
                <span className="text-[10px] text-slate-500 block">Du lundi au samedi (8h00 - 20h00)</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
              <a href="mailto:contact@eclatnet-prestige.fr" className="hover:text-cyan-400 transition-colors">
                contact@eclatnet-prestige.fr
              </a>
            </li>

            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span>128 Rue de la Pompe, 75116 Paris</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy footer notes */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-4">
        <span>© {currentYear} ÉclatNet Prestige Services SARL. Tous droits réservés. Agrément n° SAP819308591</span>
        <div className="flex gap-4">
          <a href="#accueil" className="hover:underline hover:text-slate-400">Mentions Légales</a>
          <a href="#accueil" className="hover:underline hover:text-slate-400">RGPD & Confidentialité</a>
          <a href="#accueil" className="hover:underline hover:text-slate-400">Conditions Générales de Vente</a>
        </div>
      </div>
    </footer>
  );
}
