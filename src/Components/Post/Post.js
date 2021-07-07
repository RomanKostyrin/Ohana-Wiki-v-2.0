import classes from './Post.module.scss'
import React from 'react'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'
import { onClickSubPost, onImgClick } from '../../store/actions/edit'

const Post = (props) => {
  let ImgButton = [classes.imgButton, classes[props.imgButtonClass]]
  let ImgClass = [classes.img, classes[props.imgClass]]
  const BCClassIndex = [classes.breadCrumbsLink, classes.breadCrumbsLinkIndex]
  const BCClassActive = [classes.breadCrumbsLink, classes.breadCrumbsLinkActive]
  return (
    <div className={classes.containerColumn}>
      <h1 className={classes.visuallyHidden}>
        Главная страница Wiki Craft Ohana &#171;Ohana Fitness&#187;
      </h1>
      <section className={classes.mainSection}>
        <ul className={classes.breadCrumbs}>
          <li>
            <a
              href="/"
              className={BCClassIndex.join(' ')}
              aria-label="Ссылка на главную страницу"
            >
              {' '}
            </a>
          </li>
          <li>
            <a href="/nomen" className={classes.breadCrumbsLink}>
              {props.posts[props.activePost]}
            </a>
          </li>
          <li>
            <a href="/nomen" className={BCClassActive.join(' ')}>
              {props.subPosts[props.activeSubPost].name}
            </a>
          </li>
        </ul>
        <header className={classes.mainSectionHeader}>
          <h2 className={classes.mainSectionHeaderTitle}>
            {props.posts[props.activePost]}
          </h2>
        </header>
        <ul className={classes.postList}>
          {props.subPosts.map((element, index) => {
            return (
              <li key={index}>
                <Button
                  classType={
                    props.activeSubPost === index
                      ? 'ButtonNavigationActive'
                      : 'ButtonImportant'
                  }
                  onClick={(event) => props.onClickSubPost(event.target.id)}
                  id={`sub-${index}`}
                >
                  {props.subPosts[index].name}
                </Button>
              </li>
            )
          })}
        </ul>
        <div className={classes.mainSectionPost}>
          {Object.keys(props.subPosts[props.activeSubPost].data.type).map(
            (element, index) => {
              let typeData =
                props.subPosts[props.activeSubPost].data.type[element]
              let valueData =
                props.subPosts[props.activeSubPost].data.value[element]

              return typeData === 'text' ? (
                <p
                  className={classes.mainSectionText}
                  key={`${typeData}-${index}`}
                  id={`${typeData}-${index}`}
                >
                  {valueData}
                </p>
              ) : (
                <div className={classes.imgWrapper} key={`imgWrapper-${index}`}>
                  <button
                    className={
                      props.imgId === index
                        ? ImgButton.join(' ')
                        : classes.imgButton
                    }
                    onClick={(event) => props.onImgClick(event)}
                  >
                    <img
                      id={`${typeData}-${index}`}
                      key={`${typeData}-${index}`}
                      src={valueData}
                      alt=""
                      width="273"
                      height="167"
                      className={
                        props.imgId === index ? ImgClass.join(' ') : classes.img
                      }
                    />
                  </button>
                </div>
              )
            }
          )}
        </div>
      </section>
    </div>
  )
}

function mapStatePoProps(state) {
  return {
    activePost: state.edit.activePost,
    posts: state.edit.posts,
    imgId: state.edit.imgId,
    imgClass: state.edit.imgClass,
    imgButtonClass: state.edit.imgButtonClass,
    activeSubPost: state.edit.activeSubPost,
    subPosts: state.edit.subPosts,
  }
}

function mapDispatchPoProps(dispatch) {
  return {
    onClickSubPost: (subId) => dispatch(onClickSubPost(subId)),
    onImgClick: (event) => dispatch(onImgClick(event)),
  }
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Post)
