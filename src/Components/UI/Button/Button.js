import classes from './Button.module.scss'
import React from 'react'

const Button = (props) => {
  const cls = [
    classes.Button,
    classes[props.classType],
    classes[props.classType2],
    classes[props.classType3],
  ]
  if (props.disabledLink) {
    cls.push(classes.disabledLink)
  }
  return (
    <button
      disabled={props.disabled}
      id={props.id}
      onClick={props.onClick}
      className={cls.join(' ')}
    >
      {props.children}
    </button>
  )
}

export default Button
