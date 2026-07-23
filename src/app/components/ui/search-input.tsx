import { Search } from 'lucide-react'

import { Input } from '@/app/components/ui/input'
import { cn } from '@/app/utils'

type SearchInputProps = React.ComponentProps<typeof Input> & {
  containerClassName?: string
}

export function SearchInput({
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className={cn('ps-9', className)} type="search" {...props} />
    </div>
  )
}
