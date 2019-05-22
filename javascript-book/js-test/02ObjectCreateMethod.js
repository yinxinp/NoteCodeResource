// 工厂方式
// 这种创建方式无法辨别对象类型，他们都是Object的类型
function createPerson(name, age) {
  var o = new Object()
  o.name = name
  o.age = age
  o.sayHi = function() {
    console.log(`my name is ${this.name},I am ${this.age} years old`)
  }
  return o
}

let person1 = createPerson("张三", 15)
person1.sayHi()

// 构造函数方式 这样新建的类即使Person类型了 但是这样创建的缺点就是在每个实例上虽然方法名相同，其实是连个不同的方法，其实在创建功能相同的方法是完全没必要将方法也是梨花两次
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayHi = function() {
    console.log(`my name is ${this.name},I am ${this.age} years old`)
  }
}
let person2 = new Person("李四", 23)
person2.sayHi()

// 为了解决上述函数重复定义采取以下方式，将函数放在对象定义外面
function Animal(name, type) {
  this.name = name
  this.type = type
  this._ability = "eat"
  Object.defineProperty(this, "ability", {
    get() {
      switch (this.type) {
        case "cat":
          this._ability = "climb tree"
          break
        case "dog":
          this._ability = "protect master"
          break
        case "bird":
          this._ability = "fly"
          break
        default:
          this._ability = "eat"
      }
      return this._ability
    }
  })
  this.cando = cando
}
function cando() {
  console.log(
    `Hello I'm ${this.type}, my name is ${this.name}, I can ${this.ability}!`
  )
}
// 这样的话下面几个实例调用的是同一个方法
let dog = new Animal("lili", "dog")
let cat = new Animal("miaomiao", "cat")
let snake = new Animal("sheshe", "snake")
dog.cando()
cat.cando()
snake.cando()
console.log(dog.cando === cat.cando, cat.cando === snake.cando) // true true
