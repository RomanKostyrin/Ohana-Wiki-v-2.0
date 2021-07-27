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
const cls = [classes.permsListItem, classes.permsListItemSub]

class Permissions extends React.Component {
  componentDidMount() {
    this.props.getPermissions()
  }

  savePermissionsFunction(event) {
    event.preventDefault()
    this.props.savePermissions()
  }

  render() {
    return (
      <form className={classes.mainSectionForm}>
        <div className={classes.mainSectionPerms}>
          <ul className={classes.permsList}>
            <li className={classes.permsListItem} key={`post---1`}>
              <p className={classes.permsListText}>Пункты / Пользователи</p>
            </li>
            {Object.keys(this.props.fullPostsWithPerms).map((key, index) => {
              const post = this.props.fullPostsWithPerms[key]
              return (
                <React.Fragment key={`fragm-${index}`}>
                  <li className={classes.permsListItem} key={`post-${index}`}>
                    <p className={classes.permsListText}>{post.name}</p>
                  </li>
                  {post.subPosts.map((sub, i) => {
                    return (
                      <li
                        className={cls.join(' ')}
                        key={`sub-${index}-${i}-${sub}`}
                      >
                        <p className={classes.permsListText}>{sub.name}</p>
                      </li>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </ul>
          {this.props.userList.map((user, ind) => {
            return (
              <ul className={classes.catalogFormCheckboxes} key={`ul-${ind}`}>
                <li
                  className={classes.checkboxesListItem}
                  key={`first-${ind}-`}
                >
                  <p className={classes.checkboxesItemText}>{user}</p>
                </li>
                {Object.keys(this.props.fullPostsWithPerms).map(
                  (key, index) => {
                    const permsArray =
                      this.props.fullPostsWithPerms[key].permissions
                    return (
                      <React.Fragment key={`fragm2-${index}`}>
                        <li
                          className={classes.checkboxesListItem}
                          key={`check-${ind}-${index}`}
                        >
                          <Checkbox
                            type={'checkbox'}
                            name={`post-${ind}`}
                            value={index}
                            id={`$checkbox:${ind}-${index}`}
                            checked={permsArray.includes(user)}
                            onChange={(event) =>
                              this.props.onChangeCheckbox(event)
                            }
                          />
                        </li>
                        {this.props.fullPostsWithPerms[key].subPosts.map(
                          (item, j) => {
                            return (
                              <li
                                className={classes.checkboxesListItem}
                                key={`checksubs-${ind}-${j}`}
                              >
                                <Checkbox
                                  type={'checkbox'}
                                  name={`subPosts-${ind}`}
                                  value={index}
                                  id={`$checkbox${ind}${index}-${j}`}
                                  checked={item.permissions.includes(user)}
                                  onChange={(event) =>
                                    this.props.onChangeCheckbox(event)
                                  }
                                />
                              </li>
                            )
                          }
                        )}
                      </React.Fragment>
                    )
                  }
                )}
              </ul>
            )
          })}
        </div>
        <Button
          type={'submit'}
          id={'NewPostButton'}
          classType2={'ButtonSubmit'}
          classType={'ButtonPrimary'}
          onClick={(event) => this.savePermissionsFunction(event)}
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
    fullPostsWithPerms: state.edit.fullPostsWithPerms,
    keys: state.edit.keys,
    userList: state.edit.userList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeCheckbox: (event) => dispatch(onChangeCheckbox(event)),
    savePermissions: () => dispatch(savePermissions()),
    getPermissions: () => dispatch(getPermissions()),
  }
}

export default connect(mapStatePoProps, mapDispatchToProps)(Permissions)
