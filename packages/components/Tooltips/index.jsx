import React from 'react'
import TooltipContent from './TooltipContent'
import TooltipActivator from './TooltipActivator'
import { TooltipProvider } from './TooltipContext'

const TooltipRoot = React.forwardRef((props, ref) => {
  const { children, ...rest } = props
  return (
    <TooltipProvider ref={ref} {...rest}>
      {children}
    </TooltipProvider>
  )
})

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Activator: TooltipActivator
})
