import classes from './Checkbox.module.scss'
import React from 'react'

const Checkbox = (props) => {
  const cls = [classes.visuallyHidden, classes.checkbox]
  return (
    <>
      <input
        id={props.id}
        type={props.type}
        className={cls.join(' ')}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        defaultChecked={props.defaultChecked}
      />
      <label className={classes.checkboxLabel} htmlFor={props.id}></label>
    </>
  )
}

export default Checkbox
