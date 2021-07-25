import axios from 'axios'
import { MainPost } from '../Utilits/state'

export const path =
  'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app'

export async function putPost(state, newSubPost = 0) {
  const postKey = state.keys[state.activePost]
  const name =
    state.newPostName !== '' ? state.newPostName : state.posts[state.activePost]
  const newPost = new MainPost(name, state.subPosts)
  if (newSubPost !== 0) {
    newPost.addSubPost(newSubPost)
  }
  const response = await axios.put(`${path}/posts/${postKey}.json`, newPost)
  refreshPostsLight(state, 0, newPost)
  return response
}

export async function refreshPostsLight(
  state,
  response = 0,
  updatedPost = false
) {
  const keys = state.keys
  const allPosts = state.posts
  if (response !== 0) {
    keys.push(response.data.name)
    allPosts.push(state.newPostName)
  }
  if (updatedPost) {
    allPosts[state.activePost] = updatedPost.name
  }
  await axios.put(`${path}/postsLight.json`, [keys, allPosts])
  return [allPosts, '', keys]
}
