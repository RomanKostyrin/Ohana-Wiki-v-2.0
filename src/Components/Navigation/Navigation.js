import React from 'react'
import Link from '../UI/Button/Link'
import classes from './Navigation.module.scss'
import { connect } from 'react-redux'
import {
  fetchPosts,
  fetchSubPosts,
  setActivePost,
} from '../../store/actions/edit'

class Navigation extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    return (
      <nav className={classes.Navigation}>
        <ul className={classes.NavigationList}>
          {this.props.posts.map((post, index) => {
            if (this.props.permissions[index] && this.props.email) {
              if (
                this.props.permissions[index].post.includes(this.props.email) &&
                this.props.token
              ) {
                return (
                  <li key={`NavButton-${index}`}>
                    <Link
                      disabledLink={this.props.isDisabledButtons}
                      to={`/posts/${this.props.links[index]}/${this.props.activeSubPost}`}
                      exact={false}
                      id={`NavButton-${index}`}
                      classType={'ButtonImportant'}
                      classType2={'ButtonNavigation'}
                      onClick={(event) => this.props.fetchSubPosts(event, true)}
                    >
                      {post}
                    </Link>
                  </li>
                )
              }
            }
          })}
          {this.props.email.includes('ss@ss.ru') && this.props.token ? (
            <>
              <li>
                <Link
                  disabledLink={this.props.isDisabledButtons}
                  to={`/editor`}
                  exact={false}
                  id={`NavButton-10`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                >
                  {'Edit'}
                </Link>
              </li>
              <li>
                <Link
                  disabledLink={this.props.isDisabledButtons}
                  to={`/users`}
                  exact={false}
                  id={`NavButton-20`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                >
                  {'Users'}
                </Link>
              </li>
              <li>
                <Link
                  disabledLink={this.props.isDisabledButtons}
                  to={`/perms`}
                  exact={false}
                  id={`NavButton-30`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                >
                  {'Permissions'}
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
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
    email: state.auth.email,
    permissions: state.edit.permissions,
    token: state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchSubPosts: (event, bool) => dispatch(fetchSubPosts(event, bool)),
    setActivePost: (id) => dispatch(setActivePost(id)),
  }
}
export default connect(mapStatePoProps, mapDispatchToProps)(Navigation)
