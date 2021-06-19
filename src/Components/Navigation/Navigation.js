import React from 'react'
import Button from '../UI/Button/Button'
import classes from './Navigation.module.scss'

class Navigation extends React.Component {
  state = {
    posts: [
      'Номенклатура',
      'Пользователи',
      'Контракты',
      'Рецепция',
      'Номенклатура',
      'Пользователи',
      'Контракты',
      'Рецепция',
      'Номенклатура',
      'Пользователи',
      'Контракты',
    ],
    activePost: 0,
  }
  //получаем из id цифру для передачи в activePost
  onClickButton = (event) => {
    const indexOfDash = event.target.id.indexOf('-')
    const newActiveIndex = event.target.id.slice(
      indexOfDash + 1,
      event.target.id.length
    )
    this.setState({
      activePost: +newActiveIndex,
    })
  }
  render() {
    return (
      <nav className={classes.Navigation}>
        <ul className={classes.NavigationList}>
          {this.state.posts.map((post, index) => {
            return (
              <li key={`NavButton-${index}`}>
                <Button
                  id={`NavButton-${index}`}
                  classType={'ButtonImportant'}
                  classType2={'ButtonNavigation'}
                  classTypeActive={
                    index === this.state.activePost
                      ? 'ButtonNavigationActive'
                      : null
                  }
                  onClick={this.onClickButton}
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
