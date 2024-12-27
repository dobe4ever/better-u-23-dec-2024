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
    <div className="relative min-h-screen min-w-screen bg-bg-orange">
      <FloatingChatBtn onClick={() => openModal('chat')} />

      <div ref={headerRef} className="relative z-10">
        <Header />
        <div
          className="absolute top-0 w-full h-[650px] bg-white"
          style={{ opacity: fadePercentage / 100, zIndex: 20 }}
        />
      </div>

      <div className="sticky top-4 z-30">
        <div className="
          relative 
          overflow-hidden
          rounded-2xl 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          p-3 m-3 
          bg-white
          border
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