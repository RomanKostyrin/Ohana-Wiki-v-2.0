export async function postMainPost(obj) {
  console.log(obj)
  return await axios.post(
    'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
    obj
  )
}
