import { NavigationItem } from '@/app/components/layout/NavigationItem'
import {
  SHELL_CONTAINER_CLASS,
  TOP_NAV_BAR_CLASS,
  TOP_NAV_LIST_CLASS,
} from '@/app/components/layout/layout-tokens'
import { PRIMARY_NAVIGATION } from '@/app/constants'

export function TopNavigation() {
  return (
    <div className={TOP_NAV_BAR_CLASS}>
      <div className={SHELL_CONTAINER_CLASS}>
        <nav aria-label="Primary">
          <ul className={TOP_NAV_LIST_CLASS}>
            {PRIMARY_NAVIGATION.map((item) => (
              <NavigationItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
