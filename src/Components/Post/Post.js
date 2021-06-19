import classes from './Post.module.scss'
import React from 'react'
import Button from '../UI/Button/Button'

const Post = (props) => {
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
            ></a>
          </li>
          <li>
            <a href="/nomen" className={classes.BreadCrumbsLink}>
              {props.posts[props.activePost]}
            </a>
          </li>
          <li>
            <a className={BCClassActive.join(' ')}>{props.subPosts[0].name}</a>
          </li>
        </ul>
        <header className={classes.MainSectionHeader}>
          <h2 className={classes.MainSectionHeaderTitle}>Номенклатура</h2>
        </header>
        <ul className={classes.PostList}>
          {props.subPosts.map((element, index) => {
            console.log(props.activePost, index)
            return (
              <li key={index}>
                <Button
                  classType={
                    props.activeSubPost === index
                      ? 'ButtonNavigationActive'
                      : 'ButtonImportant'
                  }
                >
                  {props.subPosts[index].name}
                </Button>
              </li>
            )
          })}

          <li>
            <Button classType={'ButtonImportant'}>Корректировка</Button>
          </li>
        </ul>
        <div className="mainSection__post">
          <p className="mainSection__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, quis officiis obcaecati saepe qui sunt expedita
            deleniti aliquam sit, laborum omnis, dolor iure pariatur
            consequuntur! Dolor culpa veniam quae velit minus accusamus. Atque
            beatae quidem excepturi, aut dolorum blanditiis autem architecto non
            obcaecati tempora nulla harum tenetur praesentium dolorem dolore.
          </p>
          <img
            src="1.png"
            alt=""
            className="mainSection__img"
            width="273px"
            height="167px"
          />
          <p className="mainSection__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, quis officiis obcaecati saepe qui sunt expedita
            deleniti aliquam sit, laborum omnis, dolor iure pariatur
            consequuntur! Dolor culpa veniam quae velit minus accusamus. Atque
            beatae quidem excepturi, aut dolorum blanditiis autem architecto non
            obcaecati tempora nulla harum tenetur praesentium dolorem dolore.
          </p>
          <p className="mainSection__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, quis officiis obcaecati saepe qui sunt expedita
            deleniti aliquam sit, laborum omnis, dolor iure pariatur
            consequuntur! Dolor culpa veniam quae velit minus accusamus. Atque
            beatae quidem excepturi, aut dolorum blanditiis autem architecto non
            obcaecati tempora nulla harum tenetur praesentium dolorem dolore.
          </p>
          <img
            src="2.png"
            alt=""
            className="mainSection__img"
            width="273px"
            height="167px"
          />
          <p className="mainSection__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, quis officiis obcaecati saepe qui sunt expedita
            deleniti aliquam sit, laborum omnis, dolor iure pariatur
            consequuntur! Dolor culpa veniam quae velit minus accusamus. Atque
            beatae quidem excepturi, aut dolorum blanditiis autem architecto non
            obcaecati tempora nulla harum tenetur praesentium dolorem dolore.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Post
