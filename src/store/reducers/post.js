const initialState = {
  posts: ['Номенклатура', 'Контракты', 'Пользователи', 'Разрешения'],
  activePost: 0,
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
