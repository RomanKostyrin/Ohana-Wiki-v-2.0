import classes from './Permissions.module.scss'
import React from 'react'
import Checkbox from '../UI/Checkbox/Checkbox'
import { connect } from 'react-redux'
import { fetchSubPosts } from '../../store/actions/edit'

const cls = [classes.permsListItem, classes.permsListItemSub]

class Permissions extends React.Component {
  render() {
    return (
      <form className={classes.mainSectionForm}>
        <div className={classes.mainSectionPerms}>
          <ul className={classes.permsList}>
            <li className={classes.permsListItem}>
              <p className={classes.permsListText}>Пункты / Пользователи</p>
            </li>
            {this.props.posts.map((post, index) => {
              console.log(post)
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
            console.log(post)

            return (
              <ul className={classes.catalogFormCheckboxes} key={`ul-${ind}`}>
                <li className={classes.checkboxesListItem}>
                  <p className={classes.checkboxesItemText}>{post.email}</p>
                </li>
                {post.perms.map((post, index) => {
                  return (
                    <li
                      className={classes.checkboxesListItem}
                      key={`check-${ind}-${index}`}
                    >
                      <Checkbox
                        type={'checkbox'}
                        name={`gridItemCheckbox-${ind}-${index}`}
                        value={index}
                        id={`checkbox--${ind}-${index}`}
                        defaultChecked={post}
                      />
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
        <button
          className="btn btn--submit"
          onChange={this.props.changePermissions}
        >
          Сохранить
        </button>
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
    fetchSubPosts: (event, bool) => dispatch(fetchSubPosts(event, bool)),
  }
}

export default connect(mapStatePoProps, mapDispatchToProps)(Permissions)
