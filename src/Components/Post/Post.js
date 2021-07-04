import classes from './Post.module.scss'
import React from 'react'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'

const Post = (props) => {
  let ImgButton = [classes.ImgButton, classes[props.ImgButtonClass]]
  let ImgClass = [classes.Img, classes[props.ImgClass]]
  const BCClassIndex = [classes.BreadCrumbsLink, classes.BreadCrumbsLinkIndex]
  const BCClassActive = [classes.BreadCrumbsLink, classes.BreadCrumbsLinkActive]
  return (
    <div className={classes.ContainerColumn}>
      <h1 className={classes.VisuallyHidden}>
        Главная страница Wiki Craft Ohana &#171;Ohana Fitness&#187;
      </h1>
      <section className={classes.MainSection}>
        <ul className={classes.BreadCrumbs}>
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
            <a href="/nomen" className={classes.BreadCrumbsLink}>
              {props.posts[props.activePost]}
            </a>
          </li>
          <li>
            <a href="/nomen" className={BCClassActive.join(' ')}>
              {props.subPosts[props.activeSubPost].name}
            </a>
          </li>
        </ul>
        <header className={classes.MainSectionHeader}>
          <h2 className={classes.MainSectionHeaderTitle}>
            {props.posts[props.activePost]}
          </h2>
        </header>
        <ul className={classes.PostList}>
          {props.subPosts.map((element, index) => {
            return (
              <li key={index}>
                <Button
                  classType={
                    props.activeSubPost === index
                      ? 'ButtonNavigationActive'
                      : 'ButtonImportant'
                  }
                  onClick={props.onClick}
                  id={`sub-${index}`}
                >
                  {props.subPosts[index].name}
                </Button>
              </li>
            )
          })}
        </ul>
        <div className={classes.MainSectionPost}>
          {Object.keys(props.subPosts[props.activeSubPost].data.type).map(
            (element, index) => {
              let typeData =
                props.subPosts[props.activeSubPost].data.type[element]
              let valueData =
                props.subPosts[props.activeSubPost].data.value[element]

              return typeData === 'text' ? (
                <p
                  className={classes.MainSectionText}
                  key={`${typeData}-${index}`}
                  id={`${typeData}-${index}`}
                >
                  {valueData}
                </p>
              ) : (
                <div className={classes.ImgWrapper} key={`ImgWrapper-${index}`}>
                  <button
                    className={
                      props.ImgId === index
                        ? ImgButton.join(' ')
                        : classes.ImgButton
                    }
                    onClick={props.onImgClick}
                  >
                    <img
                      id={`${typeData}-${index}`}
                      key={`${typeData}-${index}`}
                      src={valueData}
                      alt=""
                      width="273"
                      height="167"
                      className={
                        props.ImgId === index ? ImgClass.join(' ') : classes.Img
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
  return {}
}

function mapDispatchPoProps(dispatch) {
  return {}
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Post)
