import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    movieTitle: '',
    start: 0,
    count: 18
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    // 更多电影
    var eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendCategoryUrl', (args) => {
      this.setData({
        args: args
      })
      utils.http('/v2/movie/' + args.category.categoryUrl + '?apikey=0df993c66c0c636e29ecbb5344252a4a' + '&start=' + this.data.start + '&count=' + this.data.count, (res) => {
        var data = res.data.subjects;
        this.setData({
          movies: data,
          movieTitle: args.category.name
        })
        wx.hideLoading()
      })
    });

  },
  // 更多电影中的详情页
  movieDetail(e) {
    // console.log(e.detail)
    // 跳转成功后接受showmovie组件的传过来的movieId
    wx.navigateTo({
      url: "../movie-detail/movie-detail",
      success: function(res) {
        res.eventChannel.emit('sendMovieId', {
          id: e.detail
        })
      }
    })
  },
  // 触底事件
  // 上拉加载
  onReachBottom() {
   
    var start = this.data.start + 18
    this.setData({
      start: start
    })
    // console.log(this.data.start);
    var eventChannel = this.getOpenerEventChannel();
    wx.showNavigationBarLoading();
    utils.http('/v2/movie/' + this.data.args.category.categoryUrl + '?apikey=0df993c66c0c636e29ecbb5344252a4a' + '&start=' + this.data.start + '&count=' + this.data.count, (res) => {
      var data = res.data.subjects;
      this.setData({
        movies: this.data.movies.concat(data)
      })
     
    wx.hideNavigationBarLoading();
      if (this.data.start > res.data.total) {
        wx.showToast({
          title: '扯到蛋了',
          icon: 'success',
          duration: 2000
        })
      };
     
    })
    
    
  }
})