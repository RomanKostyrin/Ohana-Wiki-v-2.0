import classes from './Post.module.scss'
import React from 'react'
import Link from '../UI/Button/Link'
import BreadCrumb from '../UI/Button/BreadCrumb'
import { connect } from 'react-redux'
import {
  onClickSubPost,
  onImgClick,
  getActivePost,
} from '../../store/actions/edit'

class Post extends React.Component {
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    return (
      <section className={classes.containerColumn}>
        <h1 className={classes.visuallyHidden}>
          Главная страница Wiki Craft Ohana &#171;Ohana Fitness&#187;
        </h1>
        <section className={classes.mainSection}>
          <ul className={classes.breadCrumbs}>
            <li>
              <BreadCrumb
                to={'/'}
                disabledLink={this.props.isDisabledButtons}
                classType={'breadCrumbsLink'}
                classType2={'breadCrumbsLinkIndex'}
                ariaLabel={'Ссылка на главную страницу'}
              >
                {' '}
              </BreadCrumb>
            </li>
            <li>
              <BreadCrumb
                disabledLink={this.props.isDisabledButtons}
                exact={false}
                to={`/${this.props.activePost}`}
                classType={'breadCrumbsLink'}
              >
                {this.props.posts[this.props.activePost]}
              </BreadCrumb>
            </li>
            <li>
              <BreadCrumb
                disabledLink={this.props.isDisabledButtons}
                to={'/nomen'}
                р
                classType={'breadCrumbsLink'}
                classType2={'breadCrumbsLinkActive'}
              >
                {this.props.subPosts[this.props.activeSubPost].name}
              </BreadCrumb>
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
                  <Link
                    disabledLink={this.props.isDisabledButtons}
                    classType={
                      this.props.activeSubPost === index
                        ? 'ButtonNavigationActive'
                        : 'ButtonImportant'
                    }
                    to={`/posts/${this.props.links[this.props.activePost]}/${
                      this.props.activeSubPost
                    }`}
                    onClick={(event) =>
                      this.props.onClickSubPost(event.target.id)
                    }
                    id={`sub-${index}`}
                  >
                    {this.props.subPosts[index].name}
                  </Link>
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
                        ? [
                            classes.imgButton,
                            classes[this.props.imgButtonClass],
                          ].join(' ')
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
                          ? [classes.img, classes[this.props.imgClass]].join(
                              ' '
                            )
                          : classes.img
                      }
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      </section>
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
    authenticator: state.auth.token,
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
