import React from 'react'
import axios from 'axios'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'
import Loader from '../UI/Loader/Loader'
import Textarea from '../UI/Textarea/Textarea'

class Editor extends React.Component {
  state = {
    posts: ['', ''],
    keys: [],
    activePost: 0,
    activeSubPost: 0,
    subPosts: [
      {
        name: 'subpost1',
        data: {
          type: ['text'],
          value: [''],
        },
      },
    ],
    newPostName: '',
    newPost: { postName: '', subPosts: [{}] },
    newSubPost: {
      name: '',
      data: {
        type: ['text'],
        value: [' '],
      },
    },
    isDisabledButtons: true,
  }

  ChangeSubPostName = (event) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts
    tempSubs[this.state.activeSubPost].name = event.target.value
    this.setState({
      subPosts: tempSubs,
    })
  }

  addTextHandle = (event) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts
    tempSubs[this.state.activeSubPost].data.type.push('text')
    tempSubs[this.state.activeSubPost].data.value.push('')
    this.setState({
      subPosts: tempSubs,
    })
  }

  deleteSubElement = (event) => {
    event.preventDefault()
    let btnId = this.getIndexFromSome(event.target.id)

    let tempSubs = this.state.subPosts
    if (tempSubs[this.state.activeSubPost].data.value.length === 1) {
      return alert('Нельзя удалять единственный')
    }
    console.log(tempSubs[this.state.activeSubPost].data.value[btnId])
    tempSubs[this.state.activeSubPost].data.type.splice(btnId, 1)
    tempSubs[this.state.activeSubPost].data.value.splice(btnId, 1)
    this.setState({
      subPosts: tempSubs,
    })
  }

  addImgHandle = (event) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts
    tempSubs[this.state.activeSubPost].data.type.push('img')
    tempSubs[this.state.activeSubPost].data.value.push('')
    this.setState({
      subPosts: tempSubs,
    })
  }
  pathImgHandle = (event) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts

    let pathId = this.getIndexFromSome(event.target.id)
    tempSubs[this.state.activeSubPost].data.value[pathId] = event.target.value
    this.setState({
      subPosts: tempSubs,
    })
  }
  newPostNameHandle = (event) => {
    this.setState({
      newPostName: event.target.value,
    })
  }
  changeActiveSubPost = (event) => {
    this.setState({
      activeSubPost: event.target.value,
    })
  }

  onChangeTextArea = (event) => {
    const indexOfTextArea = this.getIndexFromSome(event.target.id)
    const tempSub = this.state.subPosts
    tempSub[this.state.activeSubPost].data.value[indexOfTextArea] =
      event.target.value
    this.setState({
      subPosts: tempSub,
    })
  }
  ChangeSubPost = async (event) => {
    event.preventDefault()
    let keyDB = this.state.keys[this.state.activePost]
    await this.putSubPosts(keyDB)
  }

  putSubPosts = async (key) => {
    this.disableButtons(true)
    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/subPosts.json`,
        this.state.subPosts
      )
      console.log(response.data)
      this.setState({
        subPosts: response.data,
        isDisabledButtons: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  putActivePost = async (event) => {
    event.preventDefault()
    await this.setState({
      activeSubPost: 0,
      activePost: event.target.value,
    })
    this.getSubPosts()
  }
  disableButtons = (bool) => {
    this.setState({
      isDisabledButtons: bool,
    })
  }
  onSubmitPost = async (event) => {
    event.preventDefault()
    this.disableButtons(true)
    try {
      const response = await axios.post(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        this.state.newPost
      )
      console.log(response)
      let arr = this.state.posts
      arr.push(this.state.newPost.postName)

      this.setState({
        posts: arr,
        newPost: { postName: '', subPosts: [{}] },
        isDisabledButtons: false,
      })
    } catch (e) {
      console.log(e)
    }
  }
  getIndexFromSome = (string) => {
    const indexOfDash = string.indexOf('-')
    const newIndex = string.slice(indexOfDash + 1, string.length)
    return newIndex
  }
  getSubPosts = async () => {
    let keyDB = this.state.keys[this.state.activePost]
    this.disableButtons(true)
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )

      this.setState({
        subPosts: response.data.subPosts,
        isDisabledButtons: false,
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  renderPosts = (res) => {
    let arrPosts = []
    let arrSubPosts = []
    let keys = []
    Object.keys(res.data).forEach((key) => {
      keys.push(key)
      arrPosts.push(res.data[key].postName)
    })
    arrSubPosts = res.data[keys[this.state.activeSubPost]].subPosts
    this.setState({
      keys: keys,
      subPosts: arrSubPosts,
      posts: arrPosts,
      isDisabledButtons: false,
    })
  }
  createNewSubPost = async (event) => {
    event.preventDefault()
    let keyDB = this.state.keys[this.state.activePost]
    let newSubPosts = this.state.subPosts
    console.log('newSubPosts')
    console.log(newSubPosts)
    if (newSubPosts[0].name === '') {
      console.log('newsubpost-0')
      newSubPosts = []
    }
    newSubPosts.push(this.state.newSubPost)
    console.log(newSubPosts)
    await this.setState({
      subPosts: newSubPosts,
      newSubPost: {
        name: '',
        data: {
          type: ['text'],
          value: [' '],
        },
      },
    })
    this.putSubPosts(keyDB)
  }
  onChangePostName = (event) => {
    this.setState({
      newPost: {
        postName: event.target.value,
        subPosts: [
          {
            name: '',
            data: {
              type: ['text'],
              value: [''],
            },
          },
        ],
      },
    })
  }
  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      this.renderPosts(response)
    } catch (e) {
      console.log(e)
    }
  }
  changeSubPostsHandle = (event) => {
    this.setState({
      newSubPost: {
        name: event.target.value,
        data: {
          type: ['text'],
          value: [' '],
        },
      },
    })
  }
  render() {
    return (
      <>
        <div className={classes.СontainerColumn}>
          {this.state.isDisabledButtons ? <Loader /> : null}
          <section className={classes.mainSection}>
            <header className={classes.mainSectionHeader}>
              <h2 className={classes.mainSectionHeaderTitle}>
                Создание нового поста
              </h2>
            </header>
            <form
              className={classes.mainSectionForm}
              onSubmit={this.onSubmitPost}
            >
              <h2 className={classes.mainSectionHeaderTitle}>
                Создание основного поста
              </h2>
              <div className={classes.containerPost}>
                <p className={classes.containerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Название поста'}
                    name={'login'}
                    placeholder="Введите название"
                    onChange={this.onChangePostName}
                    value={this.state.newPost.postName}
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.onChangeForm}
                disabled={this.state.isDisabledButtons}
              >
                Создать
              </Button>
            </form>
            <form
              className={classes.mainSectionForm}
              onChange={this.onChangeForm}
            >
              <h2 className={classes.mainSectionHeaderTitle}>
                Редактирование поста
              </h2>

              <div className={classes.containerPost}>
                <p className={classes.containerItem}>
                  <label className={classes.inputLabel}>
                    Старое название:
                    <br />
                    <select
                      disabled={this.state.isDisabledButtons}
                      id={'selectPosts'}
                      name={'users'}
                      className={classes.signInSelect}
                      onChange={this.putActivePost}
                    >
                      {this.state.posts.map((post, index) => {
                        return (
                          <option
                            value={index}
                            key={`optpost-${index}`}
                            id={`optpost-${index}`}
                          >
                            {post}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </p>
                <p className={classes.containerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Новое название'}
                    name={'post'}
                    placeholder="Введите название"
                    value={this.state.newPostName}
                    onChange={this.newPostNameHandle}
                  />
                </p>
              </div>
              <h2 className={classes.mainSectionHeaderTitle}>
                Создание Сабпоста
              </h2>
              <div className={classes.containerPost}>
                <p className={classes.containerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Название Сабпоста'}
                    name={'login'}
                    placeholder="Введите название"
                    onChange={this.changeSubPostsHandle}
                    value={this.state.newSubPost.name}
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.createNewSubPost}
                disabled={this.state.isDisabledButtons}
              >
                Создать
              </Button>
              <h2 className={classes.mainSectionHeaderTitle}>
                Редактирование Сабпоста
              </h2>
              <div className={classes.containerPost}>
                <p className={classes.containerItem}>
                  <label className={classes.inputLabel}>
                    Старое название:
                    <br />
                    <select
                      id={'selectSubPosts'}
                      name={'users'}
                      className={classes.signInSelect}
                      onChange={this.changeActiveSubPost}
                      disabled={this.state.isDisabledButtons}
                    >
                      {this.state.subPosts.map((post, index) => {
                        return (
                          <option
                            value={index}
                            key={`opt-${index}`}
                            id={`opt-${index}`}
                          >
                            {post.name}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </p>
                <p className={classes.containerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Новое название'}
                    name={'subPost'}
                    placeholder={'Введите название'}
                    onChange={this.ChangeSubPostName}
                  />
                </p>

                {this.state.subPosts[this.state.activeSubPost].data.type.map(
                  (type, index) => {
                    let elem = this.state.subPosts[this.state.activeSubPost]
                    if (type === 'text') {
                      return (
                        <p
                          className={classes.containerItem}
                          key={`text-${index}`}
                        >
                          <Textarea
                            LabelClass={'TextareaLabel'}
                            labelName={'Введите текст'}
                            rows={10}
                            cols={120}
                            placeholder={'Введите текст'}
                            defaultValue={elem.data.value[index]}
                            id={`textarea-${index}`}
                            onChange={this.onChangeTextArea}
                          ></Textarea>
                          <button
                            className={classes.btnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={this.deleteSubElement}
                            disabled={this.state.isDisabledButtons}
                          ></button>
                        </p>
                      )
                    } else if (elem.data.type[index] === 'img') {
                      return (
                        <div
                          className={classes.containerImg}
                          key={`img-${index}`}
                        >
                          <img
                            src={elem.data.value[index]}
                            alt=""
                            className="mainSection__img"
                            width="273px"
                            height="167px"
                            id={`img-${index}`}
                          />
                          <p className={classes.containerItem}>
                            <Input
                              type={'text'}
                              inputTypeClass={'Input'}
                              labelTypeClass={'InputLabel'}
                              label={''}
                              name={'post'}
                              placeholder="Введите название"
                              value={elem.data.value[index]}
                              id={`path-${index}`}
                              onChange={this.pathImgHandle}
                            />
                          </p>
                          <button
                            className={classes.btnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={this.deleteSubElement}
                            disabled={this.state.isDisabledButtons}
                          ></button>
                        </div>
                      )
                    }
                  }
                )}
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.addTextHandle}
                disabled={this.state.isDisabledButtons}
              >
                Добавить текст
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.addImgHandle}
                disabled={this.state.isDisabledButtons}
              >
                Добавить картинку
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.ChangeSubPost}
                disabled={this.state.isDisabledButtons}
              >
                Сохранить
              </Button>
            </form>
          </section>
        </div>
      </>
    )
  }
}

export default Editor
