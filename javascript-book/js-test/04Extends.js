// 继承
console.log("++++++++++++++++++++++原型链+++++++++++++++++++++++")
function Parent() {
  this.parent = "parent"
  this.children = [1, 2, 3]
}
Parent.prototype.getParentName = function() {
  console.log(this.parent)
}

function Child() {
  this.child = "child"
}
Child.prototype = new Parent() //继承，更改child原型
Child.prototype.getChildName = function() {
  //这一步一定要在前面更改指定原型了之后，否则将无法访问到
  console.log(this.child)
}
let childInstance = new Child()

console.log(childInstance.child) //child
console.log(childInstance.parent) // parent
childInstance.getChildName() // child
childInstance.getParentName() //parent
console.log(childInstance.constructor) // Parent 之所以这边的constructor会指向Parent 是因为原来child的原型被替换了，而constructor是存在原型中的
console.log(Parent.prototype.constructor) // Parent
/**
 * childInstance --->|-->[[prototype]]-->|--> parentInstance--->|-->[[prototype]] --> |--> [[prototype]] -----------> Object
 *                   |--> child          |--> getChildName      |--> parent   ↑       |--> constructor --> Parent --> prototype —
 *                                                              |--> children |       |--> getParentName                         │
 *                                                                            -——————————————————————————————————————————————————|
 */
// 原型链所带来的问题，就是当一个对象通过原型继承于另一个对象的实例的时候，那么这个实例对象所包含的属性将成为共享属性，这样的话会造成一定的问题
// 就是当实例化这个对象并修改超类中的引用类型的属性的时候，里一个实例化对象的该超类属性也会随之改变比如
//上面Parent类中的parent,children 属性在Child实例化的时候就是共享属性了,而属性children就会有危险

let child1 = new Child()
let child2 = new Child()
child1.parent = "我是超类"
child1.children.push(5)
console.log(
  "child1-->",
  child1.parent,
  "child1Prototype-->",
  child1.__proto__.parent,
  "child2-->",
  child2.parent
)
console.log("child1-->", child1.children, "child2-->", child2.children)
/**
 * 结果：
 * child1 我是超类 child1Prototype parent child2 parent
 * child1 [ 1, 2, 3, 5 ] child2 [ 1, 2, 3, 5 ]
 *
 * 1. 从上面两个结果可以看出在使用赋值运算符=的时候是在child1实例中添加一个parent的属性，并未影响到原型中的parent属性
 * 但是如果对一个实例不存在的属性进行操作，它会向下搜索属性并加以修改，这样共享属性将会被操作从而造成 child1，和child2中的children同步修改的情况
 * 2.  第二个问题就是在创建子类实例的时候是无法想超类的构造函数传参的
 */
console.log("++++++++++++++++++++++华丽的分割线+++++++++++++++++++++++")
// 借用构造函数 + 组合继承 利用call和apply
function Animal(type) {
  this.animalType = type
  if (typeof this.showAnimalType != "function") {
    Animal.prototype.showAnimalType = function() {
      console.log(this.animalType)
    }
  }
}
function Cat(name) {
  this.name = name
  Animal.call(this, "cat") //偷梁换柱，偷了父组件的构造函数，将父属性偷到Cat实例属性中来了
}
Cat.prototype = new Animal() // 加了这一步叫做组合继承如果没有这一步 下面的cat1.showAnimalType()会报错，
// 因为访问不到 该函数定义在Animal原型当中，cat并没有集成到Animal原型当中的属性和方法
Cat.prototype.showCatInfo = function() {
  console.log(`This is a cat, his name is ${this.name}!`)
}
let cat1 = new Cat("lili")
console.log(cat1.animalType)
cat1.showCatInfo()
console.log(cat1.__proto__.animalType) //undefind 这是原型中的属性它的构造函数在new Animal()时已经被执行了当时没有传参所以这里时undefined
cat1.showAnimalType() 
