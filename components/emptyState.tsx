import { ReactNode } from "react"
import { Inbox } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon ?? <Inbox className="h-8 w-8" />}
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}

      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}