/**
 * javascript ---> 原型
 * 下面我们可以定义一个构造器函数，向构造器里面添加原型属性
 */
function Person() {}
Person.prototype.name = "张三"
Person.prototype.age = 16
let person1 = new Person()
let person2 = new Person()
console.log(person1.name)
console.log(person2.name)
console.log(person1.name === person2.name)
// 这里面访问的name其实都是Person原型里面的name，所以都一样，这样我们就可以把一些共有的方法存在原型中，不必在实例化过程中重复声明
// 在实例化之后的对象都有一个__proto__的属性用于访问该对象的原型对象
// 判断该原型对象是不是对象的原型对象方法： isPrototypeOf
console.log(Person.prototype.isPrototypeOf(person1)) // true
console.log(Person.prototype.isPrototypeOf(person2)) // true
//es5 中实现了获得原型的方法 getPrototypeOf
let myPrototype = Object.getPrototypeOf(person1)
console.log("myPrototype", myPrototype)
// constructor 属性 他是属于原型对象的，它指向该原型对象的构造函数
let whatIsConstructor = Person.prototype.constructor
console.log("whatIsConstructor--->", whatIsConstructor === Person) //true
// constructor 属性是共享的所以在实例中也可以访问到constructor属性
console.log(person1.constructor) // [Function: Person]

// 如果在原型和实例中同时定义了一个相同的属性则优先访问实例中的属性，delete可以删除实例中的属性，但不能删除原型的属性
person1.name = "张三李四"
console.log(person1.name) // 张三李四
delete person1["name"]
console.log(person1.name) // 张三
delete person1["name"] //这个方法是无法删除原型中的属性的
console.log(person1.name) // 张三

//原型 in操作符 hasOwnproperty方法
console.log(person2.hasOwnProperty("name")) // false 只用于访问实例的属性
console.log("name" in person2) // true 可以访问到原型的属性

// 获取对象属性们的方法 Object.keys(); Object.getOwnPropertyNames()
person1.myclass = "3年5班"
Object.defineProperty(person1, "result", {
  enumerable: false,
  value: 96
})
let propertiesByObjectKeys = Object.keys(person1)
let propertiesByGetOwnPropertyNames = Object.getOwnPropertyNames(person1)
console.log("propertiesByObjectKeys", propertiesByObjectKeys) // propertiesByObjectKeys [ 'myclass' ]
console.log("propertiesByGetOwnPropertyNames", propertiesByGetOwnPropertyNames) // propertiesByGetOwnPropertyNames [ 'myclass', 'result' ]
// 从上面这个例子可以看出访问实例属性的两个方法不同之处是，getOwnPropertyNames可以返回不被枚举的属性

/**
 * 下面我们用字面量的方式创建原型，要注意的是字面量创建的原型会有所不同
 */

function Animal() {}
Animal.prototype = {
  // 当原型指向一个新的字面量时，虽然instanceOf 还是能返回期望的结果，但是函数的原型的custructor的指向就改变了，指向了Object
  name: "小猫咪",
  age: 3
}
let cat = new Animal()
console.log(cat instanceof Animal) // true
console.log(cat.constructor === Animal) // false
console.log(cat.constructor === Object) // true
// 针对以上问题在用字面量指定原型的时候可以这样做
console.log("++++++++++++++++++我是一条华丽的分割线++++++++++++++++++++")
Animal.prototype = {
  name: "小狗",
  age: 4,
  constructor: Animal // 这里手动添加constructor指向就可以了
}
let dog = new Animal()
console.log(dog instanceof Animal) // true
console.log(dog.constructor === Animal) // true
console.log(dog.constructor === Object) // false
// 但是这样还有一点和原来构造函数创建的constructor 不一样，就是原来的constructor是不可枚举的，而这里是可以的
// 再次改造
console.log("++++++++++++++++++我是一条华丽的分割线++++++++++++++++++++")
Animal.prototype = {
  name: "小猪",
  age: 1
}
Object.defineProperty(Animal, "constructor", {
  enumerable: false,
  value: Animal
})
// 这次改造就完全是原生的原型了

console.log("++++++++++++++++++我是一条华丽的分割线++++++++++++++++++++")
// 动态原型模式 这边的原型不能用字面量定义否则会断开与之前原型的联系
function Cup(type, color) {
  this.cupType = type
  this.color = color
  if (typeof this.showCup != "function") {
    Cup.prototype.showCup = function() {
      // 注意这边prototype不能用this必须要用构造函数Cup
      console.log(`This is a ${this.cupType} ${this.color} cup!`)
    }
  }
}

let glassCup = new Cup("glass", "red")
let chinaCup = new Cup("china", "green")
glassCup.showCup()
chinaCup.showCup()
console.log(glassCup.showCup === chinaCup.showCup)

//寄生构造函数模式 我们一般改变不了Array的构造函数，但是我们要实现一个带有特殊功能函数的特殊数组
function SpecialArray() {
  this.name = "zhangsan"
  let arr = new Array()
  arr.push.apply(arr, arguments) // 这个applay是为了用数组传参的手段，不然的话push只能一次传一个参数
  arr.specialJoin = function() {
    return arr.join("|")
  }
  return arr
}
let tempArray = new SpecialArray(1, 2, 3, 4, 5, 6)
console.log(tempArray.specialJoin())
console.log(tempArray.name)
// undefined 在new的时候构造函数默认返回实例对象，如果显示的return某个对象则重写了构造函
//数的默认返回对象，实例化后this就是arr，其中不包括name，而name是在本身实例当中，本身的实例被return替换了则无法访问了。
// console.log(name) 报错 全局是没有name属性的
let testArray = SpecialArray(2, 3, 4, 5) //这边没有用new关键字，其中的this指向全局环境
console.log(testArray.specialJoin())
console.log(testArray.name) //undefined
console.log(name) // zhangsan

//稳妥构造函数模式 所谓稳妥说明没有公共属性，比较安全的一种方式，和上面比较相似不用new 不用this这样外界只能通过公布的方法访问内部的数据和属性
function DurableObject(name) {
  let obj = new Object()
  let newName = name + 1
  obj.sayHi = function() {
    console.log(`My name is ${newName}!`)
  }
  return obj
}
let wanghua = DurableObject("wanghua")
wanghua.sayHi() // 这边只能通过sayHi的方法访问到newName这个变量，其中obj对象叫做稳妥对象；


