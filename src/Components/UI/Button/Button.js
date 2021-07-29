import classes from './Button.module.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

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
  if (props.link === 'link') {
    return (
      <NavLink
        to={props.to}
        exact={props.exact}
        id={props.id}
        onClick={props.onClick}
        className={cls.join(' ')}
        activeClassName={classes.ButtonNavigationActive}
      >
        {props.children}
      </NavLink>
    )
  } else
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
