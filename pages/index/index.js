// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    disabled: false,
    inputColor: "",
    inBtnDisplay: "none",
    // 仅在test时使用
    toggleFlag: false,
    botBtnContentTmp: "",
    tipDisplay: "",
    tip: "",
    bgColor: "",
    dialogInfo: "",
    dialogDisplay: "",
    taskInning: {},
    memberDisplay: "",
    halfCircleCount: [],
    hCount: [],
    vCount: [],
    inningTitleInput: "",
    inningTaskInput: "",
    botBtnContent: "",
    processStatus: { accepted: false, inningSetted: false, canStartLearning: false, onLearning: false },
    inningMember: [{ existed: true, src: "../../imgs/person.jpg" }, { existed: false, src: '' }, { existed: false, src: '' }, { existed: false, src: '' }],
  },
  getInningTitleInput(e) {
    this.setData({ inningTitleInput: e.detail.value });
  },
  getInningTaskInput(e) {
    this.setData({ inningTaskInput: e.detail.value });
  },
  validateInput(val, rule) {
    // TODO
    if (val === "") {
      return false;
    } else {
      return true;
    }
  },
  setAInning() {
    console.log("coming here");
    // 被邀请加入作业局的用户
    if (this.data.toggleFlag === true) {
      if (this.data.processStatus.accepted === false) {
        console.log("coming here setAInning");
        this.addPerson();
        this.setData({ ['processStatus.accepted']: true })
        this.updateBg();
        this.setData({ botBtnContent: "已加入" })
        this.setData({ inBtnAttachDisplay: "" })
      }
      // else{
      //   this.showDialog("已加入！");
      // }
      return;
    }
    // 创建作用局的用户
    // console.log(this.data.inningTitleInput);
    // console.log(this.data.inningTaskInput);
    // update bottom button content
    if (this.data.processStatus.onLearning === true) {
      this.setData({ memberDisplay: "" })
    } else if (this.data.processStatus.inningSetted === false) {
      if (this.validateInput(this.data.inningTitleInput, "") === false) {
        this.setData({ inningTitleInput: "不写完作业不睡觉局" })
      }
      if (this.validateInput(this.data.inningTaskInput, "") === false) {
        this.setData({ inningTaskInput: "8点起床，学习2小时" })
      }
      this.setData({ ['processStatus.inningSetted']: true });

      this.setData({ ['processStatus.canStartLearning']: false })
      // update view
      this.updateBg();
      // console.log(this.data.processStatus);
    } else if (this.data.processStatus.canStartLearning === false) {
      this.invite();
    } else if (this.data.processStatus.canStartLearning === true) {
      this.setData({ ['processStatus.onLearning']: true })
      this.setData({ botBtnContent: "结伴学习中" })
    }
  },
  showDialog(msg) {
    this.setData({ dialogInfo: msg });
    this.setData({ dialogDisplay: "display:flex" });
  },
  invite() {
    this.showDialog("邀请动作已完成");
  },
  hideDialog() {
    this.setData({ dialogDisplay: "" });
    this.setData({ dialogInfo: "" })
  },
  toggleUser() {
    if (this.data.processStatus.inningSetted === false) {
      this.showDialog("还未创建作业局，不可切换！")
      return;
    }
    if (this.data.toggleFlag === true) {
      this.setData({ botBtnContent: this.data.botBtnContentTmp });
      this.updateBg();
      this.setData({ inBtnAttachDisplay: "" })
      this.data.toggleFlag = false;
    } else {
      this.data.botBtnContentTmp = this.data.botBtnContent;
      if (this.data.processStatus.accepted === true) {
        this.setData({ botBtnContent: "已加入" });
        this.setData({ inBtnAttachDisplay: "" })
      } else {
        this.setData({ botBtnContent: "立即加入" });
        this.setData({ inBtnAttachDisplay: "display: block" });
      }
      this.setData({ tip: "" })
      this.setData({ tipDisplay: "" });
      this.data.toggleFlag = true;
    }
  },
  addPerson() {
    let index = 0;
    while (index < this.data.inningMember.length) {
      if (this.data.inningMember[index].existed === false) {
        break;
      } else {
        index++;
      }
    }
    if (index >= this.data.inningMember.length) {
      this.showDialog("人数达到限制！！！");
      return;
    }
    let key = "inningMember[" + index + "]";
    this.setData({ [key]: { existed: true, src: "../../imgs/header.jpg" } });
    this.setData({ 'processStatus.canStartLearning': true })
    console.log(this.data.processStatus);
    this.updateBg();
  },
  updateBg() {
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
    // 被邀请的用户
    if (this.data.toggleFlag === true) {
      if (this.data.accepted === true) {
        this.setData({ botBtnContent: "已加入" })
        this.setData({ inBtnAttachDisplay: "" });
      }
      return;
    }
    // console.log(this.data.halfCircleCount);
    // 创建作业局的用户
    if (this.data.processStatus.inningSetted === true) {
      this.setData({ taskInning: { paddingBottom: "40rpx", top: "412rpx", height: "820rpx", leftHeight: "637rpx", rightHeight: "528rpx", subMarginBottom: "18rpx" } })
    } else {
      this.setData({ taskInning: {} })
    }
    // init bottom button content
    if (this.data.processStatus.onLearning === true) {
      this.setData({ bgColor: "background-color:#f1ac47" })
      this.setData({ botBtnContent: "结伴学习中" })
      this.setData({ memberDisplay: "" })
    } else if (this.data.processStatus.inningSetted === false) {
      this.setData({ botBtnContent: "立即组局" })
      this.setData({ memberDisplay: "none" })
      // this.setData({ memberDisplay: "" })
    } else if (this.data.processStatus.canStartLearning === false) {

      this.setData({ botBtnContent: "邀请好友加入" })
      this.setData({ memberDisplay: "" })
      this.setData({ tip: "作业局将在明日0点开启，快去邀请好友加入吧！" })
      this.setData({ tipDisplay: "display: block" });
      this.setData({ botBtnContent: "邀请好友加入" })
      this.setData({ inputColor: "background-color: #ffe8b2;" })
      this.setData({ disabled: true})
    } else if (this.data.processStatus.canStartLearning === true) {
      this.setData({ tip: "明日0点可开启新的作业局!" })
      this.setData({ tipDisplay: "display: block" });
      this.setData({ bgColor: "background-color:#f1ac47" })
      this.setData({ botBtnContent: "开始结伴学习" })
      this.setData({ memberDisplay: "" })
    }
  },
  onLoad() {
    this.updateBg();
  },
})
