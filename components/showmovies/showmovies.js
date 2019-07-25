// components/showMovies/showMovies.js
// 只能用
import "../../utils/util.js"
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
    // 将被点击的movieId 传给父组件 
    movieDetail(e){
      var id = e.currentTarget.dataset.id;
      // console.log(id)
      this.triggerEvent('detail',id)
    },
    moreMovie(e){
      // console.log(e.currentTarget.dataset.category.categoryUrl)
      var category = e.currentTarget.dataset.category;
      this.triggerEvent('more', category)
      
    }
  }
})
