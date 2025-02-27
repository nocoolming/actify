import React, {
  forwardRef,
  Children,
  isValidElement,
  cloneElement
} from 'react'
import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

const variants = tv({
  base: 'flex',
  variants: {
    variant: {
      elevated: 'divide-x divide-surface',
      filled: 'divide-x divide-surface',
      tonal: 'divide-x divide-surface',
      outlined: '',
      text: 'divide-x divide-surface'
    },
    roundedRightNone: {
      true: 'rounded-r-none'
    },
    borderRightZero: {
      true: 'border-r-0'
    },
    roundedLeftNone: {
      true: 'rounded-l-none'
    }
  },
  defaultVariants: {
    variant: 'filled'
  }
})

const SegmentedButton = forwardRef((props, ref) => {
  const { variant, color, ripple, style, className, children, ...rest } = props

  return (
    <div ref={ref} {...rest} style={style} className={variants({ variant })}>
      {Children.map(
        children,
        (child, index) =>
          isValidElement(child) &&
          cloneElement(child, {
            variant,
            color,
            ripple,
            className: variants({
              roundedRightNone: index !== Children.count(children) - 1,
              borderRightZero: index !== Children.count(children) - 1,
              roundedLeftNone: index !== 0,
              className: child.props.className
            })
          })
      )}
    </div>
  )
})

SegmentedButton.propTypes = {
  ripple: PropTypes.bool,
  variant: PropTypes.oneOf(['elevated', 'filled', 'tonal', 'outlined', 'text'])
}

SegmentedButton.defaultProps = {
  ripple: true
}

SegmentedButton.displayName = 'Actify.SegmentedButton'

export { SegmentedButton }
