// components/showMovies/showMovies.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movies:{
        type:Array,
       
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    movieDetail(e){
      var id = e.currentTarget.dataset.id;
      // console.log(id)
      this.triggerEvent('detail',id)
    }
  }
})
