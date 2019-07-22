//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userAvatar:'',
    canIUse: wx.canIUse('getUserInfo'),
    nowTime: new Date().toLocaleString()
  },
  //事件处理函数
  onLoad: function () {
      
  } ,
  goStart(event) {
    wx.switchTab({
      url: '../notes/notes'
    })
  }
})
