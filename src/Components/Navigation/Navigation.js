import React from 'react'
import Button from '../UI/Button/Button'
import classes from './Navigation.module.scss'

class Navigation extends React.Component {
  render() {
    return (
      <nav className={classes.Navigation}>
        <ul className={classes.NavigationList}>
          {this.props.posts.map((post, index) => {
            return (
              <li key={`NavButton-${index}`}>
                <Button
                  id={`NavButton-${index}`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                  classTypeActive={
                    index === this.props.activePost
                      ? 'ButtonNavigationActive'
                      : null
                  }
                  onClick={this.props.onClick}
                >
                  {post}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default Navigation