var timeout = 0
var catchState = "start"
function getAllTarget() {
  return $("[id*='item_quick']:gt(1)")
}
function asyncCatch() {
  return new Promise(resolve => {
    checkCatchFinished(() => {
      resolve(true)
    })
  })
}

function checkCatchFinished(callback) {
  setTimeout(() => {
    const title = $(window.frames["workspace"].document)
      .find("title")
      .text()
    if (catchState === "start") {
      if (title === "联盟资源库数据列表 - 苹果CMS") {
        timeout = 0
        catchState = "wait"
        $(function() {
          console.log("等待采集...")
          myCatch()
          return checkCatchFinished(callback)
        })
        return
      }
      return checkCatchFinished(callback)
    } else if (catchState === "wait") {
      if (title === "数据采集 - 苹果CMS") {
        catchState = "pedding"
        console.log("采集中...")
        return checkCatchFinished(callback)
      }
      timeout++
      console.log("超时等待", 16 - timeout)
      if (timeout > 15) {
        console.log("重启采集...")
        myCatch()
      }
      return checkCatchFinished(callback)
    } else if (catchState === "pedding") {
      if (title !== "数据采集 - 苹果CMS") {
        catchState = "start"
        console.log("采集下一步...")
        callback()
        return
      }
      return checkCatchFinished(callback)
    }
  }, 1000)
}
async function startCatch() {
  const targetAs = getAllTarget()
  const targetlist = Array.from(targetAs)
  for (let i = 0; i < targetlist.length; i++) {
    targetlist[i].click()
    await asyncCatch(targetlist[i])
  }
  console.log("采集完成！！！！")
}

function myCatch() {
  $(window.frames["workspace"].document)
    .find('input[value="采当天"]')
    .click()
}
var catchTime = "马上"
var catchMinu = 0
var catchSec = 0
var initerval = null
function myDom() {
  $("#submenu").append(`
    <dd>
    <div>自动采集</div>
    <select id="mycatch" onchange="selectChange(this.value,'hour')" style="width:30%" placeholde="选择你要自动采集的时间" defalutValue="马上">
    ${getHourOptions()}
    </select>
    <select id="mycatchMin" onchange="selectChange(this.value,'min')" style="width:30%" placeholde="分" defalutValue="0">
    ${getMinOrSecOptions()}
    </select>
    <select id="mycatchSec" onchange="selectChange(this.value,'sec')" style="width:30%" placeholde="分" defalutValue="0">
    ${getMinOrSecOptions()}
    </select>
    <button style="width:100%" onclick="startProcess()">开始采集</button>
    <div id="showCatchState" style="color:red"></div>
    </dd>
    `)
}
function getHourOptions() {
  let options = new Array(24)
    .fill(undefined)
    .map((x, index) => `<option>${index + 1}</option>`)
  const optionstr = options.join('')
  return `<option>马上</option>${optionstr}`
}
function getMinOrSecOptions() {
  let options = new Array(60)
    .fill(undefined)
    .map((x, index) => `<option>${index}</option>`)
  return options.join('')
}
function selectChange(value, key) {
  switch (key) {
    case "hour":
      catchTime = value
      break
    case "min":
      catchMinu = value
      break
    case "sec":
      catchSec = value
      break
  }
}
function startProcess() {
  if ((catchTime === "马上")) {
    startAt()
  } else {
    startAt(Number(catchTime), Number(catchMinu), Number(catchSec))
  }
}
function startAt(hour, min, sec) {
  if (initerval) {
    clearInterval(interval)
  }
  if (catchTime === "马上") {
    startCatch()
    $("#showCatchState").html('')
    return
  }
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMin = currentTime.getMinutes()
  const currentSec = currentTime.getSeconds()
  const offsetTime =
    (currentHour > hour ? 24 - (currentHour - hour) : hour - currentHour) *
      60 *
      60 *
      1000 +
    (currentMin > min ? 60 - (currentMin - min) : min - currentMin) *
      60 *
      1000 +
    (currentSec > sec ? 60 - (currentSec - sec) : sec - currentSec) * 1000
    $("#showCatchState").html('定时采集进行中...')
  setTimeout(() => {
    startCatch()
    interval = setInterval(startCatch, 24 * 60 * 60 * 1000)
  }, offsetTime)
}

function startCatchAt(hour, minu) {
  const currentHour = new Date().getHours()
  const currentMin = new Date().getMinutes()
  if (minu) {
    if (
      Number(hour) == currentHour &&
      currentMin >= minu &&
      currentMin <= minu + 1
    ) {
      startCatch()
    }
    return
  }
  if (Number(hour) == currentHour && currentMin > 0 && currentMin < 1) {
    startCatch()
  }
}

$(function() {
  myDom()
})
