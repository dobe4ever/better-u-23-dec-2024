```css

/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Hide scrollbars everywhere by default */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}


/* Default styles for mobile-first approach */
.header, .bottom-nav {
  height: 56px;
  padding: 0 16px;
}

.icon {
  font-size: 24px;
}

.text {
  font-size: 14px;
}

/* Media query for tablets and larger screens */
@media (min-width: 600px) {
  .header, .bottom-nav {
    height: 64px;
    padding: 0 24px;
  }

  .icon {
    font-size: 28px;
  }

  .text {
    font-size: 16px;
  }
}

/* Media query for larger screens */
@media (min-width: 1024px) {
  .header, .bottom-nav {
    height: 72px;
    padding: 0 32px;
  }

  .icon {
    font-size: 32px;
  }

  .text {
    font-size: 18px;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
```

```tsx
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const nunito = Nunito({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Better You App',
  description: 'An app to help you become a better version of yourself',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} ${nunito.className}`}>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { StickyTopWidget } from '../components/sticky-top-widget';
import { WidgetsContainer } from '../components/widgets';
import { Header } from '../components/header';
import { Modal } from '../components/ui/modal';
import { HabitsPage } from '../components/habits-page';
import { TodosPage } from '../components/todos-page';
import { CheckinAIPage } from '../components/checkin-ai-page';
import { AnalyticsPage } from '../components/analytics-page';
import { LifeScorePage } from '../components/life-score-page';
import { BadgesPage } from '../components/badges-page';
import { ChatbotPage } from '../components/chatbot-page';
import { FloatingChatBtn } from '../components/floating-chat-btn';

export default function HomePage() {
  const [fadePercentage, setFadePercentage] = useState(0)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY
        const headerHeight = headerRef.current.offsetHeight
        const newFadePercentage = Math.max(0, Math.min(100, (scrollPosition / headerHeight) * 100))
        setFadePercentage(newFadePercentage)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (modalName: string) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingChatBtn onClick={() => openModal('chat')} />

      <div ref={headerRef} className="relative z-10">
        <Header />
        <div
          className="absolute top-0 bottom-0 w-full h-[450px] bg-white pointer-events-none"
          style={{ opacity: fadePercentage / 100, zIndex: 20 }}
        />
      </div>

      <div className="sticky top-4 z-30">
        <div className="
          relative 
          overflow-hidden 
          m-4
          p-4
          bg-white 
          rounded-2xl 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          before:absolute
        ">
          <StickyTopWidget />
        </div>
      </div>

      <div className="relative z-20">
        <WidgetsContainer
          onHabitsClick={() => openModal('habits')}
          onTodosClick={() => openModal('todos')}
          onCheckinAIClick={() => openModal('checkin')}
          onAnalyticsClick={() => openModal('analytics')}
          onLifeScoreClick={() => openModal('lifescore')}
          onBadgesClick={() => openModal('badges')}
        />
      </div>

      {activeModal && (
        <Modal onClose={closeModal}>
          {activeModal === 'habits' && <HabitsPage />}
          {activeModal === 'todos' && <TodosPage />}
          {activeModal === 'checkin' && <CheckinAIPage />}
          {activeModal === 'analytics' && <AnalyticsPage />}
          {activeModal === 'lifescore' && <LifeScorePage />}
          {activeModal === 'badges' && <BadgesPage />}
          {activeModal === 'chatbot' && <ChatbotPage />}
        </Modal>
      )}
    </div>
  )
}
```

```tsx
// components/header.tsx
'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion' // Added AnimatePresence for smoother transitions
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TopBar } from '../components/top-bar'

// 🎨 Background Components
export function WestpacBG() {
  // Pro tip: Use fill instead of width/height for full coverage
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        alt="bg"
        src="/assets/backgrounds/westpac-bg.svg"
        fill
        priority
        className="object-cover" // Ensures proper scaling
        sizes="100vw" // Helps browser with image optimization
      />
    </div>
  )
}

// 🌅 Enhanced Diagonal Background with subtle animation
export function DiagonalLinesBG() {
  return (
    <div className="relative -top-10 left-0 right-0 bottom-">
      <div className="">
        <div className="absolute -top-10 left-0 h-[35vh] w-1/2 bg-orange-400 origin-top-left transform -skew-y-12"></div>
        <div className="absolute -top-10 right-0 h-[35vh] w-1/2 bg-orange-400 origin-top-right transform skew-y-12"></div>
      </div>
    </div>
  )
}

// 👤 Enhanced Avatar
export function UserAvatar() {
  const username = 'Brotastic'
  const avatarUrl = 'https://i.pravatar.cc/300'

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        w-full flex justify-center
        absolute w-[100%] 
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div className="relative aspect-[1/1] pb-[75%]">
        <div className="
          absolute inset-0 
          flex flex-col items-center justify-center
          group
        ">
          <Avatar className="
            h-full w-full 
            border-4 border-white/20 
            shadow-[0_8px_32px_rgba(251,146,60,0.2)]
            transition-transform duration-300
          ">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-orange-100 text-orange-700">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.div>
  )
}

// 📅 Enhanced CurrentDay with better animation
export function CurrentDay() {
  return (
    <div className="z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.5, 
          duration: 0.7,
          type: "spring",
          stiffness: 100 
        }}
        className="
          relative -bottom-26 
          text-center
          before:absolute
          before:inset-0
          before:bg-gradient-to-r
          before:from-transparent
          before:via-orange-500/10
          before:to-transparent
          before:blur-xl
        "
      >
        <h1 className="
          tracking-tighter font-black text-3xl
          bg-clip-text text-transparent
          bg-gradient-to-r from-orange-600 to-orange-500
          drop-shadow-sm
        ">
          FRIDAY DECEMBER 6, 2024
        </h1>
      </motion.div>
    </div>
  )
}

// 🎯 Main Header Component
export function Header() {
  return (
    <>
      
      <TopBar />
      <div className="flex relative w-full pb-[0%] border-4 border-green-500 items-center justify-center">
        <div className="flex items-center justify-center w-full border-4 border-blue-500 aspect-[1/1]">
          <DiagonalLinesBG />
          <UserAvatar />
          <CurrentDay />
        </div>
      </div>
    </>
  )
}
```

```tsx
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
    <div className="w-full flex flex-col gap-4">
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
```

```tsx
// components/top-bar.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel
  } from '@/components/ui/dropdown-menu'
import { Settings, LogOut, UserPen, Menu, Bell } from 'lucide-react'
import { LogoWhite } from './logo'


export function HamburgerMenu() {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-white">
            <Menu strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
          <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}


// notfctions menu
interface NotificationBtnProps {
  color?: 'white' | 'orange'
}

export function NotificationsMenu({ color = 'white' }: NotificationBtnProps) {
  const [notificationCount, setNotificationCount] = useState(3)

  const iconColor = color === 'white' ? 'text-orange-main' : 'text-white'
  const bgColor = color === 'white' ? 'bg-white' : 'bg-orange-main'
  const textColor = color === 'white' ? 'text-orange-main' : 'text-white'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell strokeWidth={2} color={color}/>
          {notificationCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute right-0 top-0 flex size-4 items-center justify-center rounded-full text-xs font-bold ${iconColor} ${bgColor} ${textColor}`}
            >
              {notificationCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setNotificationCount(prev => Math.max(0, prev - 1))}>
          Mark as read
        </DropdownMenuItem>
        <DropdownMenuItem>View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-white pr-">
            <img
                src="https://i.pravatar.cc/300"
                className="overflow-hidden border-2 border-white/75 shadow-lg rounded-full"
            />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuItem className="text-sm text-gray-500 p-2">email@gmail.com</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row">
        <div className="flex justify-between items-center" >
            <img
                src="https://i.pravatar.cc/300"
                className="overflow-hidden border-2 border-orange-300/50 shadow-lg rounded-full mr-2 h-10 w-10"
            />
          <span className="flex flex-col gap-0 ml-">
            <h1>username</h1>
            <p className="text-gray-500">Free plan</p>
          </span>
        </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
        <DropdownMenuItem><UserPen className="mr-2 h-4 w-4" /> Edit Profile</DropdownMenuItem>
        <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export function TopBar() {
  return (
    // horizontal bar main box
    <div className="relative z-10">

      {/* #1: wrapper to align the left & right wrappers: */}
      <div className="flex items-center justify-between px-4 py-2 bg-transparent shadow-">

        {/* #2: Left wrapper: */}
        <div className="flex items-center space-x-4">
            <HamburgerMenu />
            <LogoWhite />
        </div>

        {/* #3: Right wrapper: */}
        <div className="flex items-center space-x-4">
            <NotificationsMenu />
            <UserProfileMenu />
        </div>

      </div>

    </div>
  )
}
```

```tsx
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
        <p className="font-bold text-4xl">80%</p>
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
        <p className="font-bold text-4xl">29%</p>
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
```

```svg
<!-- public/assets/backgrounds/westpac-bg.svg -->

<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="h-full w-full" preserveAspectRatio="none">
    <path d="M0 0 H400 V800 H0 Z" fill="#f97316" />
    <path d="M250 0 L400 0 L400 300 Z" fill="#404040" />
    <path d="M0 750 L400 75 L400 800 Z" fill="#fb9a47" />
</svg>
```

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "components/common/two-column-widget.tsx", "components/layout/header-container/top-bar.tsx.back"],
  "exclude": ["node_modules"]
}

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
