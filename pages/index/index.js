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
    botBtnContent: "",
    processStatus: { inningSetted: false, canStartLearning: false, onLearning: false },
    inningMember:[],
  },
  getInningTitleInput(e) {
    this.setData({ inningTitleInput: e.detail.value });
  },
  getInningTaskInput(e) {
    this.setData({ inningTaskInput: e.detail.value });
  },
  setAInning() {
    console.log(this.data.inningTitleInput);
    console.log(this.data.inningTaskInput);
    // update bottom button content
    if (this.data.processStatus.onLearning === true) {
      // DO NOTHING
    } else if (this.data.processStatus.inningSetted === false) {
      this.setData({ ['processStatus.inningSetted']: true })
      this.setData({ ['processStatus.canStartLearning']: false })
      // update view

      this.setData({ botBtnContent: "邀请好友加入" })
      console.log(this.data.processStatus);
    } else if (this.data.processStatus.canStartLearning === true) {
      this.setData({ ['processStatus.onLearning']: true })
      this.setData({ botBtnContent: "结伴学习中" })
    }
  },
  onLoad() {
    // 向后端申请加载作业局状态，设置processStaus
    // processStatus: { inningSetted: false, canStartLearning: false,onLearning:false }
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
    // init bottom button content
    if (this.data.processStatus.onLearning === true) {
      this.setData({ botBtnContent: "结伴学习中" })
    }
    if (this.data.processStatus.inningSetted === false) {
      this.setData({ botBtnContent: "立即组局" })
    } else if (this.data.processStatus.canStartLearning === false) {
      this.setData({ botBtnContent: "邀请好友加入" })
    } else if (this.data.processStatus.canStartLearning === true) {
      this.setData({ botBtnContent: "开始结伴学习" })
    }
  }
})
