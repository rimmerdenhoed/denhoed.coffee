/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Mail, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const faqData = [
  {
    question: "Voor wie is de training bedoeld?",
    answer: "Voor teams die koffie op kantoor belangrijk vinden — en willen dat het ook echt goed smaakt.\n\nVan creatieve bureaus tot advocatenkantoren: iedereen die met trots koffie wil serveren, kan meedoen.\n\nHet is geen officiële baristaopleiding, maar een leuke, toegankelijke sessie waarin je leert hoe je met vertrouwen koffie zet die goed smaakt en er verzorgd uitziet — voor collega’s, klanten en bezoekers.\n\nParticulier of horeca? Hier ligt mijn focus, maar neem contact op voor mogelijkheden."
  },
  {
    question: "Hoeveel mensen kunnen er meedoen?",
    answer: "Tot 10 personen per training. Meerdere trainingen op 1 dag zijn mogelijk."
  },
  {
    question: "Hoe lang duurt de training en wat kost het?",
    answer: "De standaardtraining duurt 1,5 uur en kost €190 voor groepen tot 10 personen.\n\nIn overleg is er veel mogelijk, zoals een langere sessie, extra verdieping of meerdere groepen op één dag."
  },
  {
    question: "In welke taal wordt de training gegeven?",
    answer: "De training kan in het Nederlands of Engels worden gegeven — wat het beste past bij je team."
  },
  {
    question: "Hebben we een eigen machine nodig?",
    answer: "Ja, de training vindt idealiter plaats op jullie eigen espressomachine.\n\nZo leer je werken met de instellingen, maling en melk die je dagelijks gebruikt.\n\nGeen geschikte machine? De training kan ook plaatsvinden op een externe locatie, bijvoorbeeld bij Tuka Coffee Roasters in Nijmegen."
  },
  {
    question: "Wat moet er aan materiaal aanwezig zijn?",
    answer: "Een espressomachine, koffiemolen, koffie, volle melk en melkkannetjes.\n\nEventueel ook havermelk, kokosmelk of matcha als jullie dat gebruiken.\n\nTwijfel je over je koffiebonen of welk materiaal je het beste kunt aanschaffen? Neem gerust contact op — in overleg is veel mogelijk."
  },
  {
    question: "Hoe boeken we een training?",
    answer: "Vul dit formulier in of stuur een mail naar rimmer@denhoed.coffee.\n\nJe krijgt snel een reactie met beschikbare data en praktische info."
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-main-text/10">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left group transition-all"
        id={`faq-btn-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-xl md:text-2xl font-bold tracking-tighter group-hover:text-accent transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-accent"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-main-text/70 leading-relaxed text-lg whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('SUBMITTING');

    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setFormStatus('SUCCESS');
        form.reset();
      } else {
        setFormStatus('ERROR');
      }
    } catch {
      setFormStatus('ERROR');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.15 }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-main-bg text-main-text">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg py-4" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-serif font-bold tracking-tight lowercase" id="nav-logo">
            denhoed.coffee
          </a>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent transition-all group"
            id="nav-cta"
          >
            boek nu een training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pb-16 px-6 min-h-[85vh] flex items-center bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 items-start">
            {/* Image block - First on mobile (order-1), Right side on desktop (lg:order-2) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-32 order-1 lg:order-2"
            >
              {/* Image container adjusted to square-ish aspect ratio */}
              <div className="relative w-full aspect-square overflow-hidden rounded-3xl shadow-2xl shadow-black/5 bg-main-bg">
                <img 
                   src="/hero.jpeg" 
                   alt="Baristatraining" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                />
              </div>

              {/* Button moved below image - Desktop only */}
              <motion.div variants={fadeIn} className="hidden lg:block w-full pt-4">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-accent text-white px-8 py-6 rounded-full flex items-center justify-center gap-4 hover:bg-main-text hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group font-bold uppercase tracking-widest text-[10px]"
                >
                  boek nu een training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            {/* Text block - Second on mobile (order-2), Left side on desktop (lg:order-1) */}
            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-12 order-2 lg:order-1"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight font-bold text-main-text"
                id="hero-title"
              >
                Goede koffie,<br />
                Beter imago,<br />
                Blij team.
              </motion.h1>
              
              <motion.div variants={fadeIn} className="space-y-10 max-w-2xl">
                <p className="text-xl md:text-3xl font-medium leading-tight tracking-tight text-main-text/90">
                  Maak direct een goede indruk. Een baristaworkshop voor bedrijven waarin teambuilding en gastvrijheid samenkomen.
                </p>

                {/* Button - Mobile only, under headline */}
                <div className="lg:hidden pt-4">
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-accent text-white px-8 py-6 rounded-full flex items-center justify-center gap-4 hover:bg-main-text hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group font-bold uppercase tracking-widest text-[10px]"
                  >
                    boek nu een training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section (relocated and resized) */}
      <section className="pb-24 px-6 bg-white overflow-hidden border-b border-main-text/5">
        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <blockquote className="text-xl md:text-2xl lg:text-3xl leading-tight font-serif italic tracking-tight text-main-text/80">
              "Bedankt voor de verzorgde cursus van vandaag! We hebben al veel positieve reacties gehad en iedereen vond de cursus leerzaam."
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Poelman van den Broek Advocaten</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-main-text/30">Rishièna Kromowidjojo</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-white text-main-text px-6 border-y border-main-text/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl leading-tight font-serif font-bold tracking-tight">
              Er staat een dure espressomachine op kantoor — maar het resultaat valt tegen.
            </motion.h2>
            
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-12 text-lg text-main-text/70 leading-relaxed font-medium">
              <div className="space-y-6">
                <p>
                  De koffie smaakt wisselvallig, klanten laten hun kopje halfvol staan en medewerkers drinken het met tegenzin. Wat een bedoeld was als warm welkom, laat een bittere nasmaak achter.
                </p>
                <p className="text-accent font-bold">
                  Het goede nieuws: de machine is niet het probleem.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  De manier van zetten wel — en dat is zo opgelost.
                </p>
                <p className="text-main-text border-l-2 border-accent pl-6 py-2 italic font-serif bg-accent/5 rounded-r-2xl">
                  In anderhalf uur leert uw team koffie zetten die wél klopt — met kennis, aandacht en plezier. Koffie waar mensen van opkijken, en graag voor terugkomen.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Training Inhoud Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-24 order-2 lg:order-1"
            >
              <div className="space-y-10">
                <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                  De inhoud van de training
                </motion.h2>
                
                <motion.div variants={fadeIn} className="space-y-8 text-lg text-main-text/80 leading-relaxed">
                  <p className="font-bold text-main-text">
                    In anderhalf uur leer ik jullie team hoe je alles uit de espressomachine op kantoor haalt.
                  </p>
                  <p>
                    We beginnen bij de basis: hoe een espresso hoort te smaken, hoe je melk opschuimt en de eerste stappen zet in latte art. Zo leer je alles wat je wilt weten — van cappuccino’s en ‘gewone koffie’ tot een matcha latte.
                  </p>
                  <p>
                    Het is geen officiële baristaopleiding, maar een leuke, toegankelijke sessie waarin je leert hoe je met vertrouwen koffie zet die goed smaakt en er verzorgd uitziet — voor collega’s, klanten en bezoekers.
                  </p>
                </motion.div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="space-y-12">
                <motion.h3 variants={fadeIn} className="text-xl font-bold tracking-tight text-accent">
                  Veelgestelde vragen
                </motion.h3>
                <div className="space-y-2">
                  {faqData.map((faq, index) => (
                    <AccordionItem 
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqIndex === index}
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="lg:sticky lg:top-32 space-y-12 order-1 lg:order-2"
            >
              <div className="flex flex-col gap-8 h-full">
                {/* Handshake Image - now 3:2 and clean style */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="group relative overflow-hidden bg-main-text/5 rounded-3xl aspect-[3/2] shadow-2xl shadow-black/5"
                >
                  <img 
                    src="/training.jpg" 
                    alt="Baristatraining" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                
                {/* About Me Section */}
                <motion.div 
                  variants={fadeIn}
                  className="space-y-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">over mij</p>
                  <p className="text-sm text-main-text/60 leading-relaxed">
                    Na jaren achter de bar en een finaleplaats bij het Dutch Barista Championship, weet ik inmiddels precies wat een koffie echt goed maakt. Die kennis deel ik nu op kantoor. Ik krijg er simpelweg veel energie van om mensen te enthousiasmeren voor koffie — van de techniek achter een goede espresso tot het schenken van de perfecte latte art.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-32 px-6 bg-white border-y border-main-text/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-[10px] font-bold tracking-widest text-main-text/30 mb-20 uppercase"
          >
            ik heb al samengewerkt met
          </motion.p>
          <motion.div 
            variants={{
              initial: { opacity: 0 },
              whileInView: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 md:gap-x-24 md:gap-y-16"
          >
            {[
              { name: "SCA", src: "/logo-sca.png", height: "h-14" },
              { name: "Oatly", src: "/logo-oatly.png", height: "h-7" },
              { name: "Blommers", src: "/logo-blommers.webp", height: "h-9" },
              { name: "Poelman van den Broek", src: "/logo-poelman.png", height: "h-12" },
              { name: "Tuka", src: "/logo-tuka.webp", height: "h-14" }
            ].map((brand, i) => (
              <motion.div 
                key={i}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 }
                }}
                className="opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale"
              >
                <img 
                  src={brand.src} 
                  alt={brand.name} 
                  className={`${brand.height} w-auto object-contain mix-blend-multiply`}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Background Accent Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="group space-y-12"
          >
            <div className="space-y-6">
              <motion.h2 
                variants={fadeIn}
                className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight lowercase"
              >
                Klaar voor<br />
                betere<br />
                koffie?
              </motion.h2>
              <motion.div 
                variants={fadeIn}
                className="w-12 h-1 bg-accent rounded-full transition-all duration-500 group-hover:w-24"
              />
              <motion.p variants={fadeIn} className="text-xl font-medium tracking-tight text-main-text/50 max-w-sm leading-relaxed">
                Ik denk graag mee over wat het beste past bij jullie team.
              </motion.p>
            </div>

            <motion.div variants={fadeIn} className="space-y-10 pt-4">
              <div className="space-y-6">
                <p className="text-[10px] font-bold tracking-tight text-accent">Contactgegevens</p>
                <div className="space-y-6">
                  <motion.a 
                    whileHover={{ x: 10 }}
                    href="mailto:rimmer@denhoed.coffee" 
                    className="group flex items-center gap-4 text-xl md:text-2xl font-bold hover:text-accent transition-all"
                  >
                    <Mail className="w-5 h-5 text-accent group-hover:scale-125 transition-transform" /> rimmer@denhoed.coffee
                  </motion.a>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl md:text-2xl font-bold"
                  >
                    <MapPin className="w-5 h-5 text-accent" /> Nijmegen, NL
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <form 
              className="bg-white border border-main-text/5 p-10 md:p-14 rounded-[3.5rem] flex flex-col gap-8 shadow-2xl shadow-black/[0.02]"
              onSubmit={handleFormSubmit}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-main-text/30 pl-1">Naam *</label>
                  <input type="text" name="name" required className="w-full bg-main-bg border border-transparent focus:border-accent/20 px-6 py-4 rounded-xl outline-none transition-all font-bold tracking-tight" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-main-text/30 pl-1">Bedrijf</label>
                  <input type="text" name="company" className="w-full bg-main-bg border border-transparent focus:border-accent/20 px-6 py-4 rounded-xl outline-none transition-all font-bold tracking-tight" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-main-text/30 pl-1">E-mailadres *</label>
                <input type="email" name="email" required className="w-full bg-main-bg border border-transparent focus:border-accent/20 px-6 py-4 rounded-xl outline-none transition-all font-bold tracking-tight" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-main-text/30 pl-1">Gewenste datum en tijd</label>
                <div className="relative">
                  <input type="text" name="date" className="w-full bg-main-bg border border-transparent focus:border-accent/20 px-6 py-4 rounded-xl outline-none transition-all font-bold tracking-tight" />
                  <Calendar className="absolute right-5 top-5 w-4 h-4 opacity-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-main-text/30 pl-1">Opmerkingen</label>
                <textarea name="message" className="w-full bg-main-bg border border-transparent focus:border-accent/20 px-6 py-4 rounded-2xl outline-none transition-all font-bold tracking-tight min-h-[120px] resize-none" />
              </div>
              
              <button 
                type="submit"
                disabled={formStatus === 'SUBMITTING'}
                className={`w-full py-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-500 shadow-lg shadow-main-text/5 ${
                  formStatus === 'SUBMITTING' 
                    ? 'bg-main-text/20 text-main-text cursor-not-allowed' 
                    : 'bg-main-text text-white hover:bg-accent hover:scale-[1.01] active:scale-[0.98]'
                }`}
              >
                {formStatus === 'SUBMITTING' ? 'Bericht wordt verzonden...' : 'Plan een training'}
              </button>

              <AnimatePresence>
                {formStatus === 'SUCCESS' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent text-xs font-bold text-center"
                  >
                    Bedankt! Ik neem zo snel mogelijk contact met je op.
                  </motion.p>
                )}
                {formStatus === 'ERROR' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-bold text-center"
                  >
                    Er ging iets mis. Probeer het later opnieuw of stuur een mail.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-white text-main-text border-t border-main-text/5 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-sm">
            <h3 className="text-2xl font-serif font-bold tracking-tight lowercase text-accent">denhoed.coffee</h3>
            <p className="text-lg font-medium tracking-tight text-main-text/40 leading-snug">Zakelijke baristatrainingen voor een betere eerste indruk en een blij team.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[10px] font-bold uppercase tracking-widest text-main-text/60">
            <div className="space-y-6">
              <p className="text-accent underline underline-offset-4">Menu</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-left hover:text-accent transition-colors">Home</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="text-left hover:text-accent transition-colors">Contact</button>
                <button onClick={() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})} className="text-left hover:text-accent transition-colors">FAQ</button>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-accent underline underline-offset-4">Social</p>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/denhoed.coffee/" className="flex items-center gap-2 hover:text-accent transition-colors">
                   Instagram
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-accent underline underline-offset-4">Details</p>
              <div className="flex flex-col gap-4 text-main-text/30">
                <p>KVK: 5954958</p>
                <p>Nijmegen, NL</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
