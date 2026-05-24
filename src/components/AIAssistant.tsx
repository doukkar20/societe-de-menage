import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Bot, Wand2, RefreshCw, Send, HelpCircle, ShieldAlert, Award, FileText, Printer, Check } from "lucide-react";
import { ChatMessage, ServicePlanRequest } from "../types";

// Helper function to render simple markdown safe and beautifully in React
function SimpleMarkdown({ text }: { text: string }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div className="space-y-4 font-sans text-sm text-slate-700 leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        // Headers
        if (trimmed.startsWith("####")) {
          return (
            <h5 key={index} className="text-sm font-semibold text-slate-900 mt-4 mb-2 flex items-center gap-1.5 font-serif border-l-2 border-cyan-500 pl-2">
              {trimmed.replace("####", "").replace(/\*\*/g, "").trim()}
            </h5>
          );
        }
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={index} className="text-base font-serif font-semibold text-slate-900 mt-6 mb-3 border-b border-cyan-100 pb-1.5">
              {trimmed.replace("###", "").replace(/\*\*/g, "").trim()}
            </h4>
          );
        }
        if (trimmed.startsWith("##") || trimmed.startsWith("#")) {
          return (
            <h3 key={index} className="text-lg font-serif font-semibold text-slate-900 mt-8 mb-4">
              {trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim()}
            </h3>
          );
        }

        // Bullet lists
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          // Parse bold markers inside list items
          const listText = trimmed.substring(1).trim();
          return (
            <div key={index} className="flex items-start gap-2 pl-2 my-1">
              <span className="text-cyan-500 mt-1 flex-shrink-0">•</span>
              <p className="text-slate-600">
                {renderBoldText(listText)}
              </p>
            </div>
          );
        }

        // Horizontal Rule
        if (trimmed === "---") {
          return <hr key={index} className="my-6 border-slate-100" />;
        }

        // Normal paragraph (render with bold parser)
        if (trimmed !== "") {
          return (
            <p key={index} className="text-slate-600 font-normal">
              {renderBoldText(trimmed)}
            </p>
          );
        }

        return <div key={index} className="h-1.5" />;
      })}
    </div>
  );
}

// Simple bold parsing utility, converting **text** to standard <strong>
function renderBoldText(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-semibold text-slate-950">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export function AIAssistant() {
  const [activeTab, setActiveTab] = useState<"plan" | "advisor">("plan");

  // AI custom plan states
  const [planForm, setPlanForm] = useState<ServicePlanRequest>({
    squareMeters: 80,
    frequency: "weekly",
    roomsSelected: ["Cuisine", "Séjour", "Salles d'eau"],
    specialInstructions: "",
    petPresence: false,
    priorityAreas: ""
  });
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState<boolean>(false);
  const [planStep, setPlanStep] = useState<string>("");

  // AI chat advisor states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Bonjour, je suis votre conseiller ÉclatNet en gouvernance d'intérieur. Posez-moi vos questions sur le traitement d'une tache rebelle (vin rouge, calcaire, cire, café), le froissage du lin, ou l'utilisation écologique de l'acide citrique !",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const availableRoomsList = ["Cuisine", "Séjour / Salon", "Chambre Parentale", "Salles de bains / Salles d'eau", "Dressing", "Bureau", "Véranda & Vitrages"];

  const handleRoomToggle = (room: string) => {
    setPlanForm(prev => {
      const selected = prev.roomsSelected.includes(room)
        ? prev.roomsSelected.filter((r) => r !== room)
        : [...prev.roomsSelected, room];
      return { ...prev, roomsSelected: selected };
    });
  };

  // Generate Personalized cleaning specification plan
  const generatePlanAction = async () => {
    setPlanLoading(true);
    setPlanStep("Analyse de la géométrie du logement...");

    const steps = [
      "Cartographie des surfaces d'excellence...",
      "Calcul des coefficients d'hygiène hôtelière...",
      "Planification des recettes éco-responsables...",
      "Rédaction du protocole final d'excellence..."
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setPlanStep(steps[currentStepIndex]);
        currentStepIndex++;
      }
    }, 1000);

    try {
      const response = await fetch("/api/gemini/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planForm)
      });
      const data = await response.json();
      if (response.ok) {
        setGeneratedPlan(data.text);
      } else {
        throw new Error(data.error || "Une erreur est survenue lors de l'appel au serveur.");
      }
    } catch (error) {
      console.error(error);
      setGeneratedPlan(`### ⚠️ Connexion temporairement perturbée
Échec de l'accès à nos calculateurs distants. Mais ne vous inquiétez pas, notre protocole d'hygiène de base est applicable !

Veuillez réessayer la génération dans un instant.`);
    } finally {
      clearInterval(interval);
      setPlanLoading(false);
      setPlanStep("");
    }
  };

  // Chat conversation send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || chatLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setChatLoading(true);

    // Append standard history
    const payloadMessages = [...chatMessages, userMsg].map((msg) => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });
      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => [
          ...prev,
          {
            id: `model-${Date.now()}`,
            role: "model",
            content: data.text,
            timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          content: "Je m'excuse, une petite perturbation s'est produite lors de la connexion avec nos maîtres de maison. Posez votre question à nouveau.",
          timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="assistant-ia" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>Service Conciergerie IA d'Élite</span>
          </div>
          <h2 className="text-4xl font-serif font-semibold tracking-tight text-slate-900 mb-4">
            Intelligence de Maison
          </h2>
          <p className="text-slate-600 text-sm">
            Bénéficiez de conseils hôteliers instantanés en ligne. Générez une charte de nettoyage ou résolvez toutes vos énigmes de taches et matières d'art.
          </p>

          {/* Tab Selector */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-100 p-1.5 rounded-full inline-flex border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  activeTab === "plan" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Plan de Ménage IA</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("advisor")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  activeTab === "advisor" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Conseils & Antitaches - Chat Expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Tab content */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xs max-w-5xl mx-auto">
          {activeTab === "plan" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Form Config Plan */}
              <div className="md:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200/60">
                <h3 className="font-serif font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  <span>Cahier d'activité</span>
                </h3>

                {/* Sqm Area */}
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">Superficie estimée ({planForm.squareMeters} m²)</label>
                  <input
                    type="range"
                    min="30"
                    max="250"
                    step="10"
                    value={planForm.squareMeters}
                    onChange={(e) => setPlanForm({ ...planForm, squareMeters: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                {/* Rooms selection checkboxes */}
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-2">Salles prioritaires</label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableRoomsList.map((room) => {
                      const selected = planForm.roomsSelected.includes(room);
                      return (
                        <button
                          key={room}
                          type="button"
                          onClick={() => handleRoomToggle(room)}
                          className={`text-[10px] font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                            selected ? "bg-cyan-50 text-cyan-800 border-cyan-200" : "bg-white text-slate-600 border-slate-100"
                          }`}
                        >
                          {room} {selected ? "✓" : "+"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Priority / Areas */}
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">Exigences ou zones d'élite</label>
                  <input
                    type="text"
                    placeholder="ex: Ravivement du plan en marbre, argenterie..."
                    value={planForm.priorityAreas}
                    onChange={(e) => setPlanForm({ ...planForm, priorityAreas: e.target.value })}
                    className="w-full text-xs font-normal border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:border-slate-400"
                  />
                </div>

                {/* Pet presence checkbox toggles */}
                <div className="flex items-center justify-between py-2 border-y border-slate-100">
                  <div>
                    <span className="text-xs font-medium text-slate-700 block">Présence d'animaux domestiques</span>
                    <span className="text-[10px] text-slate-400">Pour le choix de buses hépatiques</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlanForm({ ...planForm, petPresence: !planForm.petPresence })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                      planForm.petPresence ? "bg-cyan-600" : "bg-slate-200"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                      planForm.petPresence ? "translate-x-6" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Core instructions text area */}
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">Instructions complémentaires</label>
                  <textarea
                    rows={2}
                    placeholder="ex: Attention au meuble laqué noir, ou clés sous paillasson..."
                    value={planForm.specialInstructions}
                    onChange={(e) => setPlanForm({ ...planForm, specialInstructions: e.target.value })}
                    className="w-full text-xs font-normal border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:border-slate-400 resize-none animate-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={planLoading}
                  onClick={generatePlanAction}
                  className="w-full h-11 bg-slate-900 border border-slate-950 text-white text-xs font-medium flex items-center justify-center gap-2 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors disabled:opacity-40"
                >
                  {planLoading ? (
                    <>
                      <Wand2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Configuration en cours...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Lancer la génération hôtelière</span>
                    </>
                  )}
                </button>
              </div>

              {/* Display Result specifications plan */}
              <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/60 shadow-xs min-h-[440px] flex flex-col relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {planLoading ? (
                    <motion.div
                      key="loading-spec"
                      className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin flex items-center justify-center" />
                      <div>
                        <h4 className="font-serif font-medium text-slate-900">Protocole ÉclatNet IA</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs">{planStep}</p>
                      </div>
                    </motion.div>
                  ) : generatedPlan ? (
                    <motion.div
                      key="result-spec"
                      className="flex-1 flex flex-col justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="overflow-y-auto max-h-[380px] pr-2 mb-6">
                        <SimpleMarkdown text={generatedPlan} />
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-yellow-500" /> Protocole gouvernance VIP
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setGeneratedPlan(null)}
                            className="bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                          >
                            Réinitialiser
                          </button>
                          <button
                            type="button"
                            onClick={handlePrint}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Imprimer / PDF</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder-spec"
                      className="flex-1 flex flex-col items-center justify-center text-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 mb-4">
                        <Wand2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-semibold text-slate-900 mb-1">Cahier des charges sur-mesure</h4>
                      <p className="text-xs text-slate-500 max-w-sm">
                        Remplissez la configuration de votre de logement à gauche et cliquez sur le bouton de génération pour obtenir un descriptif hôtelier de tâches rigoureux rédigé par notre IA.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            // Chat advisor tab interface
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Left sidebar info or helper questions */}
              <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/60 hidden md:block">
                <h4 className="font-serif font-semibold text-slate-900 text-sm mb-4">Inspirations de questions</h4>
                <div className="space-y-2">
                  {[
                    "Comment nettoyer une tache de gras sur un canapé ?",
                    "Recette écologique de nettoyant multi-surface",
                    "Comment bien entretenir un parquet ancien précieux ?",
                    "Astuce pour dégraisser le fond d'un four noirci"
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setUserInput(q)}
                      className="w-full text-left text-xs text-slate-600 hover:text-cyan-800 hover:bg-slate-50 border border-slate-100 hover:border-cyan-100 p-2.5 rounded-xl transition-all cursor-pointer font-normal line-clamp-2"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-[10px] text-slate-400">Recommandations de préservation d'art</span>
                </div>
              </div>

              {/* Core Chat dialogue workspace */}
              <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-xs flex flex-col h-[480px]">
                {/* Chat title bar */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-700">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">Conseiller d'Entretien ÉclatNet</h4>
                      <span className="text-[9px] text-cyan-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" /> Expert disponible instantanément
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages scroller block */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                      >
                        {!isUser && (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold mt-1.5 flex-shrink-0">
                            E
                          </div>
                        )}
                        <div>
                          <div
                            className={`p-4 rounded-2xl text-xs font-normal leading-relaxed ${
                              isUser
                                ? "bg-slate-900 border border-slate-950 text-white rounded-tr-none"
                                : "bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100"
                            }`}
                          >
                            {isUser ? (
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                              <SimpleMarkdown text={msg.content} />
                            )}
                          </div>
                          <span className="text-[8px] text-slate-400 block px-1 mt-1 text-right">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {chatLoading && (
                    <div className="flex gap-3 mr-auto max-w-[80%]">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold mt-1.5 flex-shrink-0">
                        E
                      </div>
                      <div className="bg-slate-50 text-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 text-xs">
                        <div className="flex items-center gap-1 py-1 px-2">
                          <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-slate-450 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Send message text input footer bar */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    required
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={chatLoading}
                    placeholder="Posez votre question (ex: Enlever tache d'encre marbre...)"
                    className="flex-1 bg-slate-50 border border-slate-100 focus:outline-hidden focus:border-slate-300 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 transition-all font-normal"
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || chatLoading}
                    className="w-10 h-10 bg-slate-900 border border-slate-950 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-45"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
