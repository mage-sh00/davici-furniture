import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDES } from '../data/data';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const goTo = useCallback((n) => {
    const idx = ((n % total) + total) % total;
    setCurrent(idx);
  }, [total]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {SLIDES.map((slide, i) =>
          i === current ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 flex items-center"
              style={{ background: slide.bg }}
            >
              <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left */}
                <div className="flex-1 space-y-6 z-10">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-xs font-bold tracking-widest text-yellow-600 border border-yellow-600 px-4 py-1.5 rounded-full"
                  >
                    {slide.tag}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold leading-tight text-gray-800"
                  >
                    {slide.title[0]} <br />
                    <span className="text-yellow-600">{slide.title[1]}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 text-lg max-w-md"
                  >
                    Discover our handcrafted furniture collection, made with premium materials for your home.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-300"
                    >
                      {slide.btn}
                    </motion.button>
                    <button className="text-gray-500 font-semibold hover:text-yellow-600 transition-colors">
                      View Lookbook →
                    </button>
                  </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="flex-1 flex justify-center"
                >
                  <img
                    src={slide.img}
                    alt={slide.title.join(' ')}
                    className="w-full max-w-lg h-[65vh] object-cover rounded-3xl shadow-2xl"
                  />
                </motion.div>
              </div>

              {/* Slide number */}
              <div className="absolute bottom-8 right-12 text-7xl font-bold text-black/5 select-none">
                {slide.num}
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => { goTo(current - 1); resetTimer(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold text-gray-700 hover:text-yellow-600 transition-all z-10"
      >
        ‹
      </button>
      <button
        onClick={() => { goTo(current + 1); resetTimer(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold text-gray-700 hover:text-yellow-600 transition-all z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer(); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-yellow-600' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}