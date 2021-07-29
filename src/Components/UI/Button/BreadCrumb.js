import classes from './Button.module.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = (props) => {
  const cls = [classes[props.classType], classes[props.classType2]]
  if (props.disabledLink) {
    cls.push(classes.disabledLink)
  }
  return (
    <NavLink
      aria-label={props.ariaLabel}
      to={props.to}
      exact={props.exact}
      id={props.id}
      onClick={props.onClick}
      className={cls.join(' ')}
    >
      {props.children}
    </NavLink>
  )
}

export default Link
