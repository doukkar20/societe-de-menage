/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { QuoteCalculator } from "./components/QuoteCalculator";
import { AIAssistant } from "./components/AIAssistant";
import { EcoCommitment } from "./components/EcoCommitment";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden antialiased">
      {/* Scroll indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 z-50 pointer-events-none" />

      {/* Corporate Glass Navy bar */}
      <Navbar />

      {/* Main visual and greeting */}
      <Hero />

      {/* Catalog lists */}
      <Services />

      {/* Interactive Booking Calculator receipt engine */}
      <QuoteCalculator />

      {/* Gemini API custom checklists + chats assistant */}
      <AIAssistant />

      {/* Custom ingredients displaying */}
      <EcoCommitment />

      {/* Reviews and FAQ accordion */}
      <Testimonials />

      {/* Elegant footer details */}
      <Footer />
    </div>
  );
}
