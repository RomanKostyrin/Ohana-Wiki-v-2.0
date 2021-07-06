import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'
import Loader from '../UI/Loader/Loader'
import Textarea from '../UI/Textarea/Textarea'
import { connect } from 'react-redux'
import {
  fetchPosts,
  fetchSubPosts,
  changeSubPost,
  isDisabledButtonsFunction,
  changeActiveSub,
  addHandle,
  deleteSubEl,
  onChangeText,
  pathImg,
  newPostNameFunction,
  putSP,
  onSubmitP,
  changePostName,
  createNewSub,
  changeSPHandle,
} from '../../store/actions/edit'

class Editor extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  getIndexFromSome = (string) => {
    const indexOfDash = string.indexOf('-')
    const newIndex = string.slice(indexOfDash + 1, string.length)
    return newIndex
  }
  putActivePost = (event) => {
    event.preventDefault()
    this.props.fetchSubPosts(this.props, event.target.value)
  }
  ChangeSubPostName = (event) => {
    event.preventDefault()
    this.props.changeSubPost(this.props, event)
  }
  disableButtons = (bool) => {
    this.props.isDisabledButtonsFunction(bool)
  }
  changeActiveSubPost = (event) => {
    this.props.changeActiveSub(event.target.value)
  }
  addHandle = (event, type) => {
    event.preventDefault()
    this.props.addHandle(this.props, type)
  }
  deleteSubElement = (event) => {
    event.preventDefault()
    this.props.deleteSubEl(this.props, event.target.id)
  }
  onChangeTextArea = (event) => {
    console.log(event.target.value)
    this.props.onChangeText(this.props, event)
  }
  pathImgHandle = (event) => {
    event.preventDefault()
    this.props.pathImg(this.props, event)
  }
  newPostNameHandle = (event) => {
    this.props.newPostNameFunction(event.target.value)
  }
  ChangeSubPost = (event) => {
    event.preventDefault()
    this.props.putSP(this.props)
  }
  onSubmitPost = async (event) => {
    event.preventDefault()
    this.props.onSubmitP(this.props)
  }
  onChangePostName = (event) => {
    this.props.changePostName(event.target.value)
  }
  createNewSubPost = async (event) => {
    event.preventDefault()
    this.props.createNewSub(this.props)
  }
  changeSubPostsHandle = (event) => {
    this.props.changeSPHandle(event.target.value)
  }

  render() {
    return (
      <>
        <div className={classes.СontainerColumn}>
          {this.props.isDisabledButtons ? <Loader /> : null}
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
                    value={this.props.newPost.postName}
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.onChangeForm}
                disabled={this.props.isDisabledButtons}
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
                      disabled={this.props.isDisabledButtons}
                      id={'selectPosts'}
                      name={'users'}
                      className={classes.signInSelect}
                      onChange={this.putActivePost}
                    >
                      {this.props.posts.map((post, index) => {
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
                    value={this.props.newPostName}
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
                    value={this.props.newSubPost.name}
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.createNewSubPost}
                disabled={this.props.isDisabledButtons}
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
                      disabled={this.props.isDisabledButtons}
                    >
                      {this.props.subPosts.map((post, index) => {
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

                {this.props.subPosts[this.props.activeSubPost].data.type.map(
                  (type, index) => {
                    let elem = this.props.subPosts[this.props.activeSubPost]
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
                            value={elem.data.value[index]}
                            id={`textarea-${index}`}
                            onChange={this.onChangeTextArea}
                          ></Textarea>
                          <button
                            className={classes.btnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={this.deleteSubElement}
                            disabled={this.props.isDisabledButtons}
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
                            disabled={this.props.isDisabledButtons}
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
                onClick={(event) => this.addHandle(event, 'text')}
                disabled={this.props.isDisabledButtons}
              >
                Добавить текст
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={(event) => this.addHandle(event, 'img')}
                disabled={this.props.isDisabledButtons}
              >
                Добавить картинку
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={this.ChangeSubPost}
                disabled={this.props.isDisabledButtons}
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

function mapStatePoProps(state) {
  return {
    posts: state.edit.posts,
    keys: state.edit.keys,
    activePost: state.edit.activePost,
    activeSubPost: state.edit.activeSubPost,
    subPosts: state.edit.subPosts,
    newPostName: state.edit.newPostName,
    newPost: state.edit.newPost,
    newSubPost: state.edit.newSubPost,
    isDisabledButtons: state.edit.isDisabledButtons,
  }
}

function mapDispatchPoProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchSubPosts: (props, id) => dispatch(fetchSubPosts(props, id)),
    changeSubPost: (props, event) => dispatch(changeSubPost(props, event)),
    isDisabledButtonsFunction: (bool) =>
      dispatch(isDisabledButtonsFunction(bool)),
    changeActiveSub: (value) => dispatch(changeActiveSub(value)),
    addHandle: (props, type) => dispatch(addHandle(props, type)),
    deleteSubEl: (props, id) => dispatch(deleteSubEl(props, id)),
    onChangeText: (props, event) => dispatch(onChangeText(props, event)),
    pathImg: (props, event) => dispatch(pathImg(props, event)),
    newPostNameFunction: (value) => dispatch(newPostNameFunction(value)),
    putSP: (props) => dispatch(putSP(props)),
    onSubmitP: (props) => dispatch(onSubmitP(props)),
    changePostName: (value) => dispatch(changePostName(value)),
    createNewSub: (props) => dispatch(createNewSub(props)),
    changeSPHandle: (value) => dispatch(changeSPHandle(value)),
  }
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Editor)
