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
    // 显示消息提示框
    wx.showLoading({
      title: '加载中',
    })
    
    var movies = this.data.movies;
    //  按需求先后 请求数据 
    this.http('正在热映', (res) => {
      // console.log(res)
      movies.push({
        name: '正在热映',
        data: res.data.subjects,
        categoryUrl:'in_theaters'
      });
      this.http('即将上映', (res) => {
        movies.push({
          name: '即将上映',
          data: res.data.subjects,
          categoryUrl:'coming_soon'
        });
        this.http('top250', (res) => {
          // console.log(res.data.subjects)
          movies.push({
            name: 'top250',
            data: res.data.subjects,
            categoryUrl: 'top250'
          });
           // 要用setData更新数据，页面才能正常渲染
          this.setData({
            movies: movies
          });
          wx.hideLoading()
        });
        // console.log(this.data.movies)
      });
    });
  },
  // 携带当前电影id跳转电影详情页  
  movieDetail(e){
      // console.log(e.detail)
      // 跳转成功后接受showmovie组件的传过来的movieId
    wx.navigateTo({
      url: "./movie-detail/movie-detail",
      success:function(res){
        res.eventChannel.emit('sendMovieId',{id:e.detail})
      }
    })
  },
  moreMovie(e){
    // console.log(e.detail);
    wx.navigateTo({
      url: "./more-movie/more-movie",
      success: function (res) {
        res.eventChannel.emit('sendCategoryUrl', { category: e.detail })
      }
    })
  },
  searchMovie(e){
    wx.navigateTo({
      url: "./movie-detail/movie-detail",
      success: function (res) {
        res.eventChannel.emit('sendMovieInfo', { value: e.detail })
      }
    })
  }
})