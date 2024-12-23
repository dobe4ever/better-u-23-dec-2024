// components/sticky-top-widget.tsx

'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';

export function StickyTopWidget() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return;

  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > 50;
  const isRightSwipe = distance < -50;

  if (isLeftSwipe && activeSlide < 2) {
      setActiveSlide((prev) => prev + 1);
  }
  if (isRightSwipe && activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
  }
  setTouchStart(null);
  setTouchEnd(null);
  };

  return (
    <>
      <div className="h-full px-4 w-1/4 flex flex-col items-center bg-white z-10">
        <Bot size={20} className="text-orange-400 mb-1.5" />
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'bg-orange-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      
      <div
        className="h-full flex flex-col items-center flex-grow"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out w-full"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {[
            {
              message: "Focus on completing your 'Morning Meditation' habit.",
              source: "Based on decreased performance & consistency",
            },
            {
              message: "15% increase in productivity observed",
              source: "Compared to your previous week",
            },
            {
              message: "You're building a strong routine",
              source: "3 days streak! Keep it up!",
            },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <blockquote className="border-l-4 pl-3 h-full border-orange-400 italic text-sm text-gray-400">
                <p className="text-black font-bold">
                  {item.message}
                </p>
                <p className="text-gray-500">
                  {item.source}
                </p>
              </blockquote>
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
}