import classes from './Button.module.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = (props) => {
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
}

export default Link
