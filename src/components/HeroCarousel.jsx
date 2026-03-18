import { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES } from '../data/data';

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef  = useRef({ dragging: false, startX: 0, diffX: 0 });
  const total    = SLIDES.length;

  const goTo = useCallback((n, animate = true) => {
    const idx = ((n % total) + total) % total;
    setCurrent(idx);
    if (trackRef.current) {
      trackRef.current.style.transition = animate ? 'transform 0.55s cubic-bezier(0.77,0,0.18,1)' : 'none';
      trackRef.current.style.transform  = `translateX(-${idx * 100}%)`;
    }
  }, [total]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % total;
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.55s cubic-bezier(0.77,0,0.18,1)';
          trackRef.current.style.transform  = `translateX(-${next * 100}%)`;
        }
        return next;
      });
    }, 3000);
  }, [total]);

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [resetTimer]);

  const onDragStart = (x) => { dragRef.current = { dragging:true, startX:x, diffX:0 }; if(trackRef.current) trackRef.current.style.transition='none'; clearInterval(timerRef.current); };
  const onDragMove  = (x) => { if(!dragRef.current.dragging) return; const diff=x-dragRef.current.startX; dragRef.current.diffX=diff; if(trackRef.current) trackRef.current.style.transform=`translateX(calc(-${current*100}% + ${diff}px))`; };
  const onDragEnd   = ()  => { if(!dragRef.current.dragging) return; dragRef.current.dragging=false; const{diffX}=dragRef.current; if(diffX<-55) goTo(current+1); else if(diffX>55) goTo(current-1); else goTo(current); resetTimer(); };

  return (
    <div className="hero-wrap" onMouseDown={e=>onDragStart(e.clientX)} onMouseMove={e=>onDragMove(e.clientX)} onMouseUp={onDragEnd} onMouseLeave={onDragEnd} onTouchStart={e=>onDragStart(e.touches[0].clientX)} onTouchMove={e=>onDragMove(e.touches[0].clientX)} onTouchEnd={onDragEnd}>
      <div className="hero-track" ref={trackRef}>
        {SLIDES.map((slide, i) => (
          <div key={i} className="hero-slide" style={{ background: slide.bg }}>
            <div className="slide-content">
              <p className="slide-tag">{slide.tag}</p>
              <h1 className="slide-h1">{slide.title[0]}<br />{slide.title[1]}</h1>
              <button className="slide-btn">{slide.btn}</button>
            </div>
            <img className="slide-img" src={slide.img} alt={slide.title.join(' ')} draggable={false} />
            <div className="slide-num">{slide.num}</div>
          </div>
        ))}
      </div>
      <button className="hero-arrow hero-prev" onClick={() => { goTo(current-1); resetTimer(); }}>‹</button>
      <button className="hero-arrow hero-next" onClick={() => { goTo(current+1); resetTimer(); }}>›</button>
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot ${i===current?'active':''}`} onClick={() => { goTo(i); resetTimer(); }} />
        ))}
      </div>
    </div>
  );
}
export default HeroCarousel;