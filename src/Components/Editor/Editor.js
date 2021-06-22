import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Editor.module.scss'
import Textarea from '../UI/Textarea/Textarea'
import axios from 'axios'

class Editor extends React.Component {
  state = {
    posts: 1,
    subPost: 2,
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )

      Object.keys(response.data).forEach((key, value) => {
        console.log(response.data[key].post)
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <>
        <div className={classes.containerColumn}>
          <section className={classes.MainSection}>
            <header className={classes.MainSectionHeader}>
              <h2 className={classes.MainSectionHeaderTitle}>
                Создание нового поста
              </h2>
            </header>
            <form
              className={classes.MainSectionForm}
              onChange={this.onChangeForm}
            >
              <h2 className={classes.MainSectionHeaderTitle}>
                Создание основного поста
              </h2>
              <div className={classes.ContainerPost}>
                <p className={classes.ContainerItem}>
                  <Input
                    type={'text'}
                    inputTypeClass={'Input'}
                    labelTypeClass={'InputLabel'}
                    label={'Название поста'}
                    name={'login'}
                    placeholder="Введите название"
                  />
                </p>
              </div>
              <Button
                type={'submit'}
                id={'NewPostButton'}
                classType2={'ButtonSubmit'}
                classType={'ButtonPrimary'}
                onChange={this.onChangeForm}
              >
                Создать
              </Button>
            </form>
            <button onClick={this.onChangeForm}>11</button>
          </section>
        </div>
      </>
    )
  }
}

export default Editor
