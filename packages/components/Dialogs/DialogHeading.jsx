import React, { forwardRef, useId, useLayoutEffect } from 'react'
import { tv } from 'tailwind-variants'
import { useDialogContext } from './DialogContext'

const variants = tv({
  base: 'w-full flex items-center justify-between text-xl font-semibold leading-snug'
})

const DialogHeading = forwardRef((props, ref) => {
  const { className, children, ...rest } = props
  const { setLabelId } = useDialogContext()
  const id = useId()

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id)
    return () => setLabelId(undefined)
  }, [id, setLabelId])

  return (
    <div id={id} {...rest} ref={ref} className={variants({ className })}>
      {children}
    </div>
  )
})

export { DialogHeading }
