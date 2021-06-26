import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'
import Textarea from '../UI/Textarea/Textarea'
import axios from 'axios'

class Editor extends React.Component {
  state = {
    posts: ['post1', 'post2'],
    subPost: [
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
      {
        name: 'subpost2',
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
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )

      Object.keys(response.data).forEach((key, value) => {
        console.log(response.data[key].post)
      })
    } catch (e) {
      console.log(e)
    }
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
              onChange={this.onChangeForm}
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
                      onChange={(event) => {
                        this.props.ChangePostHandle(event.target.value)
                        this.changeSubPosts(event.target.value)
                      }}
                    >
                      {this.state.posts.map((post, index) => {
                        return (
                          <option value={index} key={`optpost-${index}`}>
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
                        this.ChangeSubPostHandle(event.target.value)
                      }}
                    >
                      {this.state.subPost.map((post, index) => {
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
                {this.state.subPost[0].data.type.map((key, index) => {
                  if (this.state.subPost[0].data.type[index] === 'text') {
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
                          defaultValue={this.state.subPost[0].data.value[index]}
                        ></Textarea>
                        <button
                          className={classes.BtnClose}
                          type="button"
                          title="close"
                        ></button>
                      </p>
                    )
                  } else if (this.state.subPost[0].data.type[index] === 'img') {
                    return (
                      <div
                        className={classes.ContainerImg}
                        key={`img-${index}`}
                      >
                        <img
                          src={this.state.subPost[0].data.value[index]}
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
            <button onClick={this.onChangeForm}>11</button>
          </section>
        </div>
      </>
    )
  }
}

export default Editor
