class Post {
  constructor(name) {
    this.name = name
    this.permissions = ['ss@ss.ru']
  }
  addMember(member) {
    this.permissions.push(member)
  }
  deleteMember(member) {
    this.permissions.forEach((memb, i) => {
      if (member === memb) {
        this.permissions.splice(i, 1)
      }
    })
  }
}

class MainPost extends Post {
  constructor(name, subPost) {
    super(name)
    this.subPosts = subPost ? [subPost] : []
    this.permissions = ['ss@ss.ru']
  }
}

class SubPost extends Post {
  constructor(name) {
    super(name)
    this.data = {
      type: [],
      value: [],
    }
  }
}

const post = new Post('Пользователи', { name: 'Удаление' })
const post2 = new SubPost('Пользователи')
let array = [post, post2]
console.log(array)
