const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const app = getApp();
// 封装请求数据方法
const http = (url, callback) => {
  wx.request({
    url: app.globalData.baseUrl + url,
    header: {
      'content-type': 'application/xml' //设置成xml才能请求到数据
    },
    success(res) {
      callback(res);
    }
  })
}
// 处理星星 将stars = '40'  变为   [1,1,1,0]
const dealStar = function (star) {
  var s = star.slice(0, 1);
  var arr = [];
  for (var i = 0; i < 5; i++) {
    if (i < s) {
      arr.push(1);
    } else {
      arr.push(0)
    }
  };
  return arr;
}
// 计算进度条的百分比
const computeArrTotal = function(obj){
  var sum = 0;
  const newArr = [];
  for (let item in obj ) {
    sum += obj[item];
  }
  for(let item in obj){
     newArr.push(Math.ceil(obj[item]* 100/ sum))
  }
   return  newArr.reverse();
}
module.exports = {
  formatTime: formatTime,
  http:http,
  dealStar: dealStar,
  computeArrTotal: computeArrTotal
}