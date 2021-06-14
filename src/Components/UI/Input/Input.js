import classes from './Input.module.scss'
import React from 'react'

const Input = (props) => {
  return (
    <label className={classes.Input__label}>
      {props.label}
      <br />
      <input
        type={props.type}
        className={classes.Input}
        name={props.name || 'Логин'}
        placeholder={props.placeholder || 'Введите название'}
      />
    </label>
  )
}

export default Input
