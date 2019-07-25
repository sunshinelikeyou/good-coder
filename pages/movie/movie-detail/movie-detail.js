// pages/movie/movie-detail/movie-detail.js
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据子组件传过来的id值 请求moviedetail  ，并处理数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendMovieId',(data) => {
      utils.http('/v2/movie/subject/' +  data.id + '?apikey=0df993c66c0c636e29ecbb5344252a4a',(data) => {
        var data = data.data;
        console.log(data)
           var temp = {
              // 图片路径
              movieImgSrc:data.images.small,
              // 电影产地
              countries: data.countries,
              // 标题
              title: data.title,
              // 原标题
              originalTitle: data.original_title,
              // 想看人数
              wishCount: data.wish_count,
              // 评论人数
              commentsCount: data.comments_count,
              // 发布年限
              year: data.year,
              // 类型
              genres: data.genres,
              // 评分
              rating: data.rating ,
              // 导演
              directors: data.directors,
              // 演员
              casts: data.casts,
              // 概要
              summary:data.summary,
              // 发行日期
              pubdates:data.pubdates,
              // 时长
              durations:data.durations,
              // 评分人数
              ratingsCount:data.ratings_count,
              // 收藏人数
              collectCount:data.collect_count,
              // 根据 star 数据 处理评星
              dealStar:utils.dealStar(data.rating.stars),
              // 根据 details 处理 评星组件
              dealDetails:utils.computeArrTotal(data.rating.details)
           }
           this.setData({
             movie:temp
           })
           console.log(options)
      })
    });
    // 动态设置窗口的背景色   ？？？ 如何动态设置页面的背景颜色
    // wx.setBackgroundColor({
    //   backgroundColor: '#663912',
    // });
    // 动态设置navbar 的背景颜色
    // wx.setNavigationBarColor({
    //   frontColor:'#ffffff',
    //   backgroundColor: '#6c3f18'
    // });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})