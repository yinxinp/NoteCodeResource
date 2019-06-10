import 'dart:async';

import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

// dart 中的箭头表达式支支持单行表达是，我们只能用匿名函数进行替代了
void main() => runApp(new MyApp());
final routes = {"new_route": (context) => NewRoute()}; //定义路由

class MyApp extends StatelessWidget {
  const MyApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: "Counter",
      theme: new ThemeData(primarySwatch: Colors.cyan),
      home: new MyHomePage(title: "Flutter Home page!"),
      routes: routes,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key key, this.title})
      : super(key: key); //初始化父类的key字段和在当前类中定义的title字段
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              new Text('你点击按钮的次数'),
              new Text('$_counter',
                  style: Theme.of(context).textTheme.display1),
              FlatButton(
                child: Text("新路由"),
                textColor: Colors.orange,
                color: Colors.blue,
                onPressed: () {
                  Navigator.pushNamed(context, "new_route");
                },
              ),
              new RandownWord(),
              RandownWordByState()
            ]),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
    );
  }
}

class NewRoute extends StatelessWidget {
  const NewRoute({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(title: Text("New Route")),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[Text("这是一个新路由"), ParentWidget()],
          ),
        ));
  }
}

//动态生成英文文字的widget
class RandownWord extends StatelessWidget {
  const RandownWord({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final word = new WordPair.random();
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(word.toString()),
    );
  }
}

class RandownWordByState extends StatefulWidget {
  RandownWordByState({Key key}) : super(key: key);

  _RandownWordByStateState createState() => _RandownWordByStateState();
}

class _RandownWordByStateState extends State<RandownWordByState> {
  String _word = "";
  int _num = 0;
  _RandownWordByStateState() {
    Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_num >= 10) {
        timer.cancel();
        timer = null;
        return;
      }
      numCounter();
      generateWord();
    });
  }

  void generateWord() {
    setState(() {
      _word = new WordPair.random().toString();
    });
  }

  void numCounter() {
    setState(() {
      _num++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Text('$_word 次数：$_num');
  }
}

class ParentWidget extends StatefulWidget {
  ParentWidget({Key key}) : super(key: key);

  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;
  void _handleChangeActive() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ChildWidget(active: _active, onChanged: _handleChangeActive),
    );
  }
}

class ChildWidget extends StatelessWidget {
  const ChildWidget({Key key, this.active: false, @required this.onChanged})
      : super(key: key);
  final bool active;
  final Function onChanged;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onChanged,
      child: Container(
        child: Center(
          child: Text(
            active ? "激活" : "未激活",
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
            color: active ? Colors.lightGreen[700] : Colors.grey[600]),
      ),
    );
  }
}
