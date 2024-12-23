// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { StickyTopWidget } from '../components/sticky-top-widget';
import { WidgetsContainer } from '../components/widgets';
import { Header } from '../components/header';
import { Modal } from '../components/ui/modal';
import { HabitsPage } from '../components/habits-page';
import { TodosPage } from '../components/todos-page';
import { ChatbotPage } from '../components/chatbot-page';

export default function Component() {
    const openModal = (modalName: string) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
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
    <div className="bg-white min-h-screen w-full">

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
            <Header/>
          </div>
          {/* fade effect closing div */}
        </div>

      </div>

      {/* STICKY TOP WIDGET: */}
      <div className="sticky top-0 bg-white w-full py-2 flex flex-row justify-between overflow-hidden bg-white z-20">
        <StickyTopWidget />
      </div>

      <div className="relative z-20">
        <WidgetsContainer
          onHabitsClick={() => openModal('habits')}
          onTodosClick={() => openModal('todos')}
        />
      </div>

      {activeModal && (
        <Modal onClose={closeModal}>
          {activeModal === 'habits' && <HabitsPage />}
          {activeModal === 'todos' && <TodosPage />}
          {activeModal === 'chat' && <ChatbotPage />}
        </Modal>
      )}
    </div>
  )
}
