import React from 'react'
import { Icon, TextField, IconButton } from 'actify'

export default () => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <TextField label="Email" suffixText="@actifyjs.com">
          <TextField.Slot name="leadingIcon">
            <Icon name="mail" />
          </TextField.Slot>
        </TextField>

        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
        >
          <TextField.Slot name="leadingIcon">
            <Icon name="lock" />
          </TextField.Slot>

          <TextField.Slot name="trailingIcon">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              <Icon name="eye" />
            </IconButton>
          </TextField.Slot>
        </TextField>
      </div>
    </>
  )
}
