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
          <ul className={classes.catalogFormCheckboxes}>
            <li className={classes.checkboxesListItem}>
              <p className={classes.checkboxesItemText}>Admin</p>
            </li>
            {this.props.posts.map((post, index) => {
              return (
                <li
                  className={classes.checkboxesListItem}
                  key={`check-${index}`}
                >
                  <Checkbox
                    type={'checkbox'}
                    name={`gridItemCheckbox${index}`}
                    value={index}
                    id={`checkbox-${index}`}
                    defaultChecked={true}
                  />
                </li>
              )
            })}
          </ul>
          <ul className={classes.catalogFormCheckboxes}>
            <li className={classes.checkboxesListItem}>
              <p className={classes.checkboxesItemText}>Trener</p>
            </li>
            {this.props.posts.map((post, index) => {
              return (
                <li
                  className={classes.checkboxesListItem}
                  key={`check-${index + 100}`}
                >
                  <Checkbox
                    type={'checkbox'}
                    name={`gridItemCheckbox${index + 100}`}
                    value={index + 100}
                    id={`checkbox-${index + 100}`}
                    defaultChecked={true}
                  />
                </li>
              )
            })}
          </ul>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSubPosts: (event, bool) => dispatch(fetchSubPosts(event, bool)),
  }
}

export default connect(mapStatePoProps, mapDispatchToProps)(Permissions)
