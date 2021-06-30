import React from 'react'
import axios from 'axios'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'
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
  }

  addTextHandle = (event) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts
    tempSubs[this.state.activeSubPost].data.type.push('text')
    tempSubs[this.state.activeSubPost].data.value.push('')
    console.log(tempSubs[this.state.activeSubPost].data)
    this.setState({
      subPosts: tempSubs,
    })
  }

  deleteSubElement = (event) => {
    event.preventDefault()
    let btnId = this.getIndexFromSome(event.target.id)
    let tempSubs = this.state.subPosts
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
    console.log(tempSubs)
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
  getIndexFromSome = (string) => {
    const indexOfDash = string.indexOf('-')
    const newIndex = string.slice(indexOfDash + 1, string.length)
    return newIndex
  }
  ChangeSubPost = async (event) => {
    event.preventDefault()
    let keyDB = this.state.keys[this.state.activePost]
    await this.putSubPosts(keyDB)
  }

  putSubPosts = async (key) => {
    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/subPosts.json`,
        this.state.subPosts
      )
      console.log(response.data)
      this.setState({
        subPosts: response.data,
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

  onSubmitPost = async (event) => {
    event.preventDefault()
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
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )

      this.setState({
        subPosts: response.data.subPosts,
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
  changePostHandle = (event) => {}
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
        <div className={classes.containerColumn}>
          <section className={classes.MainSection}>
            <header className={classes.MainSectionHeader}>
              <h2 className={classes.MainSectionHeaderTitle}>
                Создание нового поста
              </h2>
            </header>
            <form
              className={classes.MainSectionForm}
              onSubmit={this.onSubmitPost}
            >
              <h2 className={classes.MainSectionHeaderTitle}>
                Создание основного поста
              </h2>
              <div className={classes.ContainerPost}>
                <p className={classes.ContainerItem}>
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
                onChange={this.onChangeForm}
              >
                Создать
              </Button>
            </form>

            <form
              className={classes.MainSectionForm}
              onChange={this.onChangeForm}
            >
              <h2 className={classes.MainSectionHeaderTitle}>
                Редактирование поста
              </h2>
              <div className={classes.ContainerPost}>
                <p className={classes.ContainerItem}>
                  <label className={classes.InputLabel}>
                    Старое название:
                    <br />
                    <select
                      id={'selectUsers'}
                      name={'users'}
                      className={classes.SignInSelect}
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
                <p className={classes.ContainerItem}>
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
              <h2 className={classes.MainSectionHeaderTitle}>
                Создание Сабпоста
              </h2>
              <div className={classes.ContainerPost}>
                <p className={classes.ContainerItem}>
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
              >
                Создать
              </Button>
              <h2 className={classes.MainSectionHeaderTitle}>
                Редактирование Сабпоста
              </h2>
              <div className={classes.ContainerPost}>
                <p className={classes.ContainerItem}>
                  <label className={classes.InputLabel}>
                    Старое название:
                    <br />
                    <select
                      id={'selectSubPost'}
                      name={'users'}
                      className={classes.SignInSelect}
                      onChange={this.changeActiveSubPost}
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
                <p className={classes.ContainerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Новое название'}
                    name={'subPost'}
                    placeholder={'Введите название'}
                  />
                </p>
                {this.state.subPosts[this.state.activeSubPost].data.type.map(
                  (type, index) => {
                    let elem = this.state.subPosts[this.state.activeSubPost]
                    if (type === 'text') {
                      return (
                        <p
                          className={classes.ContainerItem}
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
                            className={classes.BtnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={this.deleteSubElement}
                          ></button>
                        </p>
                      )
                    } else if (elem.data.type[index] === 'img') {
                      return (
                        <div
                          className={classes.ContainerImg}
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
                          <button
                            className={classes.BtnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={this.deleteSubElement}
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
              >
                Добавить текст
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.addImgHandle}
              >
                Добавить картинку
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.ChangeSubPost}
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
