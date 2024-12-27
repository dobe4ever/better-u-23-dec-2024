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

  const messages = [
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
  ];

  return (
    <div className="w-full flex flex-col gap-4 mt-1 mb-0">
      {/* Top container for Bot and Message */}
      <div className="flex items-start gap-4">
        {/* Bot icon container */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Bot size={24} className="text-orange-400" />
          </div>
        </div>

        {/* Message carousel container */}
        <div className="flex-grow overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {messages.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="border-l-4 pl-3 border-orange-400">
                  <p className="font-semibold text-gray-900">
                    {item.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2">
        {messages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? 'bg-orange-400 w-4' // Make active dot wider
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}