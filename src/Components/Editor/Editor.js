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
    subPosts: [
      {
        name: 'subpost1',
        data: {
          type: ['text', 'img', 'text', 'text', 'img'],
          value: [
            'текстареа 1 ном удал',
            '1.png',
            'текстар ном удал 2',
            'текстареа 3 ном удал',
            '2.png',
          ],
        },
      },
    ],
    newPost: { postName: '', subPosts: [{}] },
    newSubPost: {
      name: '',
      data: {
        type: ['text'],
        value: [''],
      },
    },
  }
  putActivePost = async (event) => {
    event.preventDefault()
    console.log('value ' + event.target.value)
    console.log('1 ' + this.state.activePost)
    await this.setState({
      activePost: event.target.value,
    })
    console.log('2 ' + this.state.activePost)
    this.getSubPosts()
    console.log('3 ' + this.state.activePost)
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
      console.log('getsP ' + response.data.postName)
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
      arrSubPosts = res.data[key].subPosts
      this.setState({
        keys: keys,
        subPosts: arrSubPosts,
        posts: arrPosts,
      })
    })
  }
  createNewSubPost = async (event) => {
    event.preventDefault()
    let keyDB = this.state.keys[this.state.activePost]
    let newSubPosts = this.state.subPosts
    if (newSubPosts[0].name === '') {
      newSubPosts = []
    }
    newSubPosts.push(this.state.newSubPost)
    console.log(newSubPosts)
    this.setState({
      subPosts: newSubPosts,
      newSubPost: {
        name: '',
        data: {
          type: ['text'],
          value: [''],
        },
      },
    })
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
          value: [''],
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
                      onChange={(event) => {
                        this.ChangeSubPostsHandle(event.target.value)
                      }}
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
                {this.state.subPosts[0].data.type.forEach((key, index) => {
                  if (this.state.subPosts[0].data.type[index] === 'text') {
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
                          defaultValue={
                            this.state.subPosts[0].data.value[index]
                          }
                        ></Textarea>
                        <button
                          className={classes.BtnClose}
                          type="button"
                          title="close"
                        ></button>
                      </p>
                    )
                  } else if (
                    this.state.subPosts[0].data.type[index] === 'img'
                  ) {
                    return (
                      <div
                        className={classes.ContainerImg}
                        key={`img-${index}`}
                      >
                        <img
                          src={this.state.subPosts[0].data.value[index]}
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

              <button
                className="btn btn--submit btn--bottom"
                type={'submit'}
                onChange={this.props.onChangeForm}
              >
                Сохранить
              </button>
            </form>
            <button onClick={this.getSubPosts}>11</button>
          </section>
        </div>
      </>
    )
  }
}

export default Editor
