import classes from './Button.module.scss'
import React from 'react'

const Button = (props) => {
  const cls = [
    classes.Button,
    classes[props.classType],
    classes[props.classType2],
  ]
  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
