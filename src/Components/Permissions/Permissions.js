import classes from './Permissions.module.scss'
import React from 'react'
import Checkbox from '../UI/Checkbox/Checkbox'
import { connect } from 'react-redux'
import {
  onChangeCheckbox,
  savePermissions,
  getPermissions,
} from '../../store/actions/edit'
import Button from '../UI/Button/Button'

// const cls = [classes.permsListItem, classes.permsListItemSub]

class Permissions extends React.Component {
  async componentDidMount() {
    await this.props.getPermissions()
    console.log(this.props.permissions)
  }
  render() {
    return (
      <form className={classes.mainSectionForm}>
        <div className={classes.mainSectionPerms}>
          <ul className={classes.permsList}>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Пункты / Пользователи</p>
            </li>
            {this.props.posts.map((post, index) => {
              return (
                <li className={classes.permsListItem} key={`post-${index}`}>
                  <p className={classes.permsListText}>{post}</p>
                </li>
              )
            })}

            {/* <li className={cls.join(' ')}>
              <p className={classes.permsListText}>Удаление</p>
            </li>
            <li className={cls.join(' ')}>
              <p className={classes.permsListText}>Редактирование</p>
            </li> */}
          </ul>
          {this.props.permissions.map((post, ind) => {
            return (
              <ul className={classes.catalogFormCheckboxes} key={`ul-${ind}`}>
                <li className={classes.checkboxesListItem}>
                  <p className={classes.checkboxesItemText}>{post.email}</p>
                </li>
                {post.perms.map((value, index) => {
                  return (
                    <li
                      className={classes.checkboxesListItem}
                      key={`check-${ind}-${index}`}
                    >
                      <Checkbox
                        type={'checkbox'}
                        name={`gridItemCheckbox-${ind}`}
                        value={post.email}
                        id={`$checkbox:${ind}-${index}`}
                        defaultChecked={value}
                        onChange={this.props.onChangeCheckbox}
                      />
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
        <Button
          type={'submit'}
          id={'NewPostButton'}
          classType2={'ButtonSubmit'}
          classType={'ButtonPrimary'}
          onClick={(event) => this.props.savePermissions(event)}
          disabled={this.props.isDisabledButtons}
        >
          Сохранить
        </Button>
      </form>
    )
  }
}

function mapStatePoProps(state) {
  return {
    posts: state.edit.posts,
    activePost: state.edit.activePost,
    activeSubPost: state.edit.activeSubPost,
    subPosts: state.edit.subPosts,
    isDisabledButtons: state.edit.isDisabledButtons,
    links: state.edit.links,
    permissions: state.edit.permissions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeCheckbox: (event) => dispatch(onChangeCheckbox(event)),
    savePermissions: (event) => dispatch(savePermissions(event)),
    getPermissions: () => dispatch(getPermissions()),
  }
}

export default connect(mapStatePoProps, mapDispatchToProps)(Permissions)
