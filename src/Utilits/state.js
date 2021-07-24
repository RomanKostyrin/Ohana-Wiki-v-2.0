export class Post {
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

export class MainPost extends Post {
  constructor(name, subPosts) {
    super(name)
    this.subPosts = subPosts
      ? subPosts
      : [
          {
            name: 'Имя',
            data: {
              type: ['text'],
              value: ['Введите текст'],
            },
          },
        ]
    this.permissions = ['ss@ss.ru']
  }
  addSubPost(subPost) {
    this.subPosts.push(subPost)
  }
  removeSubPostByName(subPostName) {
    this.subPosts = this.subPosts.filter((el) => el.name === subPostName)
  }
  renameSubPost(activeSubPost, name) {
    this.subPosts[activeSubPost].name = name
  }
}

export class SubPost extends Post {
  constructor(name) {
    super(name)
    this.data = {
      type: ['text'],
      value: ['Введите текст'],
    }
    this.permissions = ['ss@ss.ru']
  }
}

// const post = new Post('Пользователи', { name: 'Удаление' })
// const post2 = new SubPost('Пользователи')
// let array = [post, post2]
// console.log(array)
