<form
className={classes.MainSectionForm}
onChange={this.onChangeForm}
>
<h2 className={classes.MainSectionHeaderTitle}>
  Редактирование поста
</h2>
<div className={classes.ContainerPost}>
  <p className={classes.ContainerItem}>
    <label className={classes.InputLabel}>
      Старое название:
      <br />
      <select
        id={'selectUsers'}
        name={'users'}
        className={classes.SignInSelect}
        onChange={(event) => {
          this.props.ChangePostHandle(event.target.value)
          this.changeSubPosts(event.target.value)
        }}
      >
        {this.state.posts.map((post, index) => {
          return (
            <option value={index} key={`optpost-${index}`}>
              {post}
            </option>
          )
        })}
      </select>
    </label>
  </p>
  <p className={classes.ContainerItem}>
    <Input
      type={'text'}
      inputTypeClass={'Input'}
      labelTypeClass={'InputLabel'}
      label={'Новое название'}
      name={'post'}
      placeholder="Введите название"
    />
  </p>
</div>
<h2 className={classes.MainSectionHeaderTitle}>
  Редактирование Сабпоста
</h2>
<div className={classes.ContainerPost}>
  <p className={classes.ContainerItem}>
    <label className={classes.InputLabel}>
      Старое название:
      <br />
      <select
        id={'selectSubPost'}
        name={'users'}
        className={classes.SignInSelect}
        onChange={(event) => {
          this.ChangeSubPostHandle(event.target.value)
        }}
      >
        {Object.keys(this.state.subPost).map((post, index) => {
          return (
            <option value={index} key={`opt-${index}`}>
              {this.state.subPost[post].name}
            </option>
          )
        })}
      </select>
    </label>
  </p>
  <p className={classes.ContainerItem}>
    <Input
      type={'text'}
      inputTypeClass={'Input'}
      labelTypeClass={'InputLabel'}
      label={'Новое название'}
      name={'subPost'}
      placeholder={'Введите название'}
    />
  </p>
  {Object.keys(this.state.subPost[0].data.type).map((key) => {
    if (this.state.subPost[0].data.type[key] === 'text') {
      return (
        <p className={classes.ContainerItem}>
          <Textarea
            LabelClass={'TextareaLabel'}
            labelName={'Введите текст'}
            rows={10}
            cols={120}
            placeholder={'Введите текст'}
            defaultValue={this.state.subPost[0].data.value[key]}
          ></Textarea>
          <button
            className={classes.BtnClose}
            type="button"
            title="close"
          ></button>
        </p>
      )
    } else if (this.state.subPost[0].data.type[key] === 'img') {
      return (
        <div className={classes.ContainerImg}>
          <img
            src={this.state.subPost[0].data.value[key]}
            alt=""
            className="mainSection__img"
            width="273px"
            height="167px"
          />
          <button
            className={classes.BtnClose}
            type="button"
            title="close"
          ></button>
        </div>
      )
    }
  })}
</div>

<button
  className="btn btn--submit btn--bottom"
  type={'submit'}
  onChange={this.props.onChangeForm}
>
  Сохранить
</button>
</form>
<form
className={classes.MainSectionForm}
onChange={this.formChange}
>
<h2 className={classes.MainSectionHeaderTitle}>
  Создание Сабпоста
</h2>
<div className="container container__Post">
  <p className="container--item">
    <label className="signIn__lable">
      Выберите пост:
      <br />
      <select
        id="selectUsers"
        name="users"
        className="signIn__input"
      >
        <option value="admin">Номенклатура</option>
        <option value="trener">Контракты</option>
        <option value="mop">Пользователи</option>
        <option value="rop">Чеки</option>
      </select>
    </label>
  </p>
</div>
<h2 className={classes.MainSectionHeaderTitle}>
  Введите текст Сабпоста
</h2>
<div className="container container__Post">
  <p className="container--item container--item__svg">
    <label className="signIn__lable">
      Название:
      <br />
      <input
        type="text"
        className="signIn__input"
        name="login"
        value="12345"
      />
    </label>
  </p>
  <p className="signIn__paragraph">
    <label className="signIn__lable">
      Текст:
      <br />
      <textarea
        className="signIn__input signIn__input--textarea"
        name="comment"
        rows="5"
        cols="120"
        placeholder="Текст"
        defaultValue={'3'}
      ></textarea>
    </label>
    <button
      className={classes.BtnClose}
      type="button"
      title="close"
    ></button>
  </p>
</div>
<button className="btn btn--submit btn--img">
  Добавить картинку
</button>
<button className="btn btn--submit btn--text">
  Добавить текст
</button>
<button className="btn btn--submit btn--bottom">Сохранить</button>
</form>
