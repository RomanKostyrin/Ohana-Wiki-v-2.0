import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
  FETCH_SUBPOSTS,
  CHANGE_SUBPOSTS,
  CHANGE_ACTIVE_SUBPOST,
} from '../actions/actionTypes'

const initialState = {
  posts: ['1', '2'],
  keys: [],
  activePost: 0,
  activeSubPost: 0,
  subPosts: [
    {
      name: 'subpost1',
      data: {
        type: ['text'],
        value: [''],
      },
    },
  ],
  newPostName: '',
  newPost: { postName: '', subPosts: [{}] },
  newSubPost: {
    name: '',
    data: {
      type: ['text'],
      value: [' '],
    },
  },
  isDisabledButtons: false,
  error: null,
}

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_SUBPOST:
      return {
        ...state,
        activeSubPost: action.activeSubPost,
      }
    case FETCH_POSTS_START:
      return {
        ...state,
        isDisabledButtons: action.bool,
      }

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isDisabledButtons: false,
        posts: action.posts,
        subPosts: action.subPosts,
        keys: action.keys,
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isDisabledButtons: false,
        error: action.error,
      }
    case FETCH_SUBPOSTS:
      return {
        ...state,
        activePost: action.activePost,
        subPosts: action.subPosts,
      }
    case CHANGE_SUBPOSTS:
      console.log(action.subPosts)
      return {
        ...state,
        subPosts: action.subPosts,
        isDisabledButtons: true,
      }
    default:
      return state
  }
}
