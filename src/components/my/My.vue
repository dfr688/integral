<template>
  <div class="my">
    <Swiper>
      <div class="title">我的</div>
      <div class="person_info">
        <div>
          <span></span>
        </div>
        <p v-if="!isLogin">{{ phone }}</p>
        <p v-if="isLogin" @click="goLogin">登录/注册</p>
      </div>
      <div class="account_info">
        <ul>
          <li>
            <p>{{ myIntegral }}</p>
            <div>我的积分</div>
            <span>约{{ convertmyIntegral.toFixed(2) }}元</span>
          </li>
          <li>
            <p>{{ todayIntegral }}</p>
            <div>今日积分</div>
            <span>约{{ converttodayIntegral.toFixed(2) }}元</span>
          </li>
          <li>
            <p v-if="userInfo !=undefined">{{ userInfo.amount }}.00</p>
            <div>累计提现（元）</div>
            <span class="last" @click="goWithdraw">去提现</span>
          </li>
        </ul>
        <div class="explain">
          说明：10000个积分=1.00元
        </div>
      </div>
      <div class="list">
        <ul>
          <li class="integral_details" @click="goIntegralDetails">
            <p>积分明细</p>
            <div>
              <span></span>
            </div>
          </li>
          <li class="suggest" @click="goSuggest">
            <p>意见反馈</p>
            <div>
              <span></span>
            </div>
          </li>
          <li class="user_protocol" @click="goPrivacy">
            <p>用户协议</p>
            <div>
              <span></span>
            </div>
          </li>
          <li class="version">
            <p>版本信息</p>
            <div>
              <span>1.1.0</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="signOut">
        <mt-button type="primary" size="large" @click.native="handleClick">退出登录</mt-button>
      </div>
    </Swiper>
  </div>
</template>

<script>
  import Swiper from '../public/Swiper'
export default {
 name: "my",
  data () {
    return {
      isLogin: true,
      phone: "",
      userInfo: "",
      myIntegral: "",
      todayIntegral: ""
    }
  },
  components: {
    Swiper
  },
  computed: {
    convertmyIntegral() {
      return this.myIntegral / 10000;
    },
    converttodayIntegral() {
      return this.todayIntegral / 10000;
    }
  },
  watch: {},
  methods: {
    // 积分明细
    goIntegralDetails() {
      this.$router.push('/integraldetails');
    },
    // 意见反馈
    goSuggest() {
      this.$router.push('/suggest');
    },
    // 用户协议
    goPrivacy() {
      this.$router.push("/privacy");
    },
    // 去提现
    goWithdraw() {
      this.$router.push({name:"withdraw",params:{integral:this.myIntegral}});
    },
    // 登录
    goLogin() {
      this.$router.push("/login");
    },
     // 隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
    },
    // 退出登录
    handleClick() {
      localStorage.removeItem("phone");
			localStorage.removeItem("token");
			this.isLogin = true;
    }
  },
  created () {
    this.phone = localStorage.getItem("phone");
		if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		  this.isLogin = false;
    }
    let token = localStorage.getItem("token");
    this.baseJs.ajaxReq("/integral/api/user",{},"get",token)
    .then(res => {
      // console.log(res);
      this.userInfo = res.data;
      this.myIntegral = res.data.integral;
      this.todayIntegral = res.data.todayIntegralChange;
    })
    .catch(err => {
      console.log(err);
    })
  },
  mounted () {},
}
</script>
<style scoped>
  @import '../../assets/css/my.css';
</style>