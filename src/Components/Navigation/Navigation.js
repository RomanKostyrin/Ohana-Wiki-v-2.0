import React from 'react'
import Button from '../UI/Button/Button'
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
            return (
              <li key={`NavButton-${index}`}>
                <Button
                  link={'link'}
                  to={`/posts/${index}`}
                  exact={false}
                  id={`NavButton-${index}`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                  classTypeActive={
                    index === this.props.activePost
                      ? 'ButtonNavigationActive'
                      : null
                  }
                  onClick={(event) => this.props.fetchSubPosts(event, true)}
                >
                  {post}
                </Button>
              </li>
            )
          })}
          <li key={'edit'}>
            <Button
              link={'link'}
              to={`/editor`}
              exact={false}
              id={`NavButton-10`}
              classType={'ButtonImportant'}
              classType2={'ButtonNavigation'}
              classTypeActive={
                this.props.activePost === 10 ? 'ButtonNavigationActive' : null
              }
              onClick={(event) => this.props.setActivePost(event.target.id)}
            >
              {'Edit'}
            </Button>
          </li>
          <li key={'users'}>
            <Button
              link={'link'}
              to={`/users`}
              exact={false}
              id={`NavButton-20`}
              classType={'ButtonImportant'}
              classType2={'ButtonNavigation'}
              classTypeActive={
                this.props.activePost === 20 ? 'ButtonNavigationActive' : null
              }
              onClick={(event) => this.props.setActivePost(event.target.id)}
            >
              {'Users'}
            </Button>
          </li>
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
