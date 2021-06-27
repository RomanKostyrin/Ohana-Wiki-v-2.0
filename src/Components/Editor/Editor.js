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
          value: ['1'],
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
  newPostNameHandle = (event) => {
    this.setState({
      newPostName: event.target.value,
    })
  }
  ChangeSubPostName = async (event) => {
    let keyDB = this.state.keys[this.state.activePost]
    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}/subPosts.json`,
        this.state.subPosts
      )
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  putActivePost = async (event) => {
    event.preventDefault()
    await this.setState({
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
    try {
      console.log('try')
      console.log(this.state.subPosts)
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}/subPosts.json`,
        this.state.subPosts
      )
      console.log(response)
    } catch (e) {
      console.log(e)
    }
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
                      onChange={this.ChangeSubPostName}
                    >
                      {this.state.subPosts.map((post, index) => {
                        return (
                          <option value={post.name} key={`opt-${index}`}>
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
                {this.state.subPosts[
                  this.state.activeSubPost
                ].data.type.forEach((type, index) => {
                  let elem = this.state.subPosts[this.state.activeSubPost]

                  if (elem.data.type[index] === 'text') {
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
                        ></Textarea>
                        <button
                          className={classes.BtnClose}
                          type="button"
                          title="close"
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
                        />
                        <button
                          className={classes.BtnClose}
                          type="button"
                          title="close"
                        ></button>
                      </div>
                    )
                  }
                })}
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.props.onChangeForm}
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
