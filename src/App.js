import React from 'react'
import Main from './Components/Main/Main'
import classes from './App.module.scss'
import Navigation from './Components/Navigation/Navigation'

class App extends React.Component {
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
    ],
    activePost: 0,
    activeSubPost: 0,
    0: [
      {
        name: 'Удаление Ном',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Редактирование',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
    ],
    1: [
      {
        name: 'Удаление Пользователи',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Редактирование',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
    ],
    2: [
      {
        name: 'Удаление Контракты',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Редактирование',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        text: {
          p: {
            1: 'Lorem',
            3: 'Lorem',
            4: 'Lorem',
          },
          img: {
            2: '1.png',
            5: '2.png',
          },
        },
      },
    ],
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
      <>
        <Navigation
          posts={this.state.posts}
          activePost={this.state.activePost}
          onClick={this.onClickButton}
        />
        <Main
          className={classes.Main}
          activePost={this.state.activePost}
          activeSubPost={this.state.activeSubPost}
          posts={this.state.posts}
          subPosts={this.state[this.state.activePost]}
        />
      </>
    )
  }
}

export default App
