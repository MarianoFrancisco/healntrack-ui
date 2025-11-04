// src/components/common/SuccessAlert.tsx
import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

interface SuccessAlertProps {
  title: string
  description?: string
}

export function SuccessAlert({ title, description }: SuccessAlertProps) {
  return (
    <Alert className="border-green-500/50 text-green-800 dark:text-green-300">
      <CheckCircle2Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
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
