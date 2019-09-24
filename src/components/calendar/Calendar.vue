<template>
  <div class="calendar">
      <Swiper>
        <div class="top">
          <p class="title">签到</p>
          <span class="rule" @click="goRule">签到规则？</span>
          <div class="prompt">
            <p>每日签到</p>
            <p>赚积分</p>
            <div>您本月已连续签到<span> {{ checkInCount }} </span>天已获得<span> {{ totalIntegral }} </span>积分</div>
          </div>
        </div>
        <Calendars @appear="appear"/>
      </Swiper>
      <!-- 签到规则 -->
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
          <div class="rule_detail">
            <div class="text_detail">
                <p>1.需注册成为平台用户才能进行签到</p>
                <p>2.登录用户每天只能签到一次，并获得积分奖励</p>
                <p>3.连续签到7天为一个周期，签到满7天即可额外获得50积分，若连续签到中断，则重新计算天数</p>
                <p>4.每月全勤签到，再额外得到200积分奖励</p>
                <p>5.若发现有恶心刷积分的行为，平台有权取消积分提现的权限。</p>
            </div>
            <div class="off" @click="goOff"></div>
          </div>
      </mt-popup>
      <!-- 签到成功弹框 -->
       <mt-popup
        v-model="popupVisibleDiff"
        popup-transition="popup-fade">
        <div class="signIn">
          <div class="signIn_detail">
              <p><span>+6</span>积分</p>
              <div class="success">签到成功！</div>
              <div class="more" @click="goMore">更多积分任务</div>
              <span>当前积分{{ myIntegral }}</span>
          </div>
          <div class="delete" @click="goDelete"></div>
        </div>
      </mt-popup>
  </div>
</template>

<script>
  import Swiper from '../public/Swiper'
  import Calendars from './vue-Calendar'
export default {
 name: "calendar",
  data () {
    return {
      popupVisible: false,
      popupVisibleDiff: false,
      myIntegral: "",
      checkInCount: "",
      totalIntegral: ""
    }
  },
  components: {
    Swiper,
    Calendars
  },
  computed: {},
  watch: {},
  methods: {
    // 查看签到规则
    goRule() {
      this.popupVisible = true;
    },
    // 关闭
    goOff() {
      this.popupVisible = false;
    },
    appear(val) {
      this.popupVisibleDiff = val;
    },
    // 关闭签到成功
    goDelete() {
      this.popupVisibleDiff = false;
    },
    // 更多积分任务
    goMore() {
      this.$router.push("/home");
    }
  },
  created () {
    let token = localStorage.getItem("token");
    this.baseJs.ajaxReq("/integral/api/user",{},"get",token)
    .then(res => {
      // console.log(res);
      this.myIntegral = res.data.integral;
    })
    .catch(err => {
      console.log(err);
    });
    this.baseJs.ajaxReq("/integral/api/user/checkIn",{},"get",token)
			.then(res => {
        // console.log(res);
        this.checkInCount = res.data.checkInCount;
        this.totalIntegral = res.data.totalIntegral;
			})
			.catch(err => {
			  console.log(err);
			})
  },
  mounted () {},
}
</script>
<style scoped>
  @import '../../assets/css/calendar.css';
</style>