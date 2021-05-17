// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    halfCircleCount: [],
    hCount: [],
    vCount: [],
    inningTitleInput: "",
    inningTaskInput: "",
  },
  getInningTitleInput(e){
    this.setData({inningTitleInput : e.detail.value});
  },
  getInningTaskInput(e){
    this.setData({inningTaskInput : e.detail.value});
  },
  setAInning(){
    console.log(this.data.inningTitleInput);
    console.log(this.data.inningTaskInput);
    
  },
  onLoad() {
    let count = 12;
    // const count = 2;
    let tmp = [];
    for (let i = 0; i < count; i++) {
      tmp.push(i);
    }
    this.setData({ halfCircleCount: tmp });
    count = 11;
    tmp = [];
    for (let i = 0; i < count; i++) {
      tmp.push(i);
    }
    this.setData({ hCount: tmp });
    count = 10;
    tmp = [];
    for (let i = 0; i < count; i++) {
      tmp.push(i);
    }
    this.setData({ vCount: tmp });
    // console.log(this.data.halfCircleCount);
  }
})
