// components/widgets.tsx
'use client'

import { useState } from 'react'
import { ReactNode } from 'react'
import {
    Activity,
    ChevronRight,
    Bot,
    Store,
    GraduationCap,
    LoaderPinwheel,
    Trophy,
    X,
    ArrowLeft,
    ArrowRight 
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

// UnderlayWidget component
export function UnderlayWidget() {
  const [showWidget, setShowWidget] = useState(true)

  if (!showWidget) return null

  return (
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
  );
}

// AnnouncementWidget component
export function AnnouncementWidget() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  if (!showAnnouncement) return null

  return (
    <Widget
      className="relative overflow-hidden"
      title="Premium Upgrade"
      rightIcon={
        <button
          className="absolute top-4 right-4 text-orange-main"
          onClick={(e) => {
            e.stopPropagation()  // Prevents triggering any parent onClick handlers
            setShowAnnouncement(false)
          }}
        >
          <X size={16} />
        </button>
      }
    >
      <p className="text-description-card">
        50% off premium features, limited time
      </p>
      <div className="my-2">
        <a
          href="https://vercel.com/dobe4evers-projects/vitejs-node-ts-tailwind-better-you"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-orange-main text-orange-main px-2 py-1.5 rounded-full"
        >
          Claim Offer
        </a>
      </div>
    </Widget>
  )
}

// HabitsWidget component
export function HabitsWidget({ onHabitsClick }: { onHabitsClick: () => void }) {
  return (
    <Widget title="Today's Habits" onClick={onHabitsClick} className="z-10">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">8/10</p>
        </div>
        <p className="text-big-percent-number">80%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{ width: '80%', transition: 'width 1s ease-in-out' }}
        />
      </div>
    </Widget>
  )
}

// TodosWidget component
export function TodosWidget({ onTodosClick }: { onTodosClick: () => void }) {
  return (
    <Widget title="Today's Todos" onClick={onTodosClick}>
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-description-card">Completed</p>
          <p className="text-xl font-bold">3/12</p>
        </div>
        <p className="text-big-percent-number">29%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"
          style={{ width: '29%', transition: 'width 1s ease-in-out' }}
        />
      </div>
    </Widget>
  )
}

// CheckinAIWidget component
export function CheckinAIWidget({ onCheckinAIClick }: { onCheckinAIClick: () => void }) {
  return (
    <Widget title="AI Check-in" onClick={() => {}} className="flex flex-col gap-2">
    <div className="flex flex-col items-center mt-2">
      <Bot className="w-8 h-8 text-orange-400 mb-2" />
      <span className="text-2xl font-bold">24/7</span>
      <span className="text-sm text-gray-400">Success coach guidance and support</span>
    </div>
  </Widget>
  )
}

// AnalyticsWidget component
export function AnalyticsWidget({ onAnalyticsClick }: { onAnalyticsClick: () => void }) {
  return (
    <Widget title="Analytics" onClick={() => {}} className="flex flex-col gap-2">
    <div className="flex flex-col items-center mt-2">
      <Activity className="w-8 h-8 text-orange-400 mb-2" />
      <div className="space-y-1">
        
      <div className="flex justify-between">
        <div className="text-description-card">Last 7 days</div>
        <div className="text-orange-main font-bold">80%</div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-gradient-orange rounded-full"></div>
      </div>
      <div className="flex justify-between">
        <div className="text-description-card">Last 30 days</div>
        <div className="text-gray-900 font-bold">48%</div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-1/2 bg-gray-900 rounded-full"></div>
      </div>
    </div>
    </div>
  </Widget>
  )
}

// LifeScoreWidget component
export function LifeScoreWidget({ onLifeScoreClick }: { onLifeScoreClick: () => void }) {
  return (
    <Widget title="Life Score" onClick={() => {}} className="flex flex-col gap-2">
    <div className="flex flex-col items-center mt-2">
      <LoaderPinwheel className="w-8 h-8 text-orange-400 mb-2" />
      <span className="text-2xl font-bold">Wheel</span>
      <span className="text-sm text-gray-400">Visualize progress across all life areas</span>
    </div>
  </Widget>
  )
}

// BadgesWidget component
export function BadgesWidget({ onBadgesClick }: { onBadgesClick: () => void }) {
  return (
    <Widget title="Badges" onClick={() => {}} className="flex flex-col gap-2">
    <div className="flex flex-col items-center mt-2">
      <Trophy className="w-8 h-8 text-orange-400 mb-2" />
      <span className="text-2xl font-bold">85 Total</span>
      <span className="text-sm text-gray-400">Earn rewards by hitting milestones</span>
    </div>
  </Widget>
  )
}

// AdsCarouselWidget component
export function AdsCarouselWidget() {
      // Mock ads data
  const ads = [
    { title: "Premium Membership", description: "Get 50% off annual subscription" },
    { title: "New Courses Available", description: "Learn meditation and mindfulness" },
    { title: "Join Challenge", description: "30 days to better habits" },
  ]
  // Previous state and refs remain unchanged
  const [adIndex, setAdIndex] = useState(0);
  return (
    <Widget
        title="Special Offers"
        rightIcon={
            <div className="flex gap-2">
            <button
                onClick={() => setAdIndex((prev) => (prev > 0 ? prev - 1 : ads.length - 1))}
                className="p-1 hover:bg-gray-100 rounded-full"
            >
                <ArrowLeft size={16} className="text-orange-400" />
            </button>
            <button
                onClick={() => setAdIndex((prev) => (prev < ads.length - 1 ? prev + 1 : 0))}
                className="p-1 hover:bg-gray-100 rounded-full"
            >
                <ArrowRight size={16} className="text-orange-400" />
            </button>
            </div>
        }
        >
        <div className="relative overflow-hidden mt-2">
            <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${adIndex * 100}%)` }}
            >
            {ads.map((ad, index) => (
                <div key={index} className="w-full flex-shrink-0">
                <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{ad.title}</h3>
                    <p className="text-sm text-gray-600">{ad.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </Widget>
  );
}

// ShopWidget component
export function ShopWidget() {
  return (
    <Widget title="Shop" onClick={() => {}} className="flex flex-col gap-2">
        <div className="flex flex-col items-center mt-2">
        <Store className="w-8 h-8 text-orange-400 mb-2" />
        <span className="text-2xl font-bold">98 Items</span>
        <span className="text-sm text-gray-400">Explore products and services all in one place</span>
        </div>
    </Widget>
  )
}

// CoursesWidget component
export function CoursesWidget() {
  return (
    <Widget title="Courses">
    <div className="grid grid-cols-3 gap-2 mt-2">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-orange-50 flex items-center justify-center"
        >
          <GraduationCap className="w-6 h-6 text-orange-400" />
        </div>
      ))}
    </div>
  </Widget>
  )
}

interface WidgetsContainerProps {
  onHabitsClick: () => void
  onTodosClick: () => void
  onCheckinAIClick: () => void
  onAnalyticsClick: () => void
  onLifeScoreClick: () => void
  onBadgesClick: () => void
}

// <div className="flex flex-col overflow-hidden w-full bg-white p-2 gap-2 rounded-t-xl">
export function WidgetsContainer({ onHabitsClick, onTodosClick, onCheckinAIClick, onAnalyticsClick, onLifeScoreClick, onBadgesClick }: WidgetsContainerProps) {
  return (
    <div className="flex flex-col shadow-md border-t bg-white rounded-t-2xl w-full gap-4 mt-4 p-4 overflow-auto"> 
      <UnderlayWidget />
      <HabitsWidget onHabitsClick={onHabitsClick} />
      <TodosWidget onTodosClick={onTodosClick} />
      <div className="grid grid-cols-2 gap-4">
        <div><CheckinAIWidget onCheckinAIClick={onCheckinAIClick} /></div>
        <div><AnalyticsWidget onAnalyticsClick={onAnalyticsClick} /></div>
        <div><LifeScoreWidget onLifeScoreClick={onLifeScoreClick} /></div>
        <div><BadgesWidget onBadgesClick={onBadgesClick} /></div>
      </div>
      <AdsCarouselWidget />
      <div className="grid grid-cols-2 gap-4">
        <div><ShopWidget /></div>
        <div><CoursesWidget /></div>
      </div>
    </div>
  )
}