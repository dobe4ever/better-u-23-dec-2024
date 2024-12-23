// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  School,
  UserCircle,
  Activity,
  Bell,
  Menu,
  ChevronRight,
  Bot,
  Calendar,
  Store,
  GraduationCap,
  LoaderPinwheel,
  Trophy,
  X,
  TrendingUp,
} from 'lucide-react';

// Common Widget component
interface WidgetProps {
  title: string;
  children: ReactNode;
  onClick?: () => void;
  rightIcon?: ReactNode;
  className?: string;
}
export function Widget({
  title,
  children,
  onClick,
  rightIcon = <ChevronRight size={16} className="text-orange-400" />,
  className = '',
}: WidgetProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-3 border shadow-md ${
        onClick ? 'cursor-pointer' : ''
      } group ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-0">
        <h2 className="text-lg font-semibold">{title}</h2>
        {rightIcon}
      </div>
      {children}
    </div>
  );
}

export default function Component() {
  // Sticky top widget:
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

  // Undelay Widget:
  const [showWidget, setShowWidget] = useState(true);
  if (!showWidget) return null;

  // Fading scroll header effect:
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    // Set initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
  const fadePercentage = headerHeight
    ? Math.max(100 - (scrollPosition / headerHeight) * 100, 0)
    : 100;

  return (
    // Main container
    <div className="bg-white min-h-screen w-full">
      {/* White overlay */}
      <div
        style={{ opacity: `${1 - fadePercentage / 100}` }}
        className="absolute inset-0 bg-white transition-opacity duration-300 ease-in-out z-10"
      ></div>

      <div
        className={`relative z-20 transition-colors duration-300 ease-in-out ${
          fadePercentage === 0 ? 'bg-white' : ''
        }`}
      >
        {/* HEADER */}
        <div className="w-full flex flex-col">
          {/* Fade effect openning div */}
          <div
            ref={headerRef}
            className="flex flex-col items-center justify-center transition-opacity duration-300 bg-white"
            style={{ opacity: `${fadePercentage / 100}` }}
          >
            {/* TOPBAR */}
            <div className="w-full flex justify-between items-center text-white text-xl font-bold bg-orange-400 p-2 z-10">
              {/* Left */}
              <div className="flex items-center space-x-4">
                <Menu className="h-5 w-5" />
                <div>Hi Brotastic</div>
              </div>
              {/* Right */}
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5" />
                <UserCircle className="h-5 w-5" />
              </div>
            </div>

            {/* BOX AVATAR */}
            <div className="w-full flex flex-col justify-center items-center bg-white overflow-hidden">
              <div className="flex flex-col items-center w-full">
                {/* Avatar */}
                <div className="w-full flex justify-center z-10">
                  <img
                    className="overflow-hidden shadow-md border-4 border-orange-300 w-[75%] aspect-[1/1] rounded-full z-10"
                    src="https://i.pravatar.cc/300"
                    alt="User avatar"
                  />
                </div>

                {/* Skewed orange bg*/}
                <div className="-mt-[25%] bg- w-full aspect-[1/1]">
                  <div className="h- flex justify-center items-center">
                    <div className="absolute top-0 left-0 h-[24vh] w-1/2 bg-orange-400 origin-top-left transform -skew-y-12"></div>
                    <div className="absolute top-0 right-0 h-[24vh] w-1/2 bg-orange-400 origin-top-right transform skew-y-12"></div>
                  </div>
                </div>

                {/* Current date */}
                <div className="-mt-[73%] w-full font-bold text-center text-3xl px-4 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="w-full pt-1 text-center"
                  >
                    <h1 className="text-black">
                      <span className="tracking-tighter font-bold text-title-orange">
                        FRIDAY DECEMBER 6, 2024
                      </span>
                    </h1>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>{' '}
          {/* fade effect closing div */}
        </div>

        {/* STICKY TOP WIDGET: */}
        <div className="sticky top-0 bg-white w-full py-2 flex flex-row justify-between overflow-hidden bg-white z-20">
          {/* Left: */}
          <div className="h-full px-4 w-1/4 flex flex-col items-center bg-white z-10">
            <Bot size={20} className="text-orange-400 mb-1.5" />
            {/* Dot indicators */}
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'bg-orange-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: */}
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
                  message:
                    "Focus on completing your 'Morning Meditation' habit.",
                  source: 'Based on decreased performance & consistency',
                },
                {
                  message: '15% increase in productivity observed',
                  source: 'Compared to your previous week',
                },
                {
                  message: "You're building a strong routine",
                  source: '3 days streak! Keep it up!',
                },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <blockquote className="border-l-4 pl-3 h-full border-orange-400 italic text-sm text-gray-400">
                    <p className="text-black font-bold">{item.message}</p>
                    <p className="text-gray-500">{item.source}</p>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WIDGETS CONTAINER */}
        <div className="flex flex-col shadow-md border-t bg-white rounded-t-2xl w-full gap-4 mt-4 p-4 overflow-auto">
          {/* UndelayWidget component: */}
          <div className="relative flex items-center justify-between bg-gray-100 rounded-2xl pt-8 pl-2 pr-2 -mb-10 shadow-none border-2 border-white max-w-[100%] mx-">
            {/* Left side: Description */}
            <div className="flex flex-col">
              <p className="text-xs -mt-6">
                50% off premium features, limited time
              </p>
            </div>
            {/* Right side: Link and Close */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2 space-x-1">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-400 font-semibold -mt-8"
                >
                  Upgrade Now
                </a>
                <button
                  className="text-orange-400 -mt-8"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent handlers (if any)
                    setShowWidget(false);
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Habits Widget*/}
          <Widget title="Today's Habits" onClick={() => {}}>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-xl font-bold">8/10</p>
              </div>
              <p className="text-4xl font-bold">80%</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
                style={{ width: '80%', transition: 'width 1s ease-in-out' }}
              />
            </div>
          </Widget>

          {/* Todos Widget*/}
          <Widget title="Today's Todos" onClick={() => {}}>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-xl font-bold">3/12</p>
              </div>
              <p className="text-4xl font-bold">29%</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
                style={{ width: '29%', transition: 'width 1s ease-in-out' }}
              />
            </div>
          </Widget>

          {/* 2 by 2 Grid Widgets */}
          <div className="grid grid-cols-2 gap-4">
            {/* Calendar Widget */}
            <Widget title="Calendar" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <Calendar className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">23</span>
                <span className="text-sm text-gray-400">Dec 2024</span>
              </div>
            </Widget>

            {/* Analytics Widget */}
            <Widget title="Analytics" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <Activity className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">98%</span>
                <span className="text-sm text-gray-400">Tracking</span>
              </div>
            </Widget>

            {/* AI Coach Widget */}
            <Widget title="AI Coach" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <Bot className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">Checking</span>
                <span className="text-sm text-gray-400">Habits</span>
              </div>
            </Widget>

            {/* Achievements Widget */}
            <Widget title="Achievements" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <Trophy className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">85</span>
                <span className="text-sm text-gray-400">Points</span>
              </div>
            </Widget>
          </div>

          {/* Carousel Widget */}
          <Widget title="Ads" className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out w-full"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {[
                {
                  message: 'Learn more about our new products',
                  source: 'Exclusive offers for today',
                },
                {
                  message: 'Boost your productivity with our AI tools',
                  source: 'Upgrade to our premium plan',
                },
                {
                  message: 'Join our community and connect with others',
                  source: 'Find support and accountability',
                },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <blockquote className="border-l-4 pl-3 h-full border-orange-400 italic text-sm text-gray-400">
                    <p className="text-black font-bold">{item.message}</p>
                    <p className="text-gray-500">{item.source}</p>
                  </blockquote>
                </div>
              ))}
            </div>
          </Widget>

          {/* Life Score and Courses Widgets */}
          <div className="grid grid-cols-2 gap-4">
            {/* Life Score Widget */}
            <Widget title="Life Score" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <Activity className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">98</span>
                <span className="text-sm text-gray-400">Score</span>
              </div>
            </Widget>

            {/* Courses Widget */}
            <Widget title="Courses" onClick={() => {}}>
              <div className="flex flex-col items-center mt-2">
                <School className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-2xl font-bold">12</span>
                <span className="text-sm text-gray-400">Completed</span>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
}
