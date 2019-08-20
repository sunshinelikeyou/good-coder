//index.js
//获取应用实例
const app = getApp();
import utils from '../../utils/util.js'
Page({
  data: {
    userAvatar: '',
    canIUse: wx.canIUse('getUserInfo'),
    nowTime: '',
    ip: 0,
    weather: {}
  },
  //事件处理函数
  onLoad: function() {
    // 当前时间
    var that = this;
    setInterval(function() {
      that.setData({
        nowTime: new Date().toLocaleString()
      })
    }, 1000);
    //  获取本机ip
    wx.request({
      url: 'https://tianqiapi.com/ip/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log('IP地址: ' + res.data.ip);
        that.weathertoday(res.data.ip)
        that.setData({
          ip: res.data.ip
        })
      }
    });

    // 获取openid  session_key
    wx.login({
      success: function(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            // ?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              appid: utils.appId,
              secret: utils.appSecret,
              js_code: res.code
            },
            success: function(res) {
              var openid = res.data.openid;
              var session_key = res.data.session_key;
              // 获取当前用户的微信步数
              wx.getWeRunData({
                success(res) {
                  // 拿 encryptedData 到开发者后台解密开放数据
                  const encryptedData = res.encryptedData;
                  // 或拿 cloudID 通过云调用直接获取开放数据
                  const iv = res.iv;
                  const WXBizDataCrypt = require('../../utils/cryptojs-master/RdWXBizDataCrypt.js');
                  const pc = new WXBizDataCrypt(utils.appId, session_key);
                  const data = pc.decryptData(encryptedData, iv);
                  console.log(data)
                }
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if(res.authSetting['scope.userInfo']){
        wx.getUserInfo({
          success: function(res) {
            console.log(res)
          }
        })
        }
      }
    }),
    // 获取 access_token
        wx.request({
          url:'https://api.weixin.qq.com/cgi-bin/token',
          method:'GET',
          data:{
            grant_type:'client_credential',
            appid:utils.appId,
            secret:utils.appSecret
          },
          success:function(res){
            console.log(res)
          }
        });
        // 模板消息
        wx.request({
          url:'https://api.weixin.qq.com/cgi-bin/wxopen/template/add',
          method:'POST',
          data:{
            access_token:utils.access_token
          },
          success:function(res){
            console.log(res)
          }
        })
  },
  goStart(event) {
    wx.switchTab({
      url: '../notes/notes'
    })
  },
  weathertoday: function(ip) {
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v6',
      data: {
        'ip': ip
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        _this.setData({
          weather: res.data
        });
        console.log(_this.data.weather)
      }
    });
  }
})