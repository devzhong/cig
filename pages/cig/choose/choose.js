Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    cigName: '',
    cigType: '',
    tarContent: '',
    nicotineContent: '',
    co: '',
    packageType: '',
    cigSpecification: '',
    smallPrice: '',
    barPrice: '',
    timeMarket: '',
    smallBarCode: '',
    barBarCode: '',
    showModa: false, // 显示modal弹窗
    single: false // false 只显示一个按钮，如果想显示两个改为true即可
  },


  handInput() {
    wx.navigateTo({
      url: '../input/input',
    })
  },

  nameInput() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  scanCode () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log("扫码结果");
        console.log(res);
        console.log(res['errMsg']);
        console.log(res.result);
        var qcode = res.result;

        var self = this;
        console.log('showModa1: ' + this.data.showModa);
        wx.request({
          url: 'http://49.232.8.168:8080/api/v1/cigarette/code/'+qcode,
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
          });

        /*wx.request({
          url: 'http://49.232.8.168:8080/api/v1/cigs/' + qcode,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {
          //   'content-type': 'application/json;charset=utf-8' // 默认值
          // },
          success(res) {
            // success
            //console.log("res : " + JSON.stringify(res.data['data']));
            if ((res.data.status == "SUCCEED") && ("data" in res.data)) {
              wx.showModal({
                title: '提示',
                content: '此烟是正品',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击确定')
                  } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
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
        }) */

       // this.setData({
       //   img: res.result
       // })
      },
      fail: (res) => {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '没有扫描到条形码请重试',
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
    })
  }
})
