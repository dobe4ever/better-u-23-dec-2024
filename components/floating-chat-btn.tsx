// components/layout/floating-chat-btn.tsx
'use client'

import { Bot } from 'lucide-react'
import { ReactNode } from 'react'

interface FloatingChatBtnProps {
  title?: string
  children?: ReactNode
  onClick?: () => void
  BotIcon?: ReactNode
  className?: string
}

export function FloatingChatBtn({
  title = "Chatbot Page",
  children,
  onClick,
  BotIcon = <Bot size={42} className="bg-white text-orange-500 border rounded-full shadow-xl p-1 pb-2" />,
  className = '',
}: FloatingChatBtnProps) {
  return (
    <div
      className={`z-50 fixed bottom-4 right-4 ${
        onClick ? 'cursor-pointer' : ''
      } group ${className}`}
      onClick={onClick}
    >
      <div className="">
        {BotIcon}
      </div>
      {children}
    </div>
  )
}