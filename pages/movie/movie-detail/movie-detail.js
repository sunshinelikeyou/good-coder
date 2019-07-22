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
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendMovieId',(data) => {
      utils.http('/v2/movie/subject/' +  data.id + '?apikey=0df993c66c0c636e29ecbb5344252a4a',(data) => {
        var data = data.data;
        console.log(data)
           var temp = {
              movieImgSrc:data.images.small,
              countries: data.countries,
              title: data.title,
              originalTitle: data.original_title,
              wishCount: data.wish_count,
              commentsCount: data.comments_count,
              year: data.year,
              genres: data.genres,
              rating: data.rating ,
              directors: data.directors,
              casts: data.casts,
              summary:data.summary,
              pubdates:data.pubdates,
              durations:data.durations,
              dealStar:utils.dealStar(data.rating.stars),
              dealDetails:utils.computeArrTotal(data.rating.details)
           }
           this.setData({
             movie:temp
           })
           console.log(this.data.movie)
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