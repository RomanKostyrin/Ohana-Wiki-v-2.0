import React from 'react'
import axios from 'axios'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'

class Editor extends React.Component {
  state = {}
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
            <form className={classes.MainSectionForm}>
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
                onChange={this.props.onChangeForm}
              >
                Создать
              </Button>
            </form>
            <form
              className={classes.MainSectionForm}
              onChange={this.props.onChangeForm}
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
                    >
                      {this.props.posts.map((post, index) => {
                        return <option value={index}>{post}</option>
                      })}
                    </select>
                  </label>
                </p>
                <p className="container--item container--item__svg">
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Название поста'}
                    name={'users'}
                    placeholder="Введите название"
                  />

                  <label className="signIn__lable">
                    Новое название:
                    <br />
                    <input
                      type="text"
                      className="signIn__input"
                      name="login"
                      value="12345"
                    />
                  </label>
                </p>
              </div>
              <h2 className="mainSection__header--title mainSection__header--Post">
                Редактирование Сабпоста
              </h2>
              <div className="container container__Post">
                <p className="container--item">
                  <label className="signIn__lable">
                    Старое название:
                    <br />
                    <select
                      id="selectUsers"
                      name="users"
                      className="signIn__input"
                    >
                      <option value="admin">Удаление</option>
                      <option value="trener">Редактирование</option>
                    </select>
                  </label>
                </p>
                <p className="container--item container--item__svg">
                  <label className="signIn__lable">
                    Новое название:
                    <br />
                    <input
                      type="text"
                      className="signIn__input"
                      name="login"
                      value="12345"
                    />
                  </label>
                </p>
                <p className="signIn__paragraph">
                  <label className="signIn__lable">
                    Текст:
                    <br />
                    <textarea
                      className="signIn__input signIn__input--textarea"
                      name="comment"
                      rows="5"
                      cols="120"
                      placeholder="Текст"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora delectus iste, nemo officiis nesciunt ducimus
                      consectetur perspiciatis explicabo sint! Debitis magni
                      ratione doloribus odio facere sapiente sunt suscipit sequi
                      sed.
                    </textarea>
                  </label>
                  <button
                    className="btnClose btnClose--delete"
                    type="button"
                    title="close"
                  ></button>
                </p>
                <div className="containerImg">
                  <img
                    src="img/1.png"
                    alt=""
                    className="mainSection__img"
                    width="273px"
                    height="167px"
                  />
                  <button
                    className="btnClose btnClose--delete"
                    type="button"
                    title="close"
                  ></button>
                </div>
                <p className="signIn__paragraph">
                  <label className="signIn__lable">
                    Текст:
                    <br />
                    <textarea
                      className="signIn__input signIn__input--textarea"
                      name="comment"
                      rows="5"
                      cols="120"
                      placeholder="Текст"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora delectus iste, nemo officiis nesciunt ducimus
                      consectetur perspiciatis explicabo sint! Debitis magni
                      ratione doloribus odio facere sapiente sunt suscipit sequi
                      sed.
                    </textarea>
                  </label>
                  <button
                    className="btnClose btnClose--delete"
                    type="button"
                    title="close"
                  ></button>
                </p>
                <div className="containerImg">
                  <img
                    src="img/1.png"
                    alt=""
                    className="mainSection__img"
                    width="273px"
                    height="167px"
                  />
                  <button
                    className="btnClose btnClose--delete"
                    type="button"
                    title="close"
                  ></button>
                </div>
              </div>

              <button
                className="btn btn--submit btn--bottom"
                type={'submit'}
                onChange={this.props.onChangeForm}
              >
                Сохранить
              </button>
            </form>
            <form
              className={classes.MainSectionForm}
              onChange={this.props.onChangeForm}
            >
              <h2 className="mainSection__header--title mainSection__header--Post">
                Создание Сабпоста
              </h2>
              <div className="container container__Post">
                <p className="container--item">
                  <label className="signIn__lable">
                    Выберите пост:
                    <br />
                    <select
                      id="selectUsers"
                      name="users"
                      className="signIn__input"
                    >
                      <option value="admin">Номенклатура</option>
                      <option value="trener">Контракты</option>
                      <option value="mop">Пользователи</option>
                      <option value="rop">Чеки</option>
                    </select>
                  </label>
                </p>
              </div>
              <h2 className="mainSection__header--title mainSection__header--Post">
                Введите текст Сабпоста
              </h2>
              <div className="container container__Post">
                <p className="container--item container--item__svg">
                  <label className="signIn__lable">
                    Название:
                    <br />
                    <input
                      type="text"
                      className="signIn__input"
                      name="login"
                      value="12345"
                    />
                  </label>
                </p>
                <p className="signIn__paragraph">
                  <label className="signIn__lable">
                    Текст:
                    <br />
                    <textarea
                      className="signIn__input signIn__input--textarea"
                      name="comment"
                      rows="5"
                      cols="120"
                      placeholder="Текст"
                    ></textarea>
                  </label>
                  <button
                    className="btnClose btnClose--delete"
                    type="button"
                    title="close"
                  ></button>
                </p>
              </div>
              <button className="btn btn--submit btn--img">
                Добавить картинку
              </button>
              <button className="btn btn--submit btn--text">
                Добавить текст
              </button>
              <button className="btn btn--submit btn--bottom">Сохранить</button>
            </form>
          </section>
        </div>
      </>
    )
  }
}

export default Editor
