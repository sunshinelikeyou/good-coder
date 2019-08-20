Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
      const value = e.detail.value
        this.setData({
            inputVal: value
        }); 
    },
    sendMovie(e){
      const value = e.detail.value;
      if(value){
        this.triggerEvent('search',value)
      }
    }
});