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
  render() {
    console.log(this.props.permissions)

    return (
      <form className={classes.mainSectionForm}>
        <div className={classes.mainSectionPerms}>
          <ul className={classes.permsList}>
            <li className={classes.permsListItem} key={`post---1`}>
              <p className={classes.permsListText}>Пункты / Пользователи</p>
            </li>
            {this.props.permissions.map((user, index) => {
              return (
                <React.Fragment key={`fragm-${index}`}>
                  <li className={classes.permsListItem} key={`post-${index}`}>
                    <p className={classes.permsListText}>
                      {user.perms[index].post}
                    </p>
                  </li>
                  {user.perms[index].subPosts.map((sub, i) => {
                    return (
                      <li
                        className={cls.join(' ')}
                        key={`sub-${index}-${i}-${sub}`}
                      >
                        <p className={classes.permsListText}>{sub}</p>
                      </li>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </ul>
          {this.props.permissions.map((user, ind) => {
            return (
              <ul className={classes.catalogFormCheckboxes} key={`ul-${ind}`}>
                <li
                  className={classes.checkboxesListItem}
                  key={`first-${ind}-`}
                >
                  <p className={classes.checkboxesItemText}>{user.email}</p>
                </li>
                {user.perms.map((post, index) => {
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
                          checked={post.permPost}
                          onChange={(event) =>
                            this.props.onChangeCheckbox(event)
                          }
                        />
                      </li>
                      {user.perms.map((item, j) => {
                        return (
                          <li
                            className={classes.checkboxesListItem}
                            key={`checksubs-${ind}-${j}`}
                          >
                            <Checkbox
                              type={'checkbox'}
                              name={`subPosts-${ind}`}
                              value={j}
                              id={`$checkbox:${ind}-${index}-${j}`}
                              checked={item}
                              onChange={(event) =>
                                this.props.onChangeCheckbox(event)
                              }
                            />
                          </li>
                        )
                      })}
                    </React.Fragment>
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
