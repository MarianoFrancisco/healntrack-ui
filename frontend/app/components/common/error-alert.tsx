// src/components/common/ErrorAlert.tsx
import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

interface ErrorAlertProps {
  title: string
  description?: string
}

export function ErrorAlert({ title, description }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="border-red-500/50 text-red-800 dark:text-red-300">
      <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
      <div>
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        {description && (
          <AlertDescription className="text-sm mt-1">
            {description}
          </AlertDescription>
        )}
      </div>
    </Alert>
  )
}
