import classes from './Post.module.scss'
import React from 'react'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'
import {
  onClickSubPost,
  onImgClick,
  getActivePost,
} from '../../store/actions/edit'
import { NavLink } from 'react-router-dom'

class Post extends React.Component {
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    let ImgButton = [classes.imgButton, classes[this.props.imgButtonClass]]
    let ImgClass = [classes.img, classes[this.props.imgClass]]
    const BCClassIndex = [classes.breadCrumbsLink, classes.breadCrumbsLinkIndex]
    const BCClassActive = [
      classes.breadCrumbsLink,
      classes.breadCrumbsLinkActive,
    ]
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
              <NavLink
                href="/nomen"
                className={classes.breadCrumbsLink}
                exact={false}
                to={`/posts/${this.props.activePost}`}
              >
                {this.props.posts[this.props.match.params.activePost]}
              </NavLink>
            </li>
            <li>
              <a href="/nomen" className={BCClassActive.join(' ')}>
                {this.props.subPosts[this.props.activeSubPost].name}
              </a>
            </li>
          </ul>
          <header className={classes.mainSectionHeader}>
            <h2 className={classes.mainSectionHeaderTitle}>
              {this.props.posts[this.props.activePost]}
            </h2>
          </header>
          <ul className={classes.postList}>
            {this.props.subPosts.map((element, index) => {
              return (
                <li key={index}>
                  <Button
                    classType={
                      this.props.activeSubPost === index
                        ? 'ButtonNavigationActive'
                        : 'ButtonImportant'
                    }
                    onClick={(event) =>
                      this.props.onClickSubPost(event.target.id)
                    }
                    id={`sub-${index}`}
                  >
                    {this.props.subPosts[index].name}
                  </Button>
                </li>
              )
            })}
          </ul>
          <div className={classes.mainSectionPost}>
            {Object.keys(
              this.props.subPosts[this.props.activeSubPost].data.type
            ).map((element, index) => {
              let typeData =
                this.props.subPosts[this.props.activeSubPost].data.type[element]
              let valueData =
                this.props.subPosts[this.props.activeSubPost].data.value[
                  element
                ]

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
                      this.props.imgId === index
                        ? ImgButton.join(' ')
                        : classes.imgButton
                    }
                    onClick={(event) => this.props.onImgClick(event)}
                  >
                    <img
                      id={`${typeData}-${index}`}
                      key={`${typeData}-${index}`}
                      src={valueData}
                      alt=""
                      width="273"
                      height="167"
                      className={
                        this.props.imgId === index
                          ? ImgClass.join(' ')
                          : classes.img
                      }
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    )
  }
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
    links: state.edit.links,
  }
}

function mapDispatchPoProps(dispatch) {
  return {
    onClickSubPost: (subId) => dispatch(onClickSubPost(subId)),
    onImgClick: (event) => dispatch(onImgClick(event)),
    getActivePost: (activePost) => dispatch(getActivePost(activePost)),
  }
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Post)
