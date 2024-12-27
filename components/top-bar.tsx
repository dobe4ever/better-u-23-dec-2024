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
              className={`absolute right-0 top-0 flex w-4 items-center justify-center rounded-full text-xs font-bold ${iconColor} ${bgColor} ${textColor}`}
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


// export function TopBar() {
//   return (
//     // horizontal bar main box
//     <div className="relative z-10">

//       {/* #1: wrapper to align the left & right wrappers: */}
//       <div className="flex items-center justify-between px-4 py-2 bg-transparent shadow-">

//         {/* #2: Left wrapper: */}
//         <div className="flex items-center space-x-4">
//             <HamburgerMenu />
//             <LogoWhite />
//         </div>

//         {/* #3: Right wrapper: */}
//         <div className="flex items-center space-x-4">
//             <NotificationsMenu />
//             <UserProfileMenu />
//         </div>

//       </div>

//     </div>
//   )
// }

export function TopBar() {
  return (
    <div className="relative pl-1 p-2 pr-2 z-10">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <LogoWhite />
        </div>
        <div className="flex items-center gap-3">
          <NotificationsMenu />
          <UserProfileMenu />
        </div>
      </div>
    </div>
  )
}