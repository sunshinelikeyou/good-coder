import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    movieTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendCategoryUrl', (args) => {
      utils.http('/v2/movie/' + args.category.categoryUrl +  '?apikey=0df993c66c0c636e29ecbb5344252a4a',(res) => {
            var data = res.data.subjects;
            console.log(data);
            this.setData({
              movies:data,
              movieTitle:args.category.name
            })
      })
    })
  },
  movieDetail(e) {
    // console.log(e.detail)
    // 跳转成功后接受showmovie组件的传过来的movieId
    wx.navigateTo({
      url: "../movie-detail/movie-detail",
      success: function (res) {
        res.eventChannel.emit('sendMovieId', { id: e.detail })
      }
    })
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