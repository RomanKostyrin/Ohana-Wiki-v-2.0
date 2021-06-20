import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import classes from './index.module.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <>
      <Header />
      <div className={classes.container}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
      <Footer />
    </>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
