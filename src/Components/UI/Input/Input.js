import classes from './Input.module.scss'
import React from 'react'

const Input = (props) => {
  function showPassword(event) {
    event.preventDefault()
    event.target.previousElementSibling.type === 'text'
      ? (event.target.previousElementSibling.type = 'password')
      : (event.target.previousElementSibling.type = 'text')
  }
  return props.type === 'search' ? (
    <form className={classes.Search}>
      <input
        type={props.type}
        placeholder={props.placeholder || 'Поиск:'}
        id={props.id}
        className={classes[props.inputTypeClass]}
      />
      <label
        htmlFor="search"
        className={classes[props.labelTypeClass]}
        aria-label="Поиск по сайту:"
      ></label>
    </form>
  ) : (
    <label className={classes[props.labelTypeClass]}>
      {props.label}
      <br />
      <input
        type={props.type}
        className={classes[props.inputTypeClass]}
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
  )
}

export default Input
