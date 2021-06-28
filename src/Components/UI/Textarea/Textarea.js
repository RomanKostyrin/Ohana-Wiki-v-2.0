import classes from './Textarea.module.scss'
import React from 'react'

const Textarea = (props) => {
  return (
    <label className={classes[props.LabelClass]}>
      {props.labelName}
      <br />
      <textarea
        className={classes.Textarea}
        name={props.name}
        rows={props.rows}
        cols={props.cols}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        id={props.id}
      ></textarea>
    </label>
  )
}

export default Textarea
