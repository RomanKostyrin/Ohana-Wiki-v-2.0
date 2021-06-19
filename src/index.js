import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import classes from './index.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <>
      <Header />
      <div className={classes.container}>
        <App />
      </div>
      <Footer />
    </>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
