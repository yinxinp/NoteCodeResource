let Person = new Object();
console.log('+++++++++++++++++++++数据属性++++++++++++++++++++');
console.log('++++++++++++++++++configurable+++++++++++++++++++');
Object.defineProperty(Person, 'name', {
  // configurable 一旦设置成false则无法更改或者删除此属性，而且不能更改configurable的状态了（不可配置）
  configurable: false,
  value: '张三'
});
console.log(Person.name);
Person.name = '李四';
console.log(Person.name);
delete Person['name'];
console.log(Person.name);
console.log('++++++++++++++++++writable+++++++++++++++++++');
Object.defineProperty(Person, 'age', {
  //writable 时只读属性只要configurable是true这个属性就可以重新配置
  writable: false,
  configurable: true,
  value: 12
});
console.log(Person.age);
Person.age = 15;
console.log(Person.age);
delete Person['age'];
console.log(Person.age);
Object.defineProperty(Person, 'age', {
  writable: true,
  value: 16
});
console.log(Person.age);
console.log('此外还有一些其他数据属性[[Enumerable]]可用for in 迭代');

console.log('+++++++++++++++++++++访问器属性++++++++++++++++++++');
// 相当于c#的属性定义
//先定义个字段
Person._result = null;
Object.defineProperty(Person, 'result', {
  get() {
    return this._result;
  },
  set(newValue) {
    if (newValue && !isNaN(Number(newValue))) {
      switch (true) {
        case newValue < 60:
          this._result = `分数${newValue}:不及格`;
          break;
        case newValue < 80:
          this._result = `分数${newValue}:及格`;
          break;
        case newValue < 90:
          this._result = `分数${newValue}:良好`;
          break;
        case newValue <= 100:
          this._result = `分数${newValue}:优`;
          break;
        default:
          this._result = null;
      }
    } else {
      this._result = null;
    }
  }
});
Person.result = 56;
console.log(Person.result);
Person.result = 80;
console.log(Person.result);
Person.result = 95;
console.log(Person.result);

/**
 * 执行结果
  +++++++++++++++++++++数据属性++++++++++++++++++++
  ++++++++++++++++++configurable+++++++++++++++++++
  张三
  张三
  张三
  ++++++++++++++++++writable+++++++++++++++++++
  12
  12
  undefined
  16
  此外还有一些其他数据属性[[Enumerable]]可用for in 迭代
  +++++++++++++++++++++访问器属性++++++++++++++++++++
  分数56:不及格
  分数80:良好
  分数95:优
 */
