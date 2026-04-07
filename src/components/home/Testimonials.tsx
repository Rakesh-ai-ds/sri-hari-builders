"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sri Hari Builders provides excellent construction quality with strong structures and neat finishing. The team is professional, punctual, and pays close attention to every detail. Their work clearly shows durability and good planning.",
    author: "Mouleesh S",
    position: "Verified Client",
  },
  {
    quote: "I had a very good experience with this land promoter. They were transparent, supportive, and guided me clearly through the entire process. All documentation was handled professionally. Highly recommended.",
    author: "Santhosh K",
    position: "Property Investor",
  },
  {
    quote: "Good builders and on time project completion finished. Proper planning and excellent execution. Highly satisfied with the results.",
    author: "Gopalsri N",
    position: "Home Owner",
  },
  {
    quote: "Best infrastructure and Good experience Worker. Professional site engineers and client user-friendly staff. A very positive experience overall.",
    author: "Sabarigiri Sakthivel",
    position: "Verified Client",
  },
  {
    quote: "Good builders and very good experiences. The team is dedicated and the quality of work is exceptional. Thank you for the dream home.",
    author: "Saravana Preethi",
    position: "Home Owner",
  },
  {
    quote: "Excellent construction quality and professional service. One of the best builders in Coimbatore. 💯",
    author: "Gowtham Gowtham",
    position: "Verified Client",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-48 bg-charcoal text-off-white overflow-hidden relative">
      {/* Background Decorative Quote */}
      <Quote className="absolute top-10 left-10 w-96 h-96 text-white/5 -rotate-12" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
         <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">Kind Words</span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            Our <span className="text-gold italic">Clients’</span> Voice.
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="px-8 md:px-20"
            >
              <Quote className="w-12 h-12 text-gold mx-auto mb-8 opacity-40" />
              <p className="text-2xl md:text-4xl font-serif text-white/90 mb-12 leading-relaxed">
                &quot;{testimonials[current].quote}&quot;
              </p>
              <div>
                <h4 className="text-lg font-serif text-gold tracking-widest">{testimonials[current].author}</h4>
                <p className="text-off-white/40 text-xs uppercase tracking-[0.3em] font-light mt-2">{testimonials[current].position}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 opacity-40 hover:opacity-100 transition-opacity">
            <button onClick={prev} className="p-3 border border-white/20 rounded-full hover:bg-gold hover:text-charcoal transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-3 border border-white/20 rounded-full hover:bg-gold hover:text-charcoal transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-1 rounded-full transition-all duration-500 ${
                current === idx ? "bg-gold w-10" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
