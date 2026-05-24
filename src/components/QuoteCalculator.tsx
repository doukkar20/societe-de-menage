import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calculator, Calendar, Plus, Check, Clock, ShieldCheck, Mail, Phone, User, CheckCircle } from "lucide-react";
import { QuoteEstimation } from "../types";

export function QuoteCalculator() {
  const [squareMeters, setSquareMeters] = useState<number>(75);
  const [rooms, setRooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [frequency, setFrequency] = useState<QuoteEstimation["frequency"]>("weekly");
  const [serviceType, setServiceType] = useState<string>("residential");

  const [addons, setAddons] = useState({
    windows: false,
    oven: false,
    fridge: false,
    ironing: false,
    cabinet: false,
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  // Toggle addons
  const toggleAddon = (key: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Base Calculation logic
  const estimation = useMemo(() => {
    let baseHours = 1.5; // absolute minimum hours
    baseHours += (squareMeters / 40); // 1 hour per 40 sq m
    baseHours += (rooms * 0.4); // 24 minutes per room
    baseHours += (bathrooms * 0.6); // 36 minutes per bathroom

    // Addon times
    if (addons.windows) baseHours += 1.0;
    if (addons.oven) baseHours += 0.8;
    if (addons.fridge) baseHours += 0.6;
    if (addons.ironing) baseHours += 1.5;
    if (addons.cabinet) baseHours += 1.2;

    // Hourly rates based on service types
    let pricePerHour = 24.90;
    if (serviceType === "deep") pricePerHour = 29.90;
    if (serviceType === "workspace") pricePerHour = 34.00;

    let subtotal = baseHours * pricePerHour;

    // Apply frequency discounts
    let discountPercent = 0;
    if (frequency === "weekly") discountPercent = 15; // 15% off regular hourly rate
    if (frequency === "biweekly") discountPercent = 10;
    if (frequency === "monthly") discountPercent = 5;

    const discountAmount = subtotal * (discountPercent / 100);
    const totalPrice = subtotal - discountAmount;

    return {
      totalHours: Math.round(baseHours * 2) / 2, // round to nearest 0.5 hour
      pricePerHour,
      subtotal,
      discountPercent,
      discountAmount,
      totalPrice: Math.round(totalPrice * 100) / 100,
      taxCreditPrice: Math.round((totalPrice / 2) * 100) / 100, // 50% Credit d'impôt
    };
  }, [squareMeters, rooms, bathrooms, frequency, serviceType, addons]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      return;
    }
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setIsBooked(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsBooked(false);
    setContactForm({ name: "", email: "", phone: "", notes: "" });
  };

  return (
    <section id="calculateur" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full mb-4">
            <Calculator id="cal-icon" className="w-3.5 h-3.5" />
            <span>ÉclatTarif — Simulateur Intelligent</span>
          </div>
          <h2 className="text-4xl font-serif font-semibold tracking-tight text-slate-900 mb-4">
            Simulateur de Devis Instantané
          </h2>
          <p className="text-slate-600 text-sm">
            Configurez votre offre de ménage personnalisée en quelques secondes. Nos heures s'ajustent pour refléter au plus près la réalité de vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form Panel */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            {/* Service Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                1. Type de prestation
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => { setServiceType("residential"); }}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    serviceType === "residential"
                      ? "border-cyan-600 bg-cyan-50/20 shadow-xs"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <Sparkles className={`w-5 h-5 mb-2 ${serviceType === "residential" ? "text-cyan-600" : "text-slate-400"}`} />
                  <div className="font-medium text-xs text-slate-900">Résidentiel Standard</div>
                  <div className="text-[10px] text-slate-500 mt-1">Dès 24,90€/h</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setServiceType("deep"); }}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    serviceType === "deep"
                      ? "border-cyan-600 bg-cyan-50/20 shadow-xs"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <Sparkles className={`w-5 h-5 mb-2 ${serviceType === "deep" ? "text-cyan-600" : "text-slate-400"}`} />
                  <div className="font-medium text-xs text-slate-900">Grand Nettoyage</div>
                  <div className="text-[10px] text-slate-500 mt-1">Dès 29,90€/h</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setServiceType("workspace"); }}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    serviceType === "workspace"
                      ? "border-cyan-600 bg-cyan-50/20 shadow-xs"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <Calculator className={`w-5 h-5 mb-2 ${serviceType === "workspace" ? "text-cyan-600" : "text-slate-400"}`} />
                  <div className="font-medium text-xs text-slate-900">Bureaux & Pro</div>
                  <div className="text-[10px] text-slate-500 mt-1">Dès 34,00€/h</div>
                </button>
              </div>
            </div>

            {/* Slider for Square Meters */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  2. Superficie du logement
                </label>
                <div className="bg-cyan-50 text-cyan-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {squareMeters} m²
                </div>
              </div>
              <input
                id="sqm-slider"
                type="range"
                min="20"
                max="300"
                step="5"
                value={squareMeters}
                onChange={(e) => setSquareMeters(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Studio (20 m²)</span>
                <span>Idéal moyen (120 m²)</span>
                <span>Villa prestigieuse (300+ m²)</span>
              </div>
            </div>

            {/* Rooms counter / selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">Nombre de chambres</div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-50 shadow-xs"
                  >
                    -
                  </button>
                  <span className="font-serif font-semibold text-slate-900 text-lg">{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(Math.min(10, rooms + 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-50 shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">Salles d'eau / WC</div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-50 shadow-xs"
                  >
                    -
                  </button>
                  <span className="font-serif font-semibold text-slate-900 text-lg">{bathrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.min(6, bathrooms + 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-50 shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Frequency options */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                3. Fréquence des prestations
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["once", "weekly", "biweekly", "monthly"] as const).map((freq) => {
                  const labelMap = {
                    once: "Unique",
                    weekly: "Hebdo.",
                    biweekly: "Quinzaine",
                    monthly: "Mensuel",
                  };
                  const discountMap = {
                    once: "Tarif brut",
                    weekly: "-15% VIP",
                    biweekly: "-10% Club",
                    monthly: "-5% Fidèle",
                  };
                  return (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`py-3 px-1.5 text-center rounded-xl border transition-all flex flex-col items-center justify-center ${
                        frequency === freq
                          ? "border-cyan-600 bg-cyan-50/35 text-slate-900"
                          : "border-slate-100 hover:border-slate-200 text-slate-600"
                      }`}
                    >
                      <span className="text-xs font-medium block">{labelMap[freq]}</span>
                      <span className={`text-[9px] mt-0.5 px-1.5 py-0.5 rounded-full inline-block ${
                        frequency === freq ? "bg-cyan-100/70 text-cyan-800" : "bg-slate-100 text-slate-500"
                      }`}>
                        {discountMap[freq]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Add-ons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                4. Options complémentaires prestigieuses
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toggleAddon("windows")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    addons.windows ? "border-cyan-600 bg-cyan-50/10" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${addons.windows ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-500"}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-900">Baies vitrées & Vitres</div>
                      <div className="text-[10px] text-slate-400">Dépoussiérage et reflets parfaits</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-800">+1 heure</div>
                    <div className="text-[10px] text-cyan-600">{addons.windows ? "Sélectionné" : ""}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleAddon("oven")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    addons.oven ? "border-cyan-600 bg-cyan-50/10" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${addons.oven ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-500"}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-900">Nettoyage Intérieur Four</div>
                      <div className="text-[10px] text-slate-400">Dégraissage haute température</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-800">+45 mins</div>
                    <div className="text-[10px] text-cyan-600">{addons.oven ? "Sélectionné" : ""}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleAddon("fridge")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    addons.fridge ? "border-cyan-600 bg-cyan-50/10" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${addons.fridge ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-500"}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-900">Désinfection Réfrigérateur</div>
                      <div className="text-[10px] text-slate-400">Hygiène alimentaire absolue</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-800">+35 mins</div>
                    <div className="text-[10px] text-cyan-600">{addons.fridge ? "Sélectionné" : ""}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleAddon("ironing")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    addons.ironing ? "border-cyan-600 bg-cyan-50/10" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${addons.ironing ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-500"}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-900">Repassage Professionnel</div>
                      <div className="text-[10px] text-slate-400">Pliage et dressage à domicile</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-800">+1,5 heure</div>
                    <div className="text-[10px] text-cyan-600">{addons.ironing ? "Sélectionné" : ""}</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Checkout Invoice receipt panel */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-24">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Receipt Notch Design */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-sky-500" />
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

              <div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-white">Votre Proposition ÉclatNet</h3>
                  <p className="text-xs text-slate-400 mt-1">Générée le {new Date().toLocaleDateString("fr-FR")}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-850 border border-slate-800">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                </div>
              </div>

              {/* Specification Invoice list */}
              <div className="space-y-4 mb-6 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Logement ({squareMeters} m²) :</span>
                  <span className="text-slate-100">Intilaïat</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 pl-4 border-l border-slate-800">
                  <span>Base de travail ({rooms} ch, {bathrooms} eau)</span>
                  <span>Inclus</span>
                </div>

                <div className="flex justify-between">
                  <span>Type de service :</span>
                  <span className="text-slate-100 underline decoration-cyan-500">
                    {serviceType === "residential" ? "Ménage Résidentiel" : serviceType === "deep" ? "Grand Nettoyage" : "Prestige Entreprises"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Fréquence choisie :</span>
                  <span className="text-slate-100">
                    {frequency === "once" ? "Unique" : frequency === "weekly" ? "Hebdomadaire" : frequency === "biweekly" ? "Toutes les 2 semaines" : "Mensuelle"}
                  </span>
                </div>

                {/* Add-ons list if any */}
                {Object.values(addons).some(Boolean) && (
                  <div className="pt-2 border-t border-slate-850 space-y-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Option(s) retenue(s)</span>
                    {addons.windows && <div className="flex justify-between text-xs text-slate-300 pl-2">⭐ Vitres et huisseries <span>+1h</span></div>}
                    {addons.oven && <div className="flex justify-between text-xs text-slate-300 pl-2">⭐ Nettoyage four profond <span>+45m</span></div>}
                    {addons.fridge && <div className="flex justify-between text-xs text-slate-300 pl-2">⭐ Désinfection frigo <span>+35m</span></div>}
                    {addons.ironing && <div className="flex justify-between text-xs text-slate-300 pl-2">⭐ Repassage d'élite <span>+1,5h</span></div>}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-xs">Durée totale estimée :</span>
                  <span className="font-semibold text-sm flex items-center gap-1.5 text-cyan-400">
                    <Clock className="w-3.5 h-3.5" /> {estimation.totalHours} heures / intervention
                  </span>
                </div>
              </div>

              {/* Total Price Highlights */}
              <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 mb-6 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Taux horaire moyen :</span>
                  <span>{estimation.pricePerHour.toFixed(2)} € / heure</span>
                </div>
                {estimation.discountPercent > 0 && (
                  <div className="flex justify-between items-center text-xs text-cyan-400 font-medium">
                    <span>Remise Fidélité ({estimation.discountPercent}%) :</span>
                    <span>-{estimation.discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-end">
                  <div>
                    <span className="text-xs text-slate-400 block font-light">Estimation mensuelle brute :</span>
                    <span className="font-serif font-semibold text-2xl text-white">{estimation.totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-cyan-400 block bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-md font-medium mb-1">
                      -50% Crédit d'impôt
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">Soit : {estimation.taxCreditPrice.toFixed(2)} €/mois</span>
                  </div>
                </div>
              </div>

              {/* Interactive Booking mini-form */}
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Votre Nom"
                          className="w-full bg-slate-850 border border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-hidden text-white"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="Téléphone"
                          className="w-full bg-slate-850 border border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-hidden text-white"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Adresse Email"
                        className="w-full bg-slate-850 border border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-hidden text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full h-11 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {bookingLoading ? (
                        <span>Transmission en cours...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Bloquer cette simulation et réserver</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" /> Vos informations restent cryptées et RGPD-compatibles.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-cyan-950/40 border border-cyan-850 rounded-2xl text-center space-y-3"
                  >
                    <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto" />
                    <div>
                      <h4 className="text-white font-serif font-semibold text-sm">Demande d'attribution reçue !</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Un conseiller d'entretien ÉclatNet va vous appeler au <span className="font-semibold">{contactForm.phone}</span> sous 2 heures ouvrables pour finaliser vos créneaux horaires.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[11px] underline text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Faire une nouvelle simulation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
