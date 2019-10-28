//index.js
//获取应用实例
const app = getApp()

Page({

  //表单提交
  formSumbit: function (e) {
    var objData = e.detail.value;
    var phone = objData.phone;
    var password = objData.password;
    console.log("phone: "+phone);
    console.log("password: "+password);
    //校验
    if (phone == "" || password == "") {
      wx.showModal({
        title: '提示',
        content: '用户名或密码不能为空',
        showCancel:false
      })
    }
    else {
      wx.request({
        url: 'http://49.232.8.168:8080/api/v1/logins',
        data: {
          phone: phone,
          password: password
        },
        method: 'post',
        success: function (res) {
          console.log(res.data);
          var jsonStr = res.data;
          console.log(jsonStr.status);
          if (jsonStr.status == "SUCCEED") {
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            }),
              wx.redirectTo({
                url: '../../pages/cig/choose/choose',
              })
            
          } else {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
          }
        },
        fail: function (res) {
          console.log("********request login fail ********");
          wx.showToast({
            title: '服务器繁忙，请稍后再试',
            icon: 'none'
          })
        }
      })
    }
  }







})