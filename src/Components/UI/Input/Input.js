import classes from './Input.module.scss'
import React from 'react'

const Input = (props) => {
  function showPassword(event) {
    event.preventDefault()
    ;('text')
  }

  const cls = [classes.Input__Label, classes[props.labelType]]
  return (
    <>
      <label className={cls.join(' ')}>
        {props.label}
        <br />
        <input
          type={props.type}
          className={cls.join(' ')}
          name={props.name || 'Логин'}
          placeholder={props.placeholder || 'Введите название'}
        />
        {props.type === 'password' ? (
          <span
            className={classes.InputPasswordSvg}
            onClick={showPassword}
          ></span>
        ) : null}
      </label>
    </>
  )
}

export default Input
