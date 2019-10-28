
Page({

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

  searchBox: function (e) {
    const that = this;
    let first;
    that.setData({
      qcode: e.detail.value.qcode
    }),
      console.log("qcode is: " + that.data.qcode)
    var self = this;
    console.log('showModa1: ' + this.data.showModa);
    wx.request({
      url: 'http://49.232.8.168:8080/api/v1/cigarette/name/' + this.data.qcode,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'content-type': 'application/json;charset=utf-8' // 默认值
      // },
      success(res) {
        // success
        //console.log("res : " + JSON.stringify(res.data['data']));
        if ((res.data.status == "SUCCEED") && ("data" in res.data)) {

          if (res.data['data'].length == 0) {
            console.log("res.data.data" + res.data['data']);
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
          } else {
            self.setData({
              showModa: true,
              result: res.data
            });
          }

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
    })

  }











  /*searchBox: function (e) {
    const that = this;
    let first;
    that.setData({
      qcode: e.detail.value.qcode
    }),
      console.log("qcode is: " + that.data.qcode)
    wx.request({
      url: 'http://49.232.8.168:8080/api/v1/cigs/names/' + this.data.qcode,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'content-type': 'application/json;charset=utf-8' // 默认值
      // },
      success(res) {
        // success
        //console.log("res : " + JSON.stringify(res.data['data']));
        if ((res.data.status == "SUCCEED") && ("data" in res.data) ) {
          
          if (res.data['data'].length == 0){
            console.log("res.data.data" + res.data['data']);
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
          }else{
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

          }



          
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
    })

  }*/

  //这个函数一定要写在标签上才能用e.detail.value获取到
})
