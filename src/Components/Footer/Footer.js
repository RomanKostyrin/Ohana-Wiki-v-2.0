import React from 'react'
import classes from './Footer.module.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer className={classes.Footer}>
        <p className={classes.Copy}>
          &#169; 2016-2021 Компания &#171;Ohana&#187; Все права защищены
        </p>

        <p className={classes.MailTo}>
          Сообщить об ошибке:
          <br />
          <a
            href="mailto:kostyrin@ohanafitness.ru"
            className={classes.MailToLink}
          >
            kostyrin@ohanafitness.ru
          </a>
        </p>
      </footer>
    )
  }
}

export default Footer
