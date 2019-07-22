// pages/movie/movie.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  http(category, callback) {
    var nowPlaying = '/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6';
    var coming = '/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6';
    var top250 = '/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6';
    switch (category) {
      case '正在热映':
        category = nowPlaying;
        break;
      case '即将上映':
        category = coming;
        break;
      case 'top250':
        category = top250
        break;
    }
    wx.request({
      url: app.globalData.baseUrl + category,
      header: {
        'content-type': 'application/xml' //设置成xml才能请求到数据
      },
      success(res) {
        callback(res);
      }
    })
  },
  onLoad: function(options) {
    var movies = this.data.movies;
    //  按需求先后 请求数据 
    this.http('正在热映', (res) => {
      // console.log(res)
      movies.push({
        name: res.data.title,
        data: res.data.subjects
      });
      this.http('即将上映', (res) => {
        movies.push({
          name: res.data.title,
          data: res.data.subjects
        });
        this.http('top250', (res) => {
          // console.log(res.data.subjects)
          movies.push({
            name: res.data.title,
            data: res.data.subjects
          });
           // 要用setData更新数据，页面才能正常渲染
          this.setData({
            movies: movies
          })
        });
        console.log(this.data.movies)
      });
    });
  },
  // 携带当前电影id跳转电影详情页  
  movieDetail(e){
      // console.log(e.detail)
    wx.navigateTo({
      url: "./movie-detail/movie-detail",
      success:function(res){
        res.eventChannel.emit('sendMovieId',{id:e.detail})
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})