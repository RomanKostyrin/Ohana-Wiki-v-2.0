import React from 'react'
import Header from './Components/Header/Header'
import Navigation from './Components/Navigation/Navigation'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import classes from './App.module.scss'

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className={classes.container}>
          <Navigation />
          <Main />
        </div>
        <Footer />
      </>
    )
  }
}

export default App
