import { Logo } from '@/app/components/layout/Logo'
import { HeaderActions } from '@/app/components/layout/HeaderActions'
import { TopNavigation } from '@/app/components/layout/TopNavigation'
import { UserMenu } from '@/app/components/layout/UserMenu'
import {
  HEADER_UTILITY_BAR_CLASS,
  ROLE_BADGE_CLASS,
} from '@/app/components/layout/layout-tokens'
import { LOGGED_IN_ROLE } from '@/app/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className={HEADER_UTILITY_BAR_CLASS}>
        <div className="flex min-w-0 items-center gap-3 lg:gap-12">
          <Logo />

          <span className="text-[13px] leading-5 text-default-400">
            <span className="whitespace-nowrap">Logged In As: </span>
            <span className={ROLE_BADGE_CLASS}>{LOGGED_IN_ROLE}</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <HeaderActions />
          <UserMenu />
        </div>
      </div>

      <TopNavigation />
    </header>
  )
}
