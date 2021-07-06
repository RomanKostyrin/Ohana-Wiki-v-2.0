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
              onSubmit={(event) => this.props.onSubmitP(event)}
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
                    onChange={(event) =>
                      this.props.changePostName(event.target.value)
                    }
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
                      onChange={(event) => this.props.fetchSubPosts(event)}
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
                    onChange={(event) =>
                      this.props.newPostNameFunction(event.target.value)
                    }
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
                    onChange={(event) =>
                      this.props.changeSPHandle(event.target.value)
                    }
                    value={this.props.newSubPost.name}
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={(event) => this.props.createNewSub(event)}
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
                      onChange={(event) =>
                        this.props.changeActiveSub(event.target.value)
                      }
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
                    onChange={(event) => this.props.changeSubPost(event)}
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
                            onChange={(event) => this.props.onChangeText(event)}
                          ></Textarea>
                          <button
                            className={classes.btnClose}
                            id={`closeBtn-${index}`}
                            type="button"
                            title="close"
                            onClick={(event) => this.props.deleteSubEl(event)}
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
                              onChange={(event) => this.props.pathImg(event)}
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
                onClick={(event) => this.props.addHandle(event, 'text')}
                disabled={this.props.isDisabledButtons}
              >
                Добавить текст
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={(event) => this.props.addHandle(event, 'img')}
                disabled={this.props.isDisabledButtons}
              >
                Добавить картинку
              </Button>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onClick={(event) => this.props.putSP(event)}
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
    fetchSubPosts: (event) => dispatch(fetchSubPosts(event)),
    changeSubPost: (event) => dispatch(changeSubPost(event)),
    changeActiveSub: (value) => dispatch(changeActiveSub(value)),
    addHandle: (event, type) => dispatch(addHandle(event, type)),
    deleteSubEl: (event) => dispatch(deleteSubEl(event)),
    onChangeText: (event) => dispatch(onChangeText(event)),
    pathImg: (event) => dispatch(pathImg(event)),
    newPostNameFunction: (value) => dispatch(newPostNameFunction(value)),
    putSP: (event) => dispatch(putSP(event)),
    onSubmitP: (event) => dispatch(onSubmitP(event)),
    changePostName: (value) => dispatch(changePostName(value)),
    createNewSub: (event) => dispatch(createNewSub(event)),
    changeSPHandle: (value) => dispatch(changeSPHandle(value)),
  }
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Editor)
