Page({
  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    productName:'',
    productCode:'',
    brandOwner:'',
    barCode:'',
    tradePrice:'',
    retailPrice:'',
    showModa: false, // 显示modal弹窗
    single: false // false 只显示一个按钮，如果想显示两个改为true即可
  },
  btnTest() {
    var self = this;
    console.log('showModa1: ' + this.data.showModa);
    wx.request({
      url: 'http://49.232.8.168:8080/api/v1/cigs/8888075024037',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success(res) {
        if ((res.data.status == "SUCCEED") && ("data" in res.data)) {
          self.setData({
            showModa: true,
            result: res.data
          });
        } else {
          wx.showModal({
            title: '警告',
            content: '此烟是假货',
            confirmColor: '#FF0000',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('用户点击确定')
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function () {
        console.log("fail")
        // fail
      },
      complete: function () {
        // complete
        console.log("complete")
      }
    }),

    this.setData({
      showModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击取消按钮的回调函数
  modalCancel(e) {
    // 这里面处理点击取消按钮业务逻辑
    console.log('点击了取消')
  },
  // 点击确定按钮的回调函数
  modalConfirm(e) {
    // 这里面处理点击确定按钮业务逻辑
    console.log('点击了确定')
  }
})
