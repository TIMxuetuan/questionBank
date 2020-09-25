// pages/index/index.js
const Service = require("../../Services/services")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AllXmId: "",
    AllXmName: "",
    page: 1,
    kmlbList: [], //科目列表
    sjlxList: [], //试卷类型
    active: 0,
    sixActive: "全部",
    sortdtList: [], //试卷列表
    cacheKey:"", //唯一标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.getStorage({
      key: 'AllXmItem',
      success(res) {
        console.log(res.data)
        that.setData({
          AllXmId: res.data.id,
          AllXmName: res.data.lb,
        })
        that.getkmlbList();
        that.getSortdtList();
      }
    });
    wx.getStorage({
      key: 'cache_key',
      success(res) {
        console.log(res.data)
        that.setData({
          cacheKey:res.data
        })
      }
    })
  },

  //返回项目列表页，并传入id值
  goToSelectStudy() {
    console.log(this.data.AllXmId)
    wx.redirectTo({
      url: '/pages/selectStudyItem/selectStudyItem?id=' + this.data.AllXmId
    })
  },

  //获得首页科目列表
  getkmlbList() {
    console.log("this.data.AllXmId", this.data.AllXmId)
    let dataLists = {
      xmlb_id: this.data.AllXmId
    }
    let jiamiData = {
      xmlb_id: this.data.AllXmId
    }
    Service.getkmlb(dataLists, jiamiData).then(res => {
      console.log(res)
      if (res.event == 100) {
        this.setData({
          kmlbList: res.list,
          sjlxList: res.sjlx
        })
      }
    })
  },

  //tabs切换
  onChangeSubject(event) {
    console.log(event.detail)
    wx.showToast({
      title: `点击标签 ${event.detail.name}`,
      icon: 'none',
    });
    this.setData({
      active: event.detail.name
    })
    this.getSortdtList();
  },

  //六个模块选择
  onChangeSjlx(event) {
    console.log(event)
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
    this.setData({
      sixActive: event.detail
    })
    this.getSortdtList();
  },

  //获得试卷列表数据
  getSortdtList() {
    console.log(this.data.active)
    let dataLists = {
      xmlb_id: this.data.AllXmId,
      cache_key: "",
      sj_lx: this.data.sixActive,
      kmlb: this.data.active,
      page: this.data.page
    }
    let jiamiData = {
      xmlb_id: this.data.AllXmId,
      cache_key: "",
      sj_lx: this.data.sixActive,
      kmlb: this.data.active,
      page: this.data.page
    }
    Service.sortdt(dataLists, jiamiData).then(res => {
      console.log(res)
      if (res.event == 100) {
        this.setData({
          sortdtList: res.list
        })
      }
    })
  },

  //去练习页面--进入答题
  goToExercise(e){
    wx.navigateTo({
      url: '/pages/answerIndex/answerIndex?shijuan_id=' + e.currentTarget.dataset.item.id,
    })
    console.log(e.currentTarget.dataset.item)
    // let dataLists = {
    //   cache_key: this.data.cacheKey,
    //   shijuan_id: e.currentTarget.dataset.item.id,
    //   type:1
    // }
    // let jiamiData = {
    //   cache_key: this.data.cacheKey,
    //   shijuan_id: e.currentTarget.dataset.item.id,
    //   type:1
    // }
    // Service.lxmsdt(dataLists, jiamiData).then(res => {
    //   console.log(res)
    //   if (res.event == 100) {
    //     this.setData({
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})