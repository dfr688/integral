<style scoped>
/* @media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
} */
.wh_container {
  width: 6.7rem;
  height: 8.05rem;
  background: url(../../assets/images/calendar/calendar.png) no-repeat left top;
  background-size: 100%;
  position: absolute;
  top: 3.5rem;
  left: 50%;
  margin-left: -3.35rem;
}
.wh_top_changge {
  display: flex;
}
.wh_top_changge li {
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
  box-sizing: border-box;
}
.wh_top_changge .left{
  display: none;
}
.wh_top_changge .right{
  display: none;
}
.wh_top_changge .wh_content_li {
  color: #30375b;
  flex: 2.5;
  padding-top: .4rem;
}
.wh_content_all {
  width: 100%;
  overflow: hidden;
  padding-bottom: .3rem;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
  box-sizing: border-box;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
.wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  position: relative;
}
.wh_content_item {
  height: 34px;
}

.wh_top_tag {
  width: 60px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}

.wh_item_date {
  width: 60px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_container .sign{
  width: 5.8rem;
  height: .8rem;
  margin: 0 auto;
  margin-top: .5rem;
}
.checked{
	background: url(../../assets/images/calendar/signed.png) no-repeat center center;
	background-size: 56%;
	color: #fff;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li class="wh_content_li">{{dateTop}}</li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list">
          <div
            class="wh_item_date"
            v-bind:class="[{wh_other_dayhide:item.otherMonth!=='nowMonth'},{checked:checkList.indexOf(item.id) > -1},setClass(item)]"
					>{{item.id}}
					<!-- <span v-if="item.otherMonth =='nowMonth'"></span> -->
					</div>
        </div>
      </div>
    </div>
    <div class="sign">
       <mt-button type="primary" size="large" @click.native="handleClick">马上签到</mt-button>
    </div>
  </section>
</template>
<script>
import timeUtil from "./CalendarD.js";
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: "",
			checkList:[]
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created() {
		this.getCheckList();
    this.intStart();
    this.myDate = new Date();
  },
  methods: {
    // 马上签到
    handleClick() {
      let token = localStorage.getItem("token");
      if(token === null){
        Toast({
          message: '请先登录！',
          duration: 1000
        });
        this.$router.push("/login");
      }else{
        this.baseJs.ajaxReq("/integral/api/user/checkIn",{},"put",token)
        .then(res => {
          // console.log(res);
          if(res.code === 200){
            this.$emit("appear",true);
						// 获取今天
						let date = new Date();
						let day = date.getDate();
						this.checkList.push(day);
          }else{
            Toast({
              message: res.sms,
              duration: 1000
            });
            this.$emit("appear",false);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    // 根据日期时间获取天
		date_format(datetime){
				let date = new Date(datetime.replace(/-/g, '/'));
				let day = date.getDate();
				return day;
		},
		// 获取签到列表
		getCheckList(){
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/integral/api/user/checkIn",{},"get",token)
			.then(res => {
        // console.log(res);
				for(let i = 0;i<res.data.checkInLog.length;i++){
					let day = this.date_format(res.data.checkInLog[i].createTime);
					this.checkList.push(day);
				}
			})
			.catch(err => {
			  console.log(err);
			})
		},
		intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
			if(typeof date == 'object') {
				this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
			} else if(typeof date == 'string') {
				const arrData = date.split(" ")[0].split("-");
				this.dateTop = arrData[0] + "年" + arrData[1] + "月";
			}
// 			console.log(date);
// 			console.log(date.getFullYear());
      // this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>