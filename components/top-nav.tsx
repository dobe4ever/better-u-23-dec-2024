import { LogoOrange } from './logo'
import { UserProfileMenu, NotificationsMenu } from './top-bar'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface ChevronLeftBtnProps {
  onClick: () => void;
}

export function ChevronLeftBtn({ onClick }: ChevronLeftBtnProps) {
  return (
    <div className="[&_svg]:size-6">
      <Button variant="ghost" size="icon" className="text-orange-main pt-5" onClick={onClick}>
        <ChevronLeft />
      </Button>
    </div>
  )
}

export function TopNav() {
  return (
    <div className="fixed top-2 right-2 left-12 z-10">

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <LogoOrange />
        </div>
        <div className="text-orange-main flex justify-between items-center gap-4">
          <NotificationsMenu color="orange" />
          <UserProfileMenu />
        </div>
      </div>

    </div>
  )
}