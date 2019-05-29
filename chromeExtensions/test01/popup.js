let changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", data => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // 通过tabs.query 获取当前的tab页面 对其进行操作
    chrome.tabs.executeScript( // 对当前的tab注入js
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};