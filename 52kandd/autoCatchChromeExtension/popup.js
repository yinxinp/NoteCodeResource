const UPDATE_HOUR_LIST = getUpdateTimeList(24, '时');
const UPDATE_MINUTE_LIST = getUpdateTimeList(60, '分');
const UPDATE_SECOND_LIST = getUpdateTimeList(60, '秒');
function getUpdateTimeList(num, subffix) {
  console.log(num, subffix);
  return new Array(num).fill(null).reduce((prev, current, index) => {
    return [...prev, { value: index, label: `${index} ${subffix}` }];
  }, []);
}
function getOptions(list) {
  const optionList = list.reduce((prev, current) => {
    const item = `<option value=${current.value}>${current.label}</option>`;
    return [...prev, item];
  }, []);
  return optionList.join('');
}
const HourSelector = `<select id="hour_selector">${getOptions(
  UPDATE_HOUR_LIST
)}</select>`;
const MinuteSelector = `<select id="minute_selector">${getOptions(
  UPDATE_MINUTE_LIST
)}</select>`;
const SecondSelector = `<select id="hour_selector">${getOptions(
  UPDATE_SECOND_LIST
)}</select>`;
const $body = $('body');
$body.append(
  `<div class="selector-container"><span>采集时间</span>${HourSelector}${MinuteSelector}${SecondSelector}</div>
  <div class="operation">
    <button>计划采集</button>
    <button>立即采集</button>
    <button>关闭采集</button>
  </div>
  `
);

// let changeColor = document.getElementById("changeColor");
// chrome.storage.sync.get("color", data => {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     // 通过tabs.query 获取当前的tab页面 对其进行操作
//     chrome.tabs.executeScript( // 对当前的tab注入js
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
