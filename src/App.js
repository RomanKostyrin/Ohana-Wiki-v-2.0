import React from 'react'
import Main from './Components/Main/Main'
import classes from './App.module.scss'
import Navigation from './Components/Navigation/Navigation'
import axios from 'axios'

class App extends React.Component {
  state = {
    posts: ['Номенклатура', 'Пользователи', 'Контракты', 'Рецепция'],
    activePost: 10,
    activeSubPost: 0,
    0: [
      {
        name: 'Удаление Ном',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem441',
            2: '1.png',
            3: 'Lorem443',
            4: 'Lorem4',
            5: '2.png',
          },
        },
      },
      {
        name: 'Редактирование',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
    ],
    1: [
      {
        name: 'Удаление ред',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
            6: 'img',
            7: 'text',
          },
          value: {
            1: 'Loremred1',
            2: '1.png',
            3: 'Loremred2',
            4: 'Loremred3',
            5: '2.png',
            6: '1.png',
            7: 'hello jenya',
          },
        },
      },
      {
        name: 'Редактирование',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
    ],
    2: [
      {
        name: 'Удаление контр',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Редактирование',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
    ],
    3: [
      {
        name: 'Удаление контр',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '2.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '1.png',
          },
        },
      },
      {
        name: 'Редактирование',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '2.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Создание',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
      {
        name: 'Корректировка',
        data: {
          type: {
            1: 'text',
            2: 'img',
            3: 'text',
            4: 'text',
            5: 'img',
          },
          value: {
            1: 'Lorem',
            2: '1.png',
            3: 'Lorem',
            4: 'Lorem',
            5: '2.png',
          },
        },
      },
    ],
  }

  onClickSubPost = (event) => {
    axios
      .get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .then(function (response) {
        console.log(response.data)
      })
    const subId = this.getIndexFromSome(event.target.id)
    this.setState({
      activeSubPost: +subId,
    })
  }
  getIndexFromSome = (string) => {
    const indexOfDash = string.indexOf('-')
    const newIndex = string.slice(indexOfDash + 1, string.length)
    return newIndex
  }
  //получаем из id цифру для передачи в activePost
  onClickButton = (event) => {
    const newActiveIndex = this.getIndexFromSome(event.target.id)
    this.setState({
      activePost: +newActiveIndex,
      activeSubPost: 0,
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
          onClick={this.onClickSubPost}
        />
      </>
    )
  }
}

export default App
