import { cn } from '@/lib/utils'

export function DashboardShell({
  children,
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className='w-full flex flex-col h-full p-4 gap-4 md:p-10'>
      <header className='flex flex-col w-full gap-0.5 min-h-16'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight inline-flex text-brand-2'>
            {title}
          </h1>
        </div>

        {subtitle && <p className='text-muted-foreground'>{subtitle}</p>}
      </header>

      <section className={cn('flex-1', className)}>{children}</section>
    </div>
  )
}
